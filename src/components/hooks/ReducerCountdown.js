import {useCallback, useEffect, useState} from "react";

export const CountdownStates = {
    /**
     * Only illegal change is Off -> Paused
     */
    RUNNING: "Running",
    OFF: "Off",
    PAUSED: "Paused",
    STARTING: "Starting",
}

const useReducerCountdown = (totalTime, state, onFinish) => {
    /**
     * state should be a managed state, with values from CountdownStates.
     * @type {number}
     */
    const totalTimeMs = totalTime * 1000;
    const [timeLeft, setTimeLeft] = useState(totalTimeMs);
    const [paused, setPaused] = useState(state === CountdownStates.PAUSED)
    const [started, setStarted] = useState(() => {
        if (state === CountdownStates.OFF) {
            return false
        } else if (state === CountdownStates.RUNNING) {
            return true
        } else {
            throw Error(`Illegal construction state for countdown ${state}`)
        }
    })
    const [startTime, setStartTime] = useState(state === CountdownStates.RUNNING || state === CountdownStates.PAUSED ? performance.now() : null)
    const [totalPauseTime, setTotalPauseTime] = useState(0);
    const [pauseStartTime, setPauseStartTime] = useState(null);
    const [prevState, setPrevState] = useState(state)


    useEffect(() => {
        let timer = setInterval(() => {
            if (started) {
                setTimeLeft((recentTimeLeft) => {
                    const newTimeLeft = started ? totalTimeMs - ((paused ? pauseStartTime : performance.now()) - startTime - totalPauseTime) : recentTimeLeft
                    if (recentTimeLeft > 0 && newTimeLeft <= 0) {
                        clearInterval(timer)
                        return 0;
                    }
                    return newTimeLeft >= 0 ? newTimeLeft : 0
                });
            }
        }, 10);
        return () => clearInterval(timer);
    }, [setTimeLeft, paused, pauseStartTime, startTime, totalPauseTime, started, totalTimeMs]);

    useEffect(() => {
        if (timeLeft <= 0 && typeof onFinish === 'function') {
            onFinish()
        }
    }, [timeLeft, onFinish]);

    const start = useCallback(() => {
        console.log("Start")
        setStarted(true)
        setPaused(false)
        setStartTime(performance.now())
        setTotalPauseTime(0)
        setPauseStartTime(null)
    }, [setStarted, setPaused, setStartTime])

    const pause = useCallback(() => {
        console.log("Pause")
        setPaused(true)
        setPauseStartTime(performance.now())
    }, [setPaused, setPauseStartTime])

    const resume = useCallback(() => {
        console.log("Resume")
        setPaused(false)
        setTotalPauseTime((recentPauseTime) => recentPauseTime + performance.now() - pauseStartTime)
        setPauseStartTime(null)
    }, [setPaused, setTotalPauseTime, setPauseStartTime, pauseStartTime])


    const reset = useCallback(() => {
        console.log("Reset")
        setTimeLeft(totalTimeMs)
        setPaused(false)
        setStarted(false)
        setStartTime(null)
        setTotalPauseTime(0)
        setPauseStartTime(null)
    }, [setTimeLeft, setPaused, setStarted, setStartTime, setTotalPauseTime, setPauseStartTime, totalTimeMs])


    useEffect(() => {
        // console.log("Reducer Countdown useEffect called")
        // console.log({prevState, state})
        if (state !== prevState) {

            switch (true) {
                case prevState === CountdownStates.OFF && state === CountdownStates.RUNNING:
                    start()
                    break
                case prevState === CountdownStates.RUNNING && state === CountdownStates.PAUSED:
                    pause()
                    break
                case prevState === CountdownStates.PAUSED && state === CountdownStates.RUNNING:
                    resume()
                    break
                case prevState === CountdownStates.PAUSED && state === CountdownStates.OFF:
                case prevState === CountdownStates.RUNNING && state === CountdownStates.OFF:
                    reset()
                    break
                case prevState === CountdownStates.OFF && state === CountdownStates.PAUSED:
                    start()
                    pause()
                    break
                default:
                    console.error(`Unexpected state combination: ${prevState} -> ${state}`)
            }
            setPrevState(state)
        }
    }, [state, start, pause, resume, reset, setPrevState])

    return timeLeft
}

export default useReducerCountdown;
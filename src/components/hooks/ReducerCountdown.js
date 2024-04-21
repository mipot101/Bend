import {useCallback, useEffect, useState} from "react";
import useEffectDebugger from "./UseEffectDebugger";

export const CountdownStates = {
    /**
     * Only illegal change is Off -> Paused
     */
    RUNNING: "Running",
    OFF: "Off",
    PAUSED: "Paused",
    STARTING: "Starting",
}

const useReducerCountdown = (totalTime, countdownState, onFinish, name = "some-reducer-countdown") => {
    /**
     * state should be a managed state, with values from CountdownStates.
     * @type {number}
     */
    console.log(`[${name}] called with countdown state:`, countdownState)
    useEffect(() => {
        return () => {
            console.log(`[${name}] unmount`)
        }
    }, [])
    const totalTimeMs = totalTime * 1000;
    const started0 = () => {
        if (countdownState === CountdownStates.OFF) {
            return false
        } else if (countdownState === CountdownStates.RUNNING) {
            return true
        } else {
            throw Error(`Illegal construction state for countdown ${countdownState}`)
        }
    }
    const [state, setState] = useState(() => {
        return {
            timeLeft: totalTime,
            paused: countdownState === CountdownStates.PAUSED,
            started: started0(),
            startTime: countdownState === CountdownStates.RUNNING || countdownState === CountdownStates.PAUSED ? performance.now() : null,
            totalPauseTimeMs: 0,
            pauseStartTime: null,
            timeoutTime: null,
            timeoutID: null,
            finished: false,
        }
    })
    const [prevCountdownState, setPrevCountdownState] = useState(countdownState)

    const updateTimeLeft = useCallback(() => {
        /**
         * Updates the timeLeft variable.
         * Also initiates the next update if not paused.
         * Note, that this code always calls setTimeLeft.
         * However, that is not a problem as a re-render is only triggered if the value actually changed
         */
        setState((state) => {
            // {timeLeft, paused, started, startTime, totalPauseTimeMs, pauseStartTime, timeout}
            console.log(`[${name}] Set State called with`, structuredClone(state))
            console.log(state.finished === true)
            if (state.finished === true || !state.started) {
                console.log(`[${name}] Set State returned at 0`, state)
                return state
            }
            const newTimeLeftMs = totalTimeMs - ((state.paused ? state.pauseStartTime : performance.now()) - state.startTime - state.totalPauseTimeMs)
            if (newTimeLeftMs <= 0) {
                console.log(`[${name}] Set State returned at 1`, state)
                onFinish()
                state.finished = true
                return state
            }
            const nextFullSecond = Math.floor(newTimeLeftMs / 1000)
            let timeoutID = null
            let timeoutTime = null
            if (!state.paused && nextFullSecond >= 0) {
                const timeoutMs = newTimeLeftMs % 1000 + 1

                // Only set new timeout if it would be at least 10ms earlier than the currently set timeout
                // or if there was no previous timeout or the last timeout already happened
                if (state.timeoutID === null || (state.timeoutTime > performance.now() + timeoutMs + 10 || state.timeoutTime <= performance.now())) {
                    if (state.timeoutID) {
                        clearTimeout(state.timeoutID)
                    }
                    console.log(`[${name}] Timeout set:`, {
                        timeoutMs,
                        "timeLeft": state.timeLeft,
                        newTimeLeftMs,
                        nextFullSecond
                    })
                    timeoutID = setTimeout(updateTimeLeft, timeoutMs)
                    timeoutTime = performance.now() + timeoutMs
                }
            }
            if (state.timeLeft === nextFullSecond && timeoutID === null) {
                console.log(`[${name}] Set State returned at 2`, state)
                return state
            }
            const newState = {
                timeLeft: nextFullSecond,
                paused: state.paused,
                started: state.started,
                startTime: state.startTime,
                totalPauseTimeMs: state.totalPauseTimeMs,
                pauseStartTime: state.pauseStartTime,
                timeoutTime: timeoutID !== null ? timeoutTime : state.timeoutTime,
                timeoutID: timeoutID !== null ? timeoutID : state.timeoutID,
                finished: false,
            }
            state.timeLeft = nextFullSecond
            state.timeoutTime = timeoutID !== null ? timeoutTime : state.timeoutTime
            state.timeoutID = timeoutID !== null ? timeoutID : state.timeoutID
            state.finished = false
            console.log(`[${name}] Set State returned at 3`, newState)
            return newState
        })
    }, [totalTimeMs, onFinish, name])

    useEffectDebugger(() => {
        /**
         * Note, that if `paused` changes, updateTimeLeft also changes and thus this useEffect gets called
         */
        if (state.started && !state.paused) {
            updateTimeLeft()
        }
    }, [state.started, state.paused, updateTimeLeft], ["started", "paused", "updateTimeLeft"], name);


    const start = useCallback(() => {
        console.log("Start")
        setState(({...prevArgs}) => {
            return {
                ...prevArgs,
                paused: false,
                started: true,
                startTime: performance.now(),
                totalPauseTimeMs: 0,
                pauseStartTime: null,
                finished: false,
            }
        })
    }, [])

    const pause = useCallback(() => {
        console.log("Pause")
        setState(({...prevArgs}) => {
            return {
                ...prevArgs,
                paused: true,
                pauseStartTime: performance.now()
            }
        })
    }, [])

    const resume = useCallback(() => {
        console.log("Resume")
        setState(({totalPauseTimeMs, pauseStartTime, ...prevArgs}) => {
            return {
                ...prevArgs,
                paused: false,
                totalPauseTimeMs: totalPauseTimeMs + performance.now() - pauseStartTime,
                pauseStartTime: null,
            }
        })
    }, [])


    const reset = useCallback(() => {
        console.log("Reset")
        setState(({...prevArgs}) => {
            return {
                ...prevArgs,
                timeLeft: totalTime,
                paused: false,
                started: false,
                startTime: null,
                totalPauseTimeMs: 0,
                pauseStartTime: null,
                finished: false
            }
        })
    }, [totalTime])


    // useEffect(() => {
    // console.log(`[${name}] Reducer Countdown useEffect called`)
    // console.log({prevCountdownState, countdownState})
    if (countdownState !== prevCountdownState) {

        switch (true) {
            case prevCountdownState === CountdownStates.OFF && countdownState === CountdownStates.RUNNING:
                start()
                break
            case prevCountdownState === CountdownStates.RUNNING && countdownState === CountdownStates.PAUSED:
                pause()
                break
            case prevCountdownState === CountdownStates.PAUSED && countdownState === CountdownStates.RUNNING:
                resume()
                break
            case prevCountdownState === CountdownStates.PAUSED && countdownState === CountdownStates.OFF:
            case prevCountdownState === CountdownStates.RUNNING && countdownState === CountdownStates.OFF:
                reset()
                break
            case prevCountdownState === CountdownStates.OFF && countdownState === CountdownStates.PAUSED:
                start()
                pause()
                break
            default:
                console.error(`Unexpected state combination: ${prevCountdownState} -> ${countdownState}`)
        }
        setPrevCountdownState(countdownState)
    }
    // }, [countdownState, start, pause, resume, reset, setPrevCountdownState])

    return state.timeLeft
}

export default useReducerCountdown;
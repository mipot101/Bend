import {useCallback, useEffect, useState} from "react";

const useCountdown = (totalTime, initiallyRunning, onFinish) => {
    /**
     * It needs to be tried to change the state as little as possible.
     * That said, it still needs to be updated at least every second.
     *
     * Maybe I need to add yet another state, to ensure that the timer gets only updated if it exceeded the next whole second
     */
    const totalTimeMs = totalTime * 1000;
    const [timeLeft, setTimeLeft] = useState(totalTimeMs);
    const [paused, setPaused] = useState(!initiallyRunning)
    const [started, setStarted] = useState(initiallyRunning)
    const [startTime, setStartTime] = useState(initiallyRunning ? performance.now() : null)
    const [totalPauseTime, setTotalPauseTime] = useState(0);
    const [pauseStartTime, setPauseStartTime] = useState(null);

    // Update timer if the time diff exceeds 1 second
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

    const start = () => {
        setStarted(true)
        setPaused(false)
        setStartTime(performance.now())
        console.log("Starting")
    }

    const pause = useCallback(() => {
        if (started === true) {
            setPaused((recentValue) => {
                if (recentValue === true)
                    return true;
                setPauseStartTime(performance.now())
                console.log("Pause")
                return true
            })
        }
    }, [setPaused, started, setPauseStartTime])

    const resume = useCallback(() => {
        if (started === true) {
            setPaused((recentValue) => {
                if (recentValue === false)
                    return false;
                setTotalPauseTime((recentPauseTime) => recentPauseTime + performance.now() - pauseStartTime)
                setPauseStartTime(null)
                console.log("Resume")
                return false
            })
        }
    }, [started, setPaused, setTotalPauseTime, setPauseStartTime, pauseStartTime])

    const restart = useCallback(() => {
        setStarted(false)
        setTimeout(() => {
            setStarted(true)
            setStartTime(performance.now())
            setTotalPauseTime(0)
            setPauseStartTime(null)
        }, 10);
    }, [setStarted])

    return [timeLeft, paused, started, pause, resume, start, restart]
}

export default useCountdown;
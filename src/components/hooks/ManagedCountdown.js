import {useEffect, useRef, useState} from 'react';

const useManagedCountdown = ({countStart, countStop = 0, callbacks, active,}) => {
    /**
     * This countdown version has its state managed by the parent component.
     * This state is communicated using the active argument.
     * The countdown is started when active is true for the first time.
     * When active is false, the countdown is paused.
     * To reset the countdown a method "reset" is returned.
     * The countdown automatically resets on terminating.
     * Arguments:
     *   countStart: float. Gives the starting time of the countdown. The countdown will start with the ceiled version of this value
     *   countStop: float. Gives the stopping time of the countdown.
     *   callbacks: List of Tuples of form [time: int, callback: func]: [[2, () => {...}], [0, () => {...}]]
     *   active: bool. Says whether the countdown is running or paused
     */
    const initialElapsedTime = Math.ceil(countStart) - countStart
    const [timeLeft, setTimeLeft] = useState(Math.ceil(countStart))
    const callbacksRef = useRef(null)
    const timeoutRef = useRef(null)
    const timeoutSetTimeRef = useRef(null)
    const elapsedTimeRef = useRef(initialElapsedTime)
    const isPausedRef = useRef(true)

    const resetRefs = () => {
        clearTimeout(timeoutRef.current)
        setTimeLeft(Math.ceil(countStart))
        timeoutRef.current = null
        timeoutSetTimeRef.current = null
        elapsedTimeRef.current = initialElapsedTime
        isPausedRef.current = true
    }


    useEffect(() => {
        callbacksRef.current = callbacks
    }, [callbacks])

    const countdown = (seconds, timeout = 1000) => {
        clearTimeout(timeoutRef.current)
        if (seconds > countStop) {
            timeoutSetTimeRef.current = performance.now()
            timeoutRef.current = setTimeout(() => {
                elapsedTimeRef.current = 0
                setTimeLeft(seconds - 1)

                if (callbacksRef.current) {
                    const maybeCurrentCallback = callbacksRef.current.find(tuple => tuple[0] === seconds - 1)
                    if (maybeCurrentCallback && typeof maybeCurrentCallback[1] === 'function') {
                        maybeCurrentCallback[1]()
                    }
                }

                countdown(seconds - 1)
            }, timeout);
        } else {
            resetRefs()
        }
    }


    const pause = () => {
        clearTimeout(timeoutRef.current)
        if (!isPausedRef.current && timeoutSetTimeRef.current !== null) {
            elapsedTimeRef.current += performance.now() - timeoutSetTimeRef.current
            isPausedRef.current = true
        }
    }

    const play = () => {
        if (timeLeft > countStop) {
            if (elapsedTimeRef.current >= 1000) {
                throw Error(`elapsedTime is greater than 1000 (${elapsedTimeRef.current}). That shouldn't have happened.`)
            }
            isPausedRef.current = false
            countdown(timeLeft, 1000 - elapsedTimeRef.current)
        }
    }

    const reset = () => {
        resetRefs()
        if (active) {
            countdown(Math.ceil(countStart))
        }
    }

    useEffect(() => {
        if (active === false)
            pause()
        else
            play()
    }, [active]);

    // If the initialTime changes, it is assumed that we want to create a new countdown
    useEffect(() => {
        reset()
    }, [countStart]);

    // Delete countdown on dismount
    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current)
        }
    }, [])

    return [
        timeLeft,
        {
            reset,
            play,
            pause
        },
    ]
}

export default useManagedCountdown;

export const SomeExampleComponent = () => {
    const [countdownActive, setCountdownActive] = useState(false)
    const [timeLeft, {reset, play, pause}] = useManagedCountdown({
        countStart: 10,
        callbacks: [],
        active: countdownActive
    })
    return (
        <div>
            <div>{timeLeft}</div>
            <button onClick={() => {
                setCountdownActive(true)
            }}>Play
            </button>
            <button onClick={() => {
                setCountdownActive(false)
            }}>Pause
            </button>
            <button onClick={() => {
                reset()
            }}>Reset
            </button>
        </div>
    )
}



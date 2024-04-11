import "./LiveExerciseImage.css";
import {useEffect, useRef} from "react";

const LiveExerciseImage = ({
                               duration,
                               image,
                               animationPaused,
                               percentageDone,
                               animationPausedStart,
                               setAnimationPausedStart,
                               totalPauseTime,
                               setTotalPauseTime,
                               startTime,
                               setStartTime,
                               animationActive,
                               moveToNextExercise
                           }) => {
    const animatedCircle = useRef();

    useEffect(() => {
        if (animationPausedStart == null && animationPaused) {
            setAnimationPausedStart(performance.now())
        }
    }, [animationPausedStart, animationPaused]);

    useEffect(() => {
        if (animationPausedStart !== null && !animationPaused) {
            setTotalPauseTime((prevPauseTime) => prevPauseTime + performance.now() - animationPausedStart)
            setAnimationPausedStart(null)
        }
    }, [animationPausedStart, animationPaused]);

    return (
        <div className="live-exercise-container">
            <div className="live-exercise-timer">
                <div className="live-exercise-image" style={{backgroundImage: `url(${image})`}}/>
                {animationActive && <div className="moving-circle"
                                         ref={animatedCircle}
                                         style={{
                                             animationDuration: `${duration}s`,
                                             animationPlayState: animationPaused ? 'paused' : 'running',
                                             '--degree': `${Math.floor(percentageDone * 360)}deg`
                                         }}
                                         onAnimationEnd={moveToNextExercise}
                                         onAnimationStart={() => {
                                             setStartTime(performance.now())
                                         }}
                />}
            </div>
        </div>
    )
}

export default LiveExerciseImage;
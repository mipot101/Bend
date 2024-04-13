import "./LiveExerciseImage.css";

const LiveExerciseImage = ({
                               duration,
                               image,
                               percentageDone,
                               animationPaused,
                               animationActive,
                               moveToNextExercise,
                               startExercise
                           }) => {
    return (
        <div className="live-exercise-container">
            <div className="live-exercise-timer">
                <div className="live-exercise-image" style={{backgroundImage: `url(${image})`}}/>
                {animationActive && <div className="moving-circle"
                                         style={{
                                             animationDuration: `${duration}s`,
                                             animationPlayState: animationPaused ? 'paused' : 'running',
                                             '--degree': `${Math.floor(percentageDone * 360)}deg`
                                         }}
                                         onAnimationEnd={moveToNextExercise}
                    // onAnimationStart={startExercise}
                />}
            </div>
        </div>
    )
}

export default LiveExerciseImage;
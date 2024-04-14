import "./LiveExerciseImage.css";

const LiveExerciseImage = ({
                               duration,
                               image,
                               animationPaused,
                               animationVisible,
                           }) => {
    return (
        <div className="live-exercise-container">
            <div className="live-exercise-timer">
                <div className="live-exercise-image" style={{backgroundImage: `url(${image})`}}/>
                {animationVisible && <div className="moving-circle"
                                          style={{
                                              animationDuration: `${duration}s`,
                                              animationPlayState: animationPaused ? 'paused' : 'running',
                                          }}
                />}
            </div>
        </div>
    )
}

export default LiveExerciseImage;
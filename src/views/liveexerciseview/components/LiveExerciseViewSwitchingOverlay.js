import "./LiveExerciseViewSwitchingOverlay.css"

const LiveExerciseViewSwitchingOverlay = ({totalCountdown, timeLeft}) => {
    const secondsLeft = Math.floor(timeLeft / 1000)

    return (
        <div className="switching-overlay">
            <div className="exercise">
                <div className="live-exercise-container">
                    <div className="live-exercise-timer" style={{borderColor: "transparent"}}>
                        {/*<div className="moving-circle"*/}
                        {/*     style={{*/}
                        {/*         animationDuration: `${totalCountdown}s`,*/}
                        {/*     }}*/}
                        {/*/>*/}
                        <div className="live-exercise-switching-countdown">
                            {secondsLeft}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveExerciseViewSwitchingOverlay;
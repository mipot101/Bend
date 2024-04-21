import "./LiveExerciseViewStartingOverlay.css"

const LiveExerciseViewStartingOverlay = ({timeLeft}) => {
    const secondsLeft = Math.floor(timeLeft)

    return (
        <div className="starting-overlay">
            <div className="exercise">
                <div className="live-exercise-container">
                    <div className="live-exercise-timer" style={{borderColor: "transparent"}}>
                        {(secondsLeft >= 1) ?
                            <div className="starting-countdown">
                                {secondsLeft}
                            </div> : null}
                        {(secondsLeft < 1) ?
                            <div className="starting-countdown starting-countdown-starting">
                                beginnen
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveExerciseViewStartingOverlay;
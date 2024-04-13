import {AppStates} from "../../../App";
import "./LiveExerciseViewStartingOverlay.css"
import useCountdown from "../../../components/customhooks/useCountdown";

const LiveExerciseViewStartingOverlay = ({setAppState}) => {
    const onFinish = () => setAppState(AppStates.LIVE_EXERCISE_RUNNING)
    const [timeLeft, ...rest] = useCountdown(3.999, true, onFinish)
    const secondsLeft = Math.floor(timeLeft / 1000)

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
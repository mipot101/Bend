import {useEffect, useState} from "react";
import {AppStates} from "../../App";
import "./LiveExerciseViewSwitchingWrapper.css"
import LiveExerciseView from "./LiveExerciseView";

const LiveExerciseViewSwitchingWrapper = ({
                                              exerciseNumber,
                                              moveToNextExercise,
                                              moveToPreviousExercise,
                                              currentExerciseSet,
                                              appState,
                                              setAppState
                                          }) => {
    const totalCountdown = 5;
    const [time, setTime] = useState(totalCountdown)

    useEffect(() => {
        let timer = setInterval(() => {
            setTime((time) => time - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [setTime]);

    useEffect(() => {
        if (time <= 0) {
            setAppState(AppStates.LIVE_EXERCISE_RUNNING)
        }
    }, [time, setAppState]);

    return (
        <>
            <LiveExerciseView exerciseNumber={exerciseNumber}
                              moveToPreviousExercise={moveToPreviousExercise}
                              moveToNextExercise={moveToNextExercise}
                              currentExerciseSet={currentExerciseSet}
                              appState={appState}
                              setAppState={setAppState}/>
            <div className="switching-overlay">
                <div className="exercise">
                    <div className="live-exercise-container">
                        <div className="live-exercise-timer" style={{borderColor: "transparent"}}>
                            <div className="moving-circle"
                                 style={{
                                     animationDuration: `${totalCountdown}s`,
                                 }}
                                // onAnimationEnd={setAppState(AppStates.LIVE_EXERCISE_RUNNING)}
                            />
                            <div className="live-exercise-switching-countdown">
                                {time}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LiveExerciseViewSwitchingWrapper;
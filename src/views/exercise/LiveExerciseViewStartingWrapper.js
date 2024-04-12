import LiveExerciseView from "./LiveExerciseView";
import {useEffect, useState} from "react";
import {AppStates} from "../../App";
import "./LiveExerciseViewStartingWrapper.css"

const LiveExerciseViewStartingWrapper = ({
                                             exerciseNumber,
                                             moveToNextExercise,
                                             moveToPreviousExercise,
                                             currentExerciseSet,
                                             appState,
                                             setAppState
                                         }) => {
    const [time, setTime] = useState(3)

    useEffect(() => {
        let timer = setInterval(() => {
            setTime((time) => time - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [setTime]);

    useEffect(() => {
        if (time < 0) {
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
            <div className="starting-overlay">
                <div className="header"/>
                <div className="exercise">
                    <div className="live-exercise-container">
                        <div className="live-exercise-timer" style={{borderColor: "transparent"}}>
                            {(time > 0) ?
                                <div className="starting-countdown">
                                    {time}
                                </div> : null}
                            {(time === 0) ?
                                <div className="starting-countdown starting-countdown-starting">
                                    beginnen
                                </div> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LiveExerciseViewStartingWrapper;
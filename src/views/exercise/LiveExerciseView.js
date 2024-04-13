import "./LiveExerciseView.css"
import {faBackward, faCheck, faForward, faInfo, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import LiveExerciseImage from "./components/LiveExerciseImage";
import RoundButton from "../../components/RoundButton";
import Header from "../../components/Header";
import {AppStates} from "../../App";
import useCountdown from "../../components/customhooks/useCountdown";
import {useEffect} from "react";
import LiveExerciseViewStartingOverlay from "./components/LiveExerciseViewStartingOverlay";

const LiveExerciseView = ({
                              exerciseNumber,
                              moveToNextExercise,
                              moveToPreviousExercise,
                              currentExerciseSet,
                              appState,
                              setAppState
                          }) => {
    const exercise = currentExerciseSet[exerciseNumber]
    const exerciseDuration = exercise?.duration
    const [timeLeft, paused, started, pause, resume, start, restart] = useCountdown(exerciseDuration, false)

    useEffect(() => {
        if (appState === AppStates.LIVE_EXERCISE_RUNNING) {
            start()
        }
    }, [appState])


    const backwardButtonOnClick = () => {
        if (Math.abs(timeLeft - exerciseDuration * 1000) < 1000) {
            moveToPreviousExercise()
        } else {
            restart()
        }
    }

    const moveToNextExerciseAndResetTimers = () => {
        if (exerciseNumber < currentExerciseSet.length - 1) {
            moveToNextExercise()
            setAppState(AppStates.LIVE_EXERCISE_SWITCHING);
            restart()
        } else {
            setAppState(AppStates.PROGRAM_VIEW)
        }
    }


    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor(timeLeft / 1000) % 60;
    const percentageDone = 1 - ((timeLeft / 1000) / exerciseDuration);

    return (
        <div className="exercise-view">
            <Header title={`${exerciseNumber + 1} von ${currentExerciseSet.length}`} setAppState={setAppState}
                    appStateOnClose={AppStates.PROGRAM_VIEW}/>
            <div className="exercise">
                <LiveExerciseImage duration={exerciseDuration}
                                   image={exercise.image}
                                   percentageDone={percentageDone}
                                   animationPaused={paused}
                                   animationActive={started}
                                   moveToNextExercise={moveToNextExerciseAndResetTimers}
                                   startExercise={start}
                />
            </div>
            <div className="exercise-name">
                <p style={{paddingRight: "1rem"}}>{exercise.name}</p>
                <RoundButton icon={faInfo} size={1.5} onClick={() => {
                }}/>
            </div>
            <div className="timer">{minutes}:{seconds < 10 ? '0' + seconds : seconds}</div>
            <div className="controls">
                <div className="control-panel">
                    <div className="control-button">
                        <RoundButton icon={faBackward} size={3} color={"black"} onClick={backwardButtonOnClick}/>
                    </div>
                    <div className="control-button">
                        {paused ?
                            <RoundButton icon={faPlay} size={5} color={"black"} onClick={resume}/> :
                            <RoundButton icon={faPause} size={5} color={"black"} onClick={pause}/>}
                    </div>
                    {exerciseNumber < currentExerciseSet.length - 1 ?
                        <div className="control-button">
                            <RoundButton icon={faForward} size={3} color={"black"}
                                         onClick={moveToNextExerciseAndResetTimers}/>
                        </div>
                        :
                        <div className="control-button">
                            <RoundButton icon={faCheck} size={3} color={"green"}
                                         onClick={() => setAppState(AppStates.PROGRAM_VIEW)}/>
                        </div>
                    }
                </div>
            </div>
            {appState === AppStates.LIVE_EXERCISE_STARTING &&
                <LiveExerciseViewStartingOverlay setAppState={setAppState} key={Math.random()}/>}
        </div>
    );
}

export default LiveExerciseView;
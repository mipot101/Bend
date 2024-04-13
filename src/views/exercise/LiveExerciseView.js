import "./LiveExerciseView.css"
import {faBackward, faCheck, faForward, faInfo, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import LiveExerciseImage from "./components/LiveExerciseImage";
import RoundButton from "../../components/RoundButton";
import Header from "../../components/Header";
import {AppStates} from "../../App";
import {useCallback, useReducer, useState} from "react";
import LiveExerciseViewStartingOverlay from "./components/LiveExerciseViewStartingOverlay";
import LiveExerciseViewSwitchingOverlay from "./components/LiveExerciseViewSwitchingOverlay";
import {AvailableCountdowns, LiveExerciseActionsTypes, liveExerciseReducer} from "./hooks/LiveExerciseReducer";
import useReducerCountdown, {CountdownStates} from "../../components/hooks/ReducerCountdown";
import LiveExerciseTimer from "./components/LiveExerciseTimer";


const LiveExerciseView = ({
                              exerciseNumber,
                              moveToNextExercise,
                              moveToPreviousExercise,
                              currentExerciseSet,
                              setAppState
                          }) => {
    const exercise = currentExerciseSet[exerciseNumber]
    const exerciseDuration = exercise?.duration
    const switchingDuration = 4.999
    const startingDuration = 3.999;
    const initialCountdownStates = {
        currentCountdown: AvailableCountdowns.STARTING_COUNTDOWN,
        countdownState: CountdownStates.RUNNING
    }

    const [countdownsState, dispatchCountdownsState] = useReducer(liveExerciseReducer, initialCountdownStates)

    const liveCountdownOnFinish = useCallback(() => {
        moveToNextExercise()
        dispatchCountdownsState(LiveExerciseActionsTypes.LIVE_COUNTDOWN_END)
    }, [dispatchCountdownsState, moveToNextExercise])
    const startingCountdownOnFinish = useCallback(() => {
        dispatchCountdownsState(LiveExerciseActionsTypes.STARTING_COUNTDOWN_END)
    }, [dispatchCountdownsState])
    const switchingCountdownOnFinish = useCallback(() => {
        dispatchCountdownsState(LiveExerciseActionsTypes.SWITCHING_COUNTDOWN_END)
    }, [dispatchCountdownsState])
    const liveCountdownTimeLeft = useReducerCountdown(exerciseDuration, countdownsState.currentCountdown === AvailableCountdowns.LIVE_COUNTDOWN ? countdownsState.countdownState : CountdownStates.OFF, liveCountdownOnFinish)
    const switchingCountdownTimeLeft = useReducerCountdown(switchingDuration, countdownsState.currentCountdown === AvailableCountdowns.SWITCHING_COUNTDOWN ? countdownsState.countdownState : CountdownStates.OFF, switchingCountdownOnFinish)
    const startingCountdownTimeLeft = useReducerCountdown(startingDuration, countdownsState.currentCountdown === AvailableCountdowns.STARTING_COUNTDOWN ? countdownsState.countdownState : CountdownStates.OFF, startingCountdownOnFinish)
    const [animationVisible, setAnimationVisible] = useState(true)
    const currentCountdownDuration = countdownsState.currentCountdown === AvailableCountdowns.LIVE_COUNTDOWN ? exerciseDuration : countdownsState.currentCountdown === AvailableCountdowns.STARTING_COUNTDOWN ? startingDuration : switchingDuration


    const backwardButtonOnClick = () => {
        dispatchCountdownsState(LiveExerciseActionsTypes.RESTART_EXERCISE)
        setTimeout(() => dispatchCountdownsState(LiveExerciseActionsTypes.RESTART_EXERCISE_0), 10)
        setAnimationVisible(false)
        setTimeout(() => setAnimationVisible(true), 10)
        if (Math.abs(liveCountdownTimeLeft - exerciseDuration * 1000) < 1000) {
            moveToPreviousExercise()
        }
    }

    const forwardButtonOnClick = () => {
        moveToNextExercise()
        dispatchCountdownsState(LiveExerciseActionsTypes.EXERCISE_CHANGED)
    }

    const pauseButtonOnClick = () => {
        dispatchCountdownsState(LiveExerciseActionsTypes.PAUSE_BUTTON_CLICKED)
    }

    const resumeButtonOnClick = () => {
        dispatchCountdownsState(LiveExerciseActionsTypes.RESUME_BUTTON_CLICKED)
    }


    return (
        <div className="exercise-view">
            <Header title={`${exerciseNumber + 1} von ${currentExerciseSet.length}`} setAppState={setAppState}
                    appStateOnClose={AppStates.PROGRAM_VIEW}/>
            <div className="exercise">
                <LiveExerciseImage duration={currentCountdownDuration}
                                   image={exercise.image}
                                   animationPaused={countdownsState.countdownState === CountdownStates.PAUSED}
                                   animationVisible={animationVisible && countdownsState.currentCountdown !== AvailableCountdowns.STARTING_COUNTDOWN}
                                   key={countdownsState.currentCountdown}
                />
            </div>
            <div className="exercise-name">
                <p style={{paddingRight: "1rem"}}>{exercise.name}</p>
                <RoundButton icon={faInfo} size={1.5} onClick={() => {
                }}/>
            </div>
            <LiveExerciseTimer timeLeft={liveCountdownTimeLeft}/>
            <div className="controls">
                <div className="control-panel">
                    <div className="control-button">
                        <RoundButton icon={faBackward} size={3} color={"black"} onClick={backwardButtonOnClick}/>
                    </div>
                    <div className="control-button">
                        {countdownsState.countdownState === CountdownStates.PAUSED ?
                            <RoundButton icon={faPlay} size={5} color={"black"} onClick={resumeButtonOnClick}/> :
                            <RoundButton icon={faPause} size={5} color={"black"} onClick={pauseButtonOnClick}/>}
                    </div>
                    {exerciseNumber < currentExerciseSet.length - 1 ?
                        <div className="control-button">
                            <RoundButton icon={faForward} size={3} color={"black"}
                                         onClick={forwardButtonOnClick}/>
                        </div>
                        :
                        <div className="control-button">
                            <RoundButton icon={faCheck} size={3} color={"green"}
                                         onClick={() => setAppState(AppStates.PROGRAM_VIEW)}/>
                        </div>
                    }
                </div>
            </div>
            {countdownsState.currentCountdown === AvailableCountdowns.STARTING_COUNTDOWN &&
                <LiveExerciseViewStartingOverlay timeLeft={startingCountdownTimeLeft}/>}
            {countdownsState.currentCountdown === AvailableCountdowns.SWITCHING_COUNTDOWN &&
                <LiveExerciseViewSwitchingOverlay timeLeft={switchingCountdownTimeLeft}
                                                  totalCountdown={switchingDuration}/>}
        </div>
    );
}

export default LiveExerciseView;
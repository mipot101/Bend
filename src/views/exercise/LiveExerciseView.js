import "./LiveExerciseView.css"
import {faBackward, faForward, faInfo, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import LiveExerciseImage from "./components/LiveExerciseImage";
import {useEffect, useState} from "react";
import RoundButton from "../../components/RoundButton";
import Header from "../../components/Header";
import {AppStates} from "../../App";

const LiveExerciseView = ({
                              exerciseNumber,
                              moveToNextExercise,
                              moveToPreviousExercise,
                              currentExerciseSet,
                              setAppState
                          }) => {
    const exercise = currentExerciseSet[exerciseNumber]
    const exerciseDuration = exercise?.duration
    const [animationPaused, setAnimationPaused] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [totalPauseTime, setTotalPauseTime] = useState(0);
    const [animationPausedStart, setAnimationPausedStart] = useState(null);
    const [timeLeft, setTimeLeft] = useState(exerciseDuration);
    const currentTime = () => (animationPaused ? animationPausedStart : performance.now()) - startTime - totalPauseTime;

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(Math.max(exerciseDuration * 1000 - currentTime(), 0));
            }, 100);
        } else if (timer) {
            clearInterval(timer);
        }
        if (animationPaused && timer) {
            clearInterval(timer)
        }
        return () => clearInterval(timer);
    }, [animationPaused, exerciseDuration, currentTime, setTimeLeft]);


    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor(timeLeft / 1000) % 60;
    const percentageDone = 1 - ((timeLeft / 1000) / exerciseDuration);

    const toggleAnimation = () => {
        setAnimationPaused(!animationPaused);
    };
    return (
        <div className="exercise-view">
            <Header title={`${exerciseNumber + 1} von ${currentExerciseSet.length}`} setAppState={setAppState}
                    appStateOnClose={AppStates.PROGRAM_VIEW}/>
            <div className="exercise">
                <LiveExerciseImage duration={exerciseDuration} percentageDone={percentageDone}
                                   animationPaused={animationPaused} image={exercise.image}
                                   animationPausedStart={animationPausedStart}
                                   setAnimationPausedStart={setAnimationPausedStart}
                                   totalPauseTime={totalPauseTime}
                                   setTotalPauseTime={setTotalPauseTime}
                                   startTime={startTime}
                                   setStartTime={setStartTime}
                />
                <div className="exercise-name">
                    <p style={{paddingRight: "1rem"}}>Nach Oben Greifen</p>
                    <RoundButton icon={faInfo} size={1} onClick={() => {
                    }}/>
                </div>
            </div>
            <div className="timer">{minutes}:{seconds < 10 ? '0' + seconds : seconds}</div>
            <div className="controls">
                <div className="control-panel">
                    <div className="control-button">
                        <RoundButton icon={faBackward} size={3} color={"black"} onClick={moveToPreviousExercise}/>
                    </div>
                    <div className="control-button">
                        {animationPaused ?
                            <RoundButton icon={faPlay} size={5} color={"black"} onClick={toggleAnimation}/> :
                            <RoundButton icon={faPause} size={5} color={"black"} onClick={toggleAnimation}/>}
                    </div>
                    <div className="control-button">
                        <RoundButton icon={faForward} size={3} color={"black"} onClick={moveToNextExercise}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LiveExerciseView;
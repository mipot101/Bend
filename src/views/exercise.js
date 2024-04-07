import "./Exercise.css"
import {faBackward, faForward, faInfo, faPause, faPlay, faXmark} from "@fortawesome/free-solid-svg-icons";
import ExerciseImage from "../components/ExerciseImage";
import {useEffect, useState} from "react";
import RoundButton from "../components/RoundButton";

const ExerciseView = ({exercise_time}) => {
    const [animationPaused, setAnimationPaused] = useState(false);
    const [time, setTime] = useState(exercise_time * 1000); // Time in milliseconds
    const increment = 10;
    let timer;

    useEffect(() => {
        if (time > 0) {
            timer = setInterval(() => {
                setTime(prevTime => animationPaused ? prevTime : prevTime - increment);
            }, increment);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [animationPaused, time]);


    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor(time / 1000) % 60;
    const percentageDone = 1 - ((time / 1000) / exercise_time);

    const toggleAnimation = () => {
        setAnimationPaused(!animationPaused);
    };
    return (
        <div className="exercise-view">
            <div className="header">
                <div className="close-button">
                    <RoundButton icon={faXmark} size={2} onClick={() => {
                    }}/>
                </div>
                <div className="exercise-number-container">
                    <div className="exercise-number">1 von 8</div>
                </div>
            </div>

            <div className="exercise">
                <ExerciseImage time={exercise_time} perc_done={percentageDone} animationPaused={animationPaused}/>
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
                        <RoundButton icon={faBackward} size={3}/>
                    </div>
                    <div className="control-button">
                        {animationPaused ?
                            <RoundButton icon={faPlay} size={5} onClick={toggleAnimation}/> :
                            <RoundButton icon={faPause} size={5} onClick={toggleAnimation}/>}
                    </div>
                    <div className="control-button">
                        <RoundButton icon={faForward} size={3}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExerciseView;
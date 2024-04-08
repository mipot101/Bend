import "./ExerciseTime.css"
import RoundButton from "../../../components/RoundButton";

import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

const ExerciseTime = () => {
    const [exerciseTime, setExerciseTime] = useState(30);
    const minutes = Math.floor(exerciseTime / 60);
    const seconds = Math.floor(exerciseTime % 60);
    return (
        <div className="exercise-time-container">
            <RoundButton size={1.5} icon={faMinus} color={"gray"} onClick={() => {
                setExerciseTime((oldTime) => oldTime > 0 ? oldTime - 15 : oldTime)
            }}/>
            <div className="exercise-time-display">
                {minutes}:{seconds < 10 ? '0' + seconds : seconds}
            </div>
            <RoundButton size={1.5} icon={faPlus} color={"gray"} onClick={() => {
                setExerciseTime((oldTime) => oldTime + 15)
            }}/>
        </div>
    )
}

export default ExerciseTime;
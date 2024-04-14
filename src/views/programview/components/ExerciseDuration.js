import "./ExerciseDuration.css"
import RoundButton from "../../../components/RoundButton";

import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

const ExerciseDuration = ({exercise, exerciseIndex, exerciseSet, setExerciseSet}) => {
    const setExerciseTime = (increment) => {
        const newExerciseSet = exerciseSet.map((item, index) => {
            if (index === exerciseIndex) {
                const newItem = item
                newItem.duration = Math.max(item.duration + increment, 0)
                return newItem
            }
            return item
        })
        setExerciseSet(newExerciseSet)
    }
    const minutes = Math.floor(exercise.duration / 60);
    const seconds = Math.floor(exercise.duration % 60);
    return (
        <div className="exercise-duration-container">
            <RoundButton size={1.5} icon={faMinus} color={"gray"} onClick={() => {
                setExerciseTime(-15)
            }}/>
            <div className="exercise-duration-display">
                {minutes}:{seconds < 10 ? '0' + seconds : seconds}
            </div>
            <RoundButton size={1.5} icon={faPlus} color={"gray"} onClick={() => {
                setExerciseTime(+15)
            }}/>
        </div>
    )
}

export default ExerciseDuration;
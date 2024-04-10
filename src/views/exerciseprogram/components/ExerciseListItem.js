import "./ExerciseListItem.css"
import ExerciseIcon from "../../../components/ExerciseIcon";
import ExerciseDuration from "./ExerciseDuration";

const ExerciseListItem = ({exercise, exerciseIndex, exerciseSet, setExerciseSet, ...props}) => {
    return (
        <div {...props} className='container'>
            <div className='icon-container'>
                <ExerciseIcon size="3rem" image={exercise.image}/>
            </div>
            <div className="name">{exercise.name}</div>
            <ExerciseDuration exercise={exercise} exerciseIndex={exerciseIndex} exerciseSet={exerciseSet}
                              setExerciseSet={setExerciseSet}/>
        </div>
    )
}

export default ExerciseListItem;
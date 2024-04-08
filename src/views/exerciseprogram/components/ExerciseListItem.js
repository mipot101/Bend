import "./ExerciseListItem.css"
import ExerciseIcon from "../../../components/ExerciseIcon";
import ExerciseTime from "./ExerciseTime";

const ExerciseListItem = ({exercise, ...props}) => {
    return (
        <div {...props} className='container'>
            <div className='icon-container'>
                <ExerciseIcon size="3rem" image={exercise.image}/>
            </div>
            <div className="name">{exercise.name}</div>
            <ExerciseTime/>
        </div>
    )
}

export default ExerciseListItem;
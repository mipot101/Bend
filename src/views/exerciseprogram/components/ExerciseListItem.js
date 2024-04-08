import "./ExerciseListItem.css"
import ExerciseIcon from "../../../components/ExerciseIcon";
import ExerciseTime from "./ExerciseTime";

const ExerciseListItem = ({name, ...props}) => {
    return (
        <div {...props} className='container'>
            <div className='icon-container'>
                <ExerciseIcon size="3rem"/>
            </div>
            <div className="name">{name}</div>
            <ExerciseTime/>
        </div>
    )
}

export default ExerciseListItem;
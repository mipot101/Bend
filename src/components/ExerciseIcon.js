import myImage from "../icons/Nach_Oben_Greifen.png"
import "./ExerciseIcon.css"

const ExerciseIcon = ({size, ...props}) => {
    return (
        <div {...props}>
            <div className="exercise-image"
                 style={{height: `${size}`, width: `${size}`, backgroundImage: `url(${myImage})`}}/>
        </div>
    )
}

export default ExerciseIcon;
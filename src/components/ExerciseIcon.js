import myImage from "../icons/Nach_Oben_Greifen.png"
import "./ExerciseIcon.css"

const ExerciseIcon = ({size, image = myImage, ...props}) => {
    return (
        <div {...props}>
            <div className="exercise-image"
                 style={{height: `${size}`, width: `${size}`, backgroundImage: `url(${image})`}}/>
        </div>
    )
}

export default ExerciseIcon;
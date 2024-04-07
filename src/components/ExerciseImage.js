import myImage from "../icons/Nach_Oben_Greifen.png";
import "./ExerciseImage.css";

const ExerciseImage = ({time, animationPaused, perc_done}) => {

    return (
        <div className="exercise-container">
            <div className="exercise-timer">
                <div className="exercise-image" style={{backgroundImage: `url(${myImage})`}}/>
                <div className="moving-circle" style={{animationDuration: `15s`}}
                     style={{
                         animationDuration: `${time}s`,
                         animationPlayState: animationPaused ? 'paused' : 'running',
                         '--degree': `${Math.floor(perc_done * 360)}deg`
                     }}/>
            </div>

        </div>
    )
}

export default ExerciseImage;
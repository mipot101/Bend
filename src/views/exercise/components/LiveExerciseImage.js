import myImage from "../../../icons/Nach_Oben_Greifen.png";
import "./LiveExerciseImage.css";

const LiveExerciseImage = ({time, animationPaused, perc_done}) => {

    return (
        <div className="live-exercise-container">
            <div className="live-exercise-timer">
                <div className="live-exercise-image" style={{backgroundImage: `url(${myImage})`}}/>
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

export default LiveExerciseImage;
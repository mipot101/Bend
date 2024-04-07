import "./exercise.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import myImage from "../icons/Nach_Oben_Greifen.png"

const ExerciseView = () => {
    return (
        <div className="exercise-view">
            <div className="header">
                <div className="close-button">
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
                <div className="exercise-number-container">
                    <div className="exercise-number">1 von 8</div>
                </div>
            </div>

            <div className="exercise">
                <div className="exercise-container">
                    <div className="exercise-timer">
                        <div className="exercise-image" style={{backgroundImage: `url(${myImage})`}}/>
                    </div>
                </div>

                <div className="exercise-name">
                    Nach Oben Greifen
                </div>
            </div>
            <div className="timer">0:30</div>
            <div className="controls"></div>
        </div>
    );
}

export default ExerciseView;
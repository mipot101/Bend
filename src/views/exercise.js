import "./exercise.css"
import FontAwesomeIcon from "@fortawesome/fontawesome-free"

const ExerciseView = () => {
    return (
        <div className="exercise-view">
            <div className="header">
                <div className="close-button">
                    <FontAwesomeIcon icon="fa-solid fa-x"/>
                </div>
                <div className="exercise-number-container">
                    <div className="exercise-number">1 von 8</div>
                </div>
            </div>
            <div className="exercise">Nach Oben Greifen</div>
            <div className="timer">0:30</div>
            <div className="controls"></div>
        </div>
    );
}

export default ExerciseView;
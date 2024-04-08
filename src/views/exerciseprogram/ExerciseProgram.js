import Header from "../../components/Header";
import "./ExerciseProgram.css"
import ExerciseListItem from "./components/ExerciseListItem";
import {AppStates} from "../../App";

const ExerciseProgram = ({setAppState, exerciseSet}) => {
    return (<div className="exercise-program">
        <Header title={"Pias Programm"} setAppState={setAppState} appStateOnClose={AppStates.DEFAULT_VIEW}/>
        <div className="exercise-list">
            {/* Map through the items array and render each item */}
            {exerciseSet.map((exercise, index) => (
                <ExerciseListItem key={index} exercise={exercise}/>
            ))}
        </div>
        <div className="exercise-program-blur"/>
        <button className="exercise-start-button" onClick={() => {
            setAppState(AppStates.LIVE_EXERCISE_VIEW)
        }}>
            BEGINNEN
        </button>
    </div>)
}

export default ExerciseProgram;
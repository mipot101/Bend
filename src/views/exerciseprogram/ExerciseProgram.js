import Header from "../../components/Header";
import "./ExerciseProgram.css"
import ExerciseListItem from "./components/ExerciseListItem";
import {AppStates} from "../../App";

const ExerciseProgram = ({setAppState, exerciseSet, setExerciseSet}) => {
    return (<div className="exercise-program">
        <Header title={"Pias Programm"} setAppState={setAppState} appStateOnClose={AppStates.DEFAULT_VIEW}/>
        <div className="exercise-list">
            {exerciseSet.map((exercise, index) => (
                <ExerciseListItem key={index} exerciseIndex={index} exercise={exercise} exerciseSet={exerciseSet}
                                  setExerciseSet={setExerciseSet}/>
            ))}
        </div>
        <div className="exercise-program-blur"/>
        <button className="exercise-start-button" onClick={() => {
            setAppState(AppStates.LIVE_EXERCISE_STARTING)
        }}>
            BEGINNEN
        </button>
    </div>)
}

export default ExerciseProgram;
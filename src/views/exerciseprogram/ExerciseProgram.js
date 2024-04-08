import Header from "../../components/Header";
import "./ExerciseProgram.css"
import ExerciseListItem from "./components/ExerciseListItem";
import {AppStates} from "../../App";

const ExerciseProgram = ({setAppState}) => {
    const items = ["Falten Nach Vorne", "Pflug", "Katze Kuh", "Die ultimative Dehnübung für maximale Stärke", 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5]
    return (<div className="exercise-program">
        <Header title={"Pias Programm"} setAppState={setAppState} appStateOnClose={AppStates.DEFAULT_VIEW}/>
        <div className="exercise-list">
            {/* Map through the items array and render each item */}
            {items.map((item, index) => (
                <ExerciseListItem key={index} name={item}/>
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
import Header from "../../components/Header";
import "./ExerciseProgram.css"
import ExerciseListItem from "./components/ExerciseListItem";

const ExerciseProgram = () => {
    const items = ["Falten Nach Vorne", "Pflug", "Katze Kuh", "Die ultimative Dehnübung für maximale Stärke", 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5]
    return (<div className="exercise-program">
        <Header title={"Pias Programm"}/>
        <div className="exercise-list">
            {/* Map through the items array and render each item */}
            {items.map((item, index) => (
                <ExerciseListItem key={index} name={item}/>
            ))}
        </div>
        <div className="exercise-program-blur"/>
        <button className="exercise-start-button" onClick={() => {
        }}>
            BEGINNEN
        </button>
    </div>)
}

export default ExerciseProgram;
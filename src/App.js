import './App.css';
import LiveExerciseView from "./views/exercise/LiveExerciseView";
import {useState} from "react";
import ExerciseProgram from "./views/exerciseprogram/ExerciseProgram";
import DefaultView from "./views/defaultview/DefaultView";
import NachObenGreifen from "./icons/Nach_Oben_Greifen.png"
import ZehenBeruhren from "./icons/Zehen_Beruehren.png"
import BreiteBeinbeuge from "./icons/Breite_Beinbeuge.png"
import SeitlicherAusfallschritt from "./icons/Seitlicher_Ausfallschritt.png"

export const AppStates = {
    DEFAULT_VIEW: 0,
    PROGRAM_VIEW: 1,
    LIVE_EXERCISE_VIEW: 2
}

export class Exercise {
    constructor(name, image, duration) {
        this.name = name;
        this.image = image;
        this.duration = duration;
    }
}

function App() {
    const defaultExerciseSet = [
        new Exercise("Nach Oben Greifen", NachObenGreifen, 30),
        new Exercise("Zehen Berühren", ZehenBeruhren, 45),
        new Exercise("Breite Beinbeuge", BreiteBeinbeuge, 45),
        new Exercise("Seitlicher Ausfallschritt", SeitlicherAusfallschritt, 60),
    ]
    const [appState, setAppState] = useState(AppStates.DEFAULT_VIEW);
    const [currentExerciseSet, setCurrentExerciseSet] = useState(defaultExerciseSet);
    const [currentExercise, setCurrentExercise] = useState(null);

    const currentView = () => {
        switch (appState) {
            case AppStates.DEFAULT_VIEW:
                return (<DefaultView setAppState={setAppState}/>)
            case AppStates.PROGRAM_VIEW:
                return (<ExerciseProgram setAppState={setAppState} exerciseSet={currentExerciseSet}/>)
            case AppStates.LIVE_EXERCISE_VIEW:
                return (<LiveExerciseView exercise_time={20} setAppState={setAppState}/>)
        }
    }
    /* Set the window height of html and body automatically, to solve mobile browser issu*/
    const documentHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
        console.log(window.innerHeight)
    }
    window.addEventListener('resize', documentHeight)
    documentHeight()
    return (
        <div className="App">
            {currentView()}
        </div>
    );
}

export default App;

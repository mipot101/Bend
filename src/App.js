import './App.css';
import LiveExerciseView from "./views/exercise/LiveExerciseView";
import {useState} from "react";
import ExerciseProgram from "./views/exerciseprogram/ExerciseProgram";
import DefaultView from "./views/defaultview/DefaultView";

const View = {
    DEFAULT_VIEW: 0,
    PROGRAM_VIEW: 1,
    STRETCHING_VIEW: 2
}

function App() {
    const [appState, setAppState] = useState(View.DEFAULT_VIEW);
    const [currentExercise, setCurrentExercise] = useState(null);
    const currentView = () => {
        switch (appState) {
            case View.DEFAULT_VIEW:
                return (<DefaultView/>)
            case View.PROGRAM_VIEW:
                return (<ExerciseProgram/>)
            case View.STRETCHING_VIEW:
                return (<LiveExerciseView exercise_time={20}/>)
        }
    }
    /* Set the window height of html and body automatically, to solve mobile browser issues */
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

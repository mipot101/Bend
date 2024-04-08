import './App.css';
import LiveExerciseView from "./views/exercise/LiveExerciseView";
import {useState} from "react";
import ExerciseProgram from "./views/exerciseprogram/ExerciseProgram";
import DefaultView from "./views/defaultview/DefaultView";

export const AppStates = {
    DEFAULT_VIEW: 0,
    PROGRAM_VIEW: 1,
    LIVE_EXERCISE_VIEW: 2
}

export const ExerciseSet = {}

function App() {
    const [appState, setAppState] = useState(AppStates.LIVE_EXERCISE_VIEW);
    const [currentExerciseSet, setCurrentExerciseSet] = useState(null);
    const [currentExercise, setCurrentExercise] = useState(null);
    const currentView = () => {
        switch (appState) {
            case AppStates.DEFAULT_VIEW:
                return (<DefaultView setAppState={setAppState}/>)
            case AppStates.PROGRAM_VIEW:
                return (<ExerciseProgram setAppState={setAppState}/>)
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

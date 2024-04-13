import './App.css';
import LiveExerciseView from "./views/exercise/LiveExerciseView";
import {useEffect, useState} from "react";
import ExerciseProgram from "./views/exerciseprogram/ExerciseProgram";
import DefaultView from "./views/defaultview/DefaultView";
import NachObenGreifen from "./icons/Nach_Oben_Greifen.png"
import ZehenBeruhren from "./icons/Zehen_Beruehren.png"
import BreiteBeinbeuge from "./icons/Breite_Beinbeuge.png"
import SeitlicherAusfallschritt from "./icons/Seitlicher_Ausfallschritt.png"

export const AppStates = {
    DEFAULT_VIEW: 0,
    PROGRAM_VIEW: 1,
    LIVE_EXERCISE_VIEW: 2,

}

export class Exercise {
    constructor(name, image, duration) {
        this.name = name;
        this.image = image;
        this.duration = duration;
    }
}

const useExerciseNumber = (exerciseSetLength, setAppState) => {
    const [currentExerciseNumber, setCurrentExerciseNumber] = useState(0);
    const moveToNextExercise = () => {
        setCurrentExerciseNumber((prevNumber) => {
            const nextExercise = prevNumber + 1
            if (nextExercise < exerciseSetLength) {
                return nextExercise
            } else {
                setAppState(AppStates.PROGRAM_VIEW)
                return exerciseSetLength - 1
            }
        })
    }
    const moveToPreviousExercise = () => {
        setCurrentExerciseNumber((prevNumber) => prevNumber > 0 ? prevNumber - 1 : 0)
    }
    const resetExercise = () => {
        setCurrentExerciseNumber(0)
    }
    return [currentExerciseNumber, moveToPreviousExercise, moveToNextExercise, resetExercise]
}

function App() {
    const defaultExerciseSet = [
        new Exercise("Nach Oben Greifen", NachObenGreifen, 10),
        new Exercise("Zehen Berühren", ZehenBeruhren, 10),
        new Exercise("Breite Beinbeuge", BreiteBeinbeuge, 10),
        new Exercise("Seitlicher Ausfallschritt", SeitlicherAusfallschritt, 10),
    ]
    const [appState, setAppState] = useState(AppStates.LIVE_EXERCISE_VIEW);
    const [currentExerciseSet, setCurrentExerciseSet] = useState(defaultExerciseSet);
    const [currentExerciseNumber, moveToPreviousExercise, moveToNextExercise, resetExercise] = useExerciseNumber(currentExerciseSet.length, setAppState);

    useEffect(() => {
        if (appState !== AppStates.LIVE_EXERCISE_VIEW) {
            resetExercise()
        }
    }, [appState, resetExercise]);

    const currentView = () => {
        switch (appState) {
            default:
            case AppStates.DEFAULT_VIEW:
                return (<DefaultView setAppState={setAppState}/>)
            case AppStates.PROGRAM_VIEW:
                return (<ExerciseProgram setAppState={setAppState} exerciseSet={currentExerciseSet}
                                         setExerciseSet={setCurrentExerciseSet}/>)
            case AppStates.LIVE_EXERCISE_VIEW:
                return (<LiveExerciseView exerciseNumber={currentExerciseNumber}
                                          moveToPreviousExercise={moveToPreviousExercise}
                                          moveToNextExercise={moveToNextExercise}
                                          currentExerciseSet={currentExerciseSet}
                                          setAppState={setAppState}/>)
        }
    }
    /* Set the window height of html and body automatically, to solve mobile browser issu*/
    const documentHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
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

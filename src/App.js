import './App.css';
import LiveExerciseView from "./views/exercise/LiveExerciseView";
import {useEffect, useState} from "react";
import ExerciseProgram from "./views/exerciseprogram/ExerciseProgram";
import DefaultView from "./views/defaultview/DefaultView";
import NachObenGreifen from "./icons/Nach_Oben_Greifen.png"
import ZehenBeruhren from "./icons/Zehen_Beruehren.png"
import BreiteBeinbeuge from "./icons/Breite_Beinbeuge.png"
import SeitlicherAusfallschritt from "./icons/Seitlicher_Ausfallschritt.png"
import LiveExerciseViewStartingWrapper from "./views/exercise/LiveExerciseViewStartingWrapper";

export const AppStates = {
    DEFAULT_VIEW: 0,
    PROGRAM_VIEW: 1,
    LIVE_EXERCISE_RUNNING: 2,
    LIVE_EXERCISE_STARTING: 3,
    LIVE_EXERCISE_SWITCHING: 4,

    isLive: (state) => {
        return (
            state === AppStates.LIVE_EXERCISE_RUNNING ||
            state === AppStates.LIVE_EXERCISE_STARTING ||
            state === AppStates.LIVE_EXERCISE_SWITCHING
        );
    }
}

export class Exercise {
    constructor(name, image, duration) {
        this.name = name;
        this.image = image;
        this.duration = duration;
    }
}

const useExerciseNumber = () => {
    const [currentExerciseNumber, setCurrentExerciseNumber] = useState(0);
    const moveToNextExercise = () => {
        setCurrentExerciseNumber((prev_number) => prev_number + 1)
    }
    const moveToPreviousExercise = () => {
        setCurrentExerciseNumber((prev_number) => prev_number > 0 ? prev_number - 1 : 0)
    }
    const resetExercise = () => {
        setCurrentExerciseNumber(0)
    }
    return [currentExerciseNumber, moveToPreviousExercise, moveToNextExercise, resetExercise]
}

function App() {
    const defaultExerciseSet = [
        new Exercise("Nach Oben Greifen", NachObenGreifen, 3),
        new Exercise("Zehen Berühren", ZehenBeruhren, 4),
        new Exercise("Breite Beinbeuge", BreiteBeinbeuge, 5),
        new Exercise("Seitlicher Ausfallschritt", SeitlicherAusfallschritt, 6),
    ]
    const [appState, setAppState] = useState(AppStates.LIVE_EXERCISE_STARTING);
    const [currentExerciseSet, setCurrentExerciseSet] = useState(defaultExerciseSet);
    const [currentExerciseNumber, moveToPreviousExercise, moveToNextExercise, resetExercise] = useExerciseNumber();

    useEffect(() => {
        if (!AppStates.isLive(appState)) {
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
            case AppStates.LIVE_EXERCISE_STARTING:
                return (<LiveExerciseViewStartingWrapper exerciseNumber={currentExerciseNumber}
                                                         moveToPreviousExercise={moveToPreviousExercise}
                                                         moveToNextExercise={moveToNextExercise}
                                                         currentExerciseSet={currentExerciseSet}
                                                         appState={appState}
                                                         setAppState={setAppState}/>)
            case AppStates.LIVE_EXERCISE_SWITCHING:
            case AppStates.LIVE_EXERCISE_RUNNING:
                return (<LiveExerciseView exerciseNumber={currentExerciseNumber}
                                          moveToPreviousExercise={moveToPreviousExercise}
                                          moveToNextExercise={moveToNextExercise}
                                          currentExerciseSet={currentExerciseSet}
                                          appState={appState}
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

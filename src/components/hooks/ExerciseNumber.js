import {useState} from "react";
import {AppStates} from "../../App";

export const useExerciseNumber = (exerciseSetLength, setAppState) => {
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
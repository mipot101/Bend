import {CountdownStates} from "../../../components/hooks/ReducerCountdown";

export const LiveExerciseActionsTypes = {
    EXERCISE_CHANGED: 0,
    RESTART_EXERCISE: 1,
    RESTART_EXERCISE_0: 2, // This one gets called 10ms after RESTART_EXERICSE to reset timers and animation
    PAUSE_BUTTON_CLICKED: 3,
    RESUME_BUTTON_CLICKED: 4,
    LIVE_COUNTDOWN_END: 5,
    STARTING_COUNTDOWN_END: 6,
    SWITCHING_COUNTDOWN_END: 7,
}


export const AvailableCountdowns = {
    LIVE_COUNTDOWN: 0,
    STARTING_COUNTDOWN: 1,
    SWITCHING_COUNTDOWN: 2,
}

const liveExerciseReducerHelper = (state, action) => {
    switch (action) {
        case LiveExerciseActionsTypes.EXERCISE_CHANGED: {
            return {
                currentCountdown: AvailableCountdowns.SWITCHING_COUNTDOWN,
                countdownState: CountdownStates.RUNNING
            };
        }
        case LiveExerciseActionsTypes.RESTART_EXERCISE: {
            return {
                currentCountdown: AvailableCountdowns.LIVE_COUNTDOWN,
                countdownState: CountdownStates.OFF,
                preserveState: state.countdownState
            };
        }
        case LiveExerciseActionsTypes.RESTART_EXERCISE_0: {
            return {
                currentCountdown: AvailableCountdowns.LIVE_COUNTDOWN,
                countdownState: state.preserveState ? state.preserveState : CountdownStates.RUNNING
            };
        }
        case LiveExerciseActionsTypes.PAUSE_BUTTON_CLICKED: {
            return {
                currentCountdown: state.currentCountdown,
                countdownState: CountdownStates.PAUSED
            };
        }
        case LiveExerciseActionsTypes.RESUME_BUTTON_CLICKED: {
            return {
                currentCountdown: state.currentCountdown,
                countdownState: CountdownStates.RUNNING
            };
        }
        case LiveExerciseActionsTypes.LIVE_COUNTDOWN_END: {
            return {
                currentCountdown: AvailableCountdowns.SWITCHING_COUNTDOWN,
                countdownState: CountdownStates.RUNNING
            };
        }
        case LiveExerciseActionsTypes.SWITCHING_COUNTDOWN_END:
        case LiveExerciseActionsTypes.STARTING_COUNTDOWN_END: {
            return {
                currentCountdown: AvailableCountdowns.LIVE_COUNTDOWN,
                countdownState: CountdownStates.RUNNING
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


export const liveExerciseReducer = (state, action) => {
    const newState = liveExerciseReducerHelper(state, action)
    // console.log(`${state.countdownState} -> ${newState.countdownState} (${performance.now()})`)
    console.log("Reducer changing state:", {action, prevState: state, newState: newState})
    return newState
}

import Header from "../../components/Header";
import "./AddProgram.css"
import {AppStates} from "../../App";
import RoutinePreview from "./components/RoutinePreview";


const AddProgram = ({setAppState}) => {


    return (
        <div className="exercise-program">
            <Header title="Neues Programm" setAppState={setAppState} appStateOnClose={AppStates.DEFAULT_VIEW}/>
            <RoutinePreview/>
        </div>
    )
}

export default AddProgram;
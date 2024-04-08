import "./ProgramList.css"
import ExerciseIcon from "../../../components/ExerciseIcon";
import {AppStates} from "../../../App";

const ProgramList = ({myPrograms, myProgramDurations, setAppState}) => {
    return (
        <div className="home-view-my-program-list-container">
            <div className="home-view-my-program-list-title">
                Meine Programme
            </div>
            <div className="home-view-my-program-list">
                {myPrograms.map((program, index) => (
                    <button key={index} className="home-view-my-program-list-item" onClick={() => {
                        setAppState(AppStates.PROGRAM_VIEW)
                    }}>
                        <ExerciseIcon size={"3.5rem"}/>
                        <div className="home-view-my-program-list-item-title">
                            {program}
                        </div>
                        <div className="home-view-my-program-list-item-duration">
                            {myProgramDurations[index]} Minuten
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ProgramList;
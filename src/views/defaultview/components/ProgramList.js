import "./ProgramList.css"
import ExerciseIcon from "../../../components/ExerciseIcon";

const ProgramList = ({myPrograms, myProgramDurations}) => {
    return (
        <div className="home-view-my-program-list-container">
            <div className="home-view-my-program-list-title">
                Meine Programme
            </div>
            <div className="home-view-my-program-list">
                {myPrograms.map((program, index) => (
                    <div key={index} className="home-view-my-program-list-item">
                        <ExerciseIcon size={"3.5rem"}/>
                        <div className="home-view-my-program-list-item-title">
                            {program}
                        </div>
                        <div className="home-view-my-program-list-item-duration">
                            {myProgramDurations[index]} Minuten
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProgramList;
import "./History.css"
import ExerciseIcon from "../../../components/ExerciseIcon";

const History = ({historyPrograms, historyProgramDates}) => {
    return (
        <div className="home-view-my-history-list-container">
            <div className="home-view-my-history-list-title">
                Meine Geschichte
            </div>
            <div className="home-view-my-history-list">
                {historyPrograms.map((program, index) => (
                    <div key={index} className="home-view-my-history-list-item">
                        <div className="home-view-my-history-list-item-image">
                            <ExerciseIcon size={"3rem"}/>
                        </div>
                        <div className="home-view-my-history-list-item-text">
                            <div className="home-view-my-history-list-item-duration">
                                {historyProgramDates[index]}
                            </div>
                            <div className="home-view-my-history-list-item-title">
                                {program}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default History;
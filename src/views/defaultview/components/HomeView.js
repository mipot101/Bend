import "./HomeView.css"
import ProgramList from "./ProgramList";
import History from "./History";

const HomeView = ({setAppState}) => {
    const myPrograms = ["Programm 1", "Programm 2", "Programm 3", "Programm 1", "Programm 2", "Programm 3", "Programm 1", "Programm 2", "Programm 3"]
    const myProgramDurations = [10, 15, 20]
    const myHistoryProgramDates = ["6/4/24", "6/4/24", "6/4/24", "6/4/24", "6/4/24", "6/4/24", "6/4/24", "6/4/24"]
    return (
        <div className="home-view-container">
            <ProgramList myPrograms={myPrograms} myProgramDurations={myProgramDurations} setAppState={setAppState}/>
            <History historyPrograms={myPrograms} historyProgramDates={myHistoryProgramDates}/>
        </div>
    )
}

export default HomeView;
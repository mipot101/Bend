import {useState} from "react";
import "./DefaultView.css"
import HomeView from "./components/HomeView";
import StatsView from "./components/StatsView";
import DefaultHeader from "./components/DefaultHeader";

export const DefaultViewStates = {
    HOME: "Meine Bibliothek",
    STATS: "Statistik"
}
const DefaultView = ({setAppState}) => {
    const [state, setState] = useState(DefaultViewStates.HOME);
    const currentView = () => {
        switch (state) {
            case DefaultViewStates.HOME:
                return (<HomeView setAppState={setAppState}/>)
            case DefaultViewStates.STATS:
                return (<StatsView/>)
        }
    }

    return (
        <div className="default-view-container">
            <DefaultHeader setState={setState} title={state}/>
            <div className="view-container">
                {currentView()}
            </div>
        </div>
    )
}
export default DefaultView;
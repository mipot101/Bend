import Header from "../../components/Header";
import "./AddProgram.css"
import {AppStates} from "../../App";
import {useState} from "react";
import {DndProvider} from "react-dnd-multi-backend";
import DraggableList from "./components/DraggableList";
import {HTML5toTouch} from "rdndmb-html5-to-touch";


const AddProgram = ({setAppState}) => {

    const [items, setItems] = useState([
        {id: 1, text: 'Item 1'},
        {id: 2, text: 'Item 2'},
        {id: 3, text: 'Item 3'},
    ]);


    return (
        <div className="exercise-program">
            <Header title="Neues Programm" setAppState={setAppState} appStateOnClose={AppStates.DEFAULT_VIEW}/>
            <DndProvider options={HTML5toTouch}>
                <DraggableList items={items} setItems={setItems}/>
            </DndProvider>
        </div>
    )
}

export default AddProgram;
import "./RoutinePreview.css";
// import {DndProvider} from "react-dnd-multi-backend";
// import {HTML5toTouch} from "rdndmb-html5-to-touch";
import DraggableGrid from "./DraggableGrid";
import NachObenGreifen from "../../../icons/Nach_Oben_Greifen.png"
import ZehenBeruhren from "../../../icons/Zehen_Beruehren.png"
import BreiteBeinbeuge from "../../../icons/Breite_Beinbeuge.png"
import SeitlicherAusfallschritt from "../../../icons/Seitlicher_Ausfallschritt.png"
import {useState} from "react";
import {DndProvider} from "react-dnd";
import {TouchBackend} from "react-dnd-touch-backend";

const RoutinePreview = () => {
    const [exercise, setExercise] = useState([
        {id: 1, text: 'Item 1', icon: NachObenGreifen},
        {id: 2, text: 'Item 2', icon: ZehenBeruhren},
        {id: 3, text: 'Item 3', icon: BreiteBeinbeuge},
        {id: 4, text: 'Item 4', icon: SeitlicherAusfallschritt},
    ]);
    return (
        // <DndProvider options={HTML5toTouch}>
        <DndProvider backend={TouchBackend}>
            <DraggableGrid items={exercise} setItems={setExercise}/>
        </DndProvider>
        // </DndProvider>
    )
}

export default RoutinePreview;
// DraggableList.js
import React from 'react';
import "./DraggableGrid.css";
import DraggableItem from "./DraggableItem";

export const ItemTypes = {
    CARD: 'card',
};


const DraggableGrid = ({items, setItems}) => {
    const moveCard = (dragIndex, hoverIndex) => {
        const dragItem = items[dragIndex];
        const newItems = [...items];
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, dragItem);
        setItems(newItems);
    };

    return (
        <div className="draggable-grid-container">
            {items.map((item, index) => (
                <DraggableItem key={item.id} id={item.id} icon={item.icon} index={index} moveCard={moveCard}/>
            ))}
        </div>
    );
};

export default DraggableGrid;

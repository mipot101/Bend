// DraggableList.js
import React from 'react';
import {useDrag, useDrop} from 'react-dnd';

const ItemTypes = {
    CARD: 'card',
};

const DraggableItem = ({id, text, index, moveCard}) => {
    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.CARD,
        item: {type: ItemTypes.CARD, id, index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        hover(item, monitor) {
            if (!drop) {
                return;
            }
            if (item.index === index) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const opacity = isDragging ? 0.5 : 1;

    return (
        <div ref={(node) => drag(drop(node))} style={{opacity}}>
            {text}
        </div>
    );
};

const DraggableList = ({items, setItems}) => {
    const moveCard = (dragIndex, hoverIndex) => {
        const dragItem = items[dragIndex];
        const newItems = [...items];
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, dragItem);
        setItems(newItems);
    };

    return (
        <div>
            {items.map((item, index) => (
                <DraggableItem key={item.id} id={item.id} text={item.text} index={index} moveCard={moveCard}/>
            ))}
        </div>
    );
};

export default DraggableList;

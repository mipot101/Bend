import "./DraggableItem.css";
import {useDrag, useDrop} from "react-dnd";
import {ItemTypes} from "./DraggableGrid";

const DraggableItem = ({id, icon, index, moveCard}) => {
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
        <>
            <div ref={(node) => drag(drop(node))}
                 className="draggable-item"
                 style={{backgroundImage: `url(${icon})`, opacity}}/>
        </>

    );
};
export default DraggableItem;
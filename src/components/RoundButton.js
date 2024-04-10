import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./RoundButton.css";

const RoundButton = ({size, onClick, icon, color}) => {
    return (
        <button className="button" style={{height: `${size}rem`, width: `${size}rem`}} onClick={onClick}>
            <FontAwesomeIcon icon={icon} size={`${Math.max(Math.floor(size / 2), 1)}x`} color={color}/>
        </button>
    )
}

export default RoundButton;
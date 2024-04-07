import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./RoundButton.css";

const RoundButton = ({size, onClick, icon}) => {
    return (
        <button className="button" style={{height: `${size}rem`, width: `${size}rem`}} onClick={onClick}>
            <FontAwesomeIcon icon={icon} size={`${Math.floor(size / 2)}x`}/>
        </button>
    )
}

export default RoundButton;
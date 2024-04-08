import "./DefaultHeader.css"
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {DefaultViewStates} from "../DefaultView";

const DefaultHeader = ({title, setState}) => {
    const [dropdownOpen, setDropDownOpen] = useState(false);
    return (
        <div className="default-header">
            <div className="default-header-title">{title}</div>
            <button className="default-dropdown" onClick={() => setDropDownOpen((prevState) => !prevState)}>
                <FontAwesomeIcon icon={faBars} color={"black"} size={"2x"}/>
            </button>
            {dropdownOpen && (
                <div className="default-dropdown-content">
                    <button className="default-dropdown-content-item" onClick={() => {
                        setState(DefaultViewStates.HOME);
                        setDropDownOpen(false)
                    }}>
                        Home
                    </button>
                    <button className="default-dropdown-content-item" onClick={() => {
                        setState(DefaultViewStates.STATS);
                        setDropDownOpen(false)
                    }}>
                        Stats
                    </button>
                </div>
            )}
        </div>
    )
}

export default DefaultHeader;
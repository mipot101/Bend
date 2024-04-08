import "./Footer.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartSimple, faHouse} from "@fortawesome/free-solid-svg-icons";
import {DefaultViewStates} from "../DefaultView";

const Footer = ({state, setState}) => {
    return (
        <div className="footer-container">
            <button className="footer-buttons" onClick={() => setState(DefaultViewStates.HOME)}>
                <FontAwesomeIcon icon={faHouse} size={"2x"}
                                 color={state == DefaultViewStates.HOME ? "black" : "lightgray"}/>
            </button>

            <button className="footer-buttons" onClick={() => setState(DefaultViewStates.STATS)}>
                <FontAwesomeIcon icon={faChartSimple} size={"2x"}
                                 color={state == DefaultViewStates.STATS ? "black" : "lightgray"}/>
            </button>
        </div>
    )
}

export default Footer;
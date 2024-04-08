import RoundButton from "./RoundButton";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import "./Header.css"

const Header = ({title, closeable = true, setAppState, appStateOnClose}) => {
    return (
        <div className="header">
            {
                closeable ?
                    <div className="close-button">
                        <RoundButton icon={faXmark} size={2} color={"black"} onClick={() => {
                            setAppState(appStateOnClose)
                        }}/>
                    </div> : null
            }
            <div className="title">{title}</div>
        </div>
    )
}

export default Header;
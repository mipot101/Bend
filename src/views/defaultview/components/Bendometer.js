import "./Bendometer.css"

const Bendometer = ({progress = 0.7}) => {
    const MIN_DEGREE = 45;
    const MAX_DEGREE = 315;
    const currentDegree = Math.floor(MIN_DEGREE + (MAX_DEGREE - MIN_DEGREE) * progress);

    return (
        <div className="bendometer">
            <div className="half-circle" style={{'--degree': '-45deg'}}/>
            <div className="half-circle" style={{'--degree': '45deg'}}/>
            <div className="full-circle">
                <div className="bendometer-content-title">Bendometer</div>
                <div className="bendometer-content-percentage">64%</div>
                <div className="bendometer-content-next-gain">Nächster Tag: +1%</div>
            </div>
            <div className="bendometer-round-ends" style={{'--degree': '-45deg'}}/>
            <div className="bendometer-round-ends" style={{'--degree': '45deg'}}/>
            <div className="bendometer-moving-circle" style={{'--degree': `${currentDegree}deg`}}/>
        </div>
    );
}

export default Bendometer;

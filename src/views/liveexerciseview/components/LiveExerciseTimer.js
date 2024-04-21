import "./LiveExerciseTimer.css"

const LiveExerciseTimer = ({timeLeft}) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.floor(timeLeft) % 60;
    return (
        <div className="timer">{minutes}:{seconds < 10 ? '0' + seconds : seconds}</div>
    )
}

export default LiveExerciseTimer;
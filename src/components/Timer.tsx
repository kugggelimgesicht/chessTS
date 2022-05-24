/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useRef, useState } from "react";
import { Colors } from "../models/Colors";
import { Player } from "../models/Player";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}
const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);
  useEffect(() => {
    startTimer();
  }, [currentPlayer]);
  useEffect(() => {
    timeIsUp();
  }, [whiteTime, blackTime]);
  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }
  function handleRestart() {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }
  function timeIsUp() {
    if (blackTime === 0) {
      alert("time is up! White wins");
      handleRestart();
    }
    if (whiteTime === 0) {
      alert("time is up! Black wins");
      handleRestart();
    }
  }
  function decrementBlackTimer() {
    setBlackTime((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else return prev;
    });
  }
  function decrementWhiteTimer() {
    setWhiteTime((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else return prev;
    });
  }
  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Black - {blackTime}</h2>
      <h2>White - {whiteTime}</h2>
    </div>
  );
};

export default Timer;

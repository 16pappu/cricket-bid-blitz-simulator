
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  seconds: number;
  onTimeUp: () => void;
  isActive: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ seconds, onTimeUp, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    setTimeLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!isActive) return;

    const timer = timeLeft > 0 && setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (timeLeft === 0) {
      onTimeUp();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, isActive, onTimeUp]);

  // Calculate percentage for progress indicator
  const percentage = ((seconds - timeLeft) / seconds) * 100;

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold mb-2">
        {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-cricket-blue h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-500 mt-1">
        {isActive ? "Bidding ends in" : "Timer paused"}
      </div>
    </div>
  );
};

export default CountdownTimer;

import React, { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

export const Timer = ({
  isShowTimer,
  setEndQuiz,
  onComplete,
  questionSummary,
}) => {
  const { seconds, minutes, hours, days, reset } = useStopwatch({
    autoStart: isShowTimer,
  });

  useEffect(() => {
    if (minutes === 45) {
      setEndQuiz(true);
      onComplete(questionSummary);
    }
  }, [minutes]);

  return (
    <>
      <span>{minutes}</span>:<span>{seconds}</span>{" "}
    </>
  );
};

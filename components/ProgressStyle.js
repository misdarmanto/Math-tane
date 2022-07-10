import React, { useState, useEffect, useContext } from "react";
import * as Progress from "react-native-progress";
import { ContextApi } from "../functions/Context";
import { heightDimensions, widthDimensions } from "../global/Dimensions";
import { MainColor } from "../global/Color";

const ProgressStyle = ({ quiz, counter, setCounter }) => {
  const { pauseTimer } = useContext(ContextApi);

  useEffect(() => {
    if (!pauseTimer) {
      const timer =
        counter > 0 &&
        setInterval(() => setCounter(counter.toPrecision(2) - 0.01), 100);
      if (counter === 0) {
        setCounter(1);
        quiz();
      }
      return () => clearInterval(timer);
    }
  }, [counter, pauseTimer]);
  return (
    <Progress.Bar
      progress={counter}
      width={widthDimensions(65)}
      height={heightDimensions(2.2)}
      color={MainColor}
      borderRadius={10}
    />
  );
};

export default ProgressStyle;

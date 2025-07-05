import React from "react";
import { ProgressProps } from "../../types";

const ProgressBar: React.FC<ProgressProps> = ({ currentValue, maxValue }) => {
  // Calculate the percentage.
  // We handle the edge case where maxValue is 0 to prevent division by zero errors.
  const percentage = maxValue > 0 ? (currentValue / maxValue) * 100 : 0;

  return (
    <div className="progress-bar-bg">
      <div
        className="progress-bar-fg"
        // The width is set dynamically based on the calculated percentage
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

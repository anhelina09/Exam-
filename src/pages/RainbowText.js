import React from 'react';

const RainbowText = ({ text }) => {
  return (
    <span className="animated-text">
      {text.split("").map((char, index) => (
        <span key={index}>{char === " " ? "\u00A0" : char}</span>
      ))}
    </span>
  );
};

export default RainbowText;
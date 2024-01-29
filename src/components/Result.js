import React from 'react';
import Logo from '../images/Logo.png';
import '../App.css';

function Result({ score, onReset}) {
  

  return (
    <div>
      <div className="header">
        <img src={Logo} alt="Logo" />
        <div className="mode">
          <button>Light</button>
        </div>
      </div>

      <div className="result">
        <div className="result-box">
          <h1 id="heading">Result</h1>
          <div id="score">
            <h1>{`${score} out of 5(${((score / 5) * 100)}%)`}</h1>
          </div>
          <button onClick={onReset}>Start Again</button>
        </div>
      </div>
    </div>
  );
}

export default Result;

import React, { useState, useEffect } from 'react';
import questions from '../questions';
import Logo from '../images/Logo.png';
import '../App.css';
import Result from './Result';

function QuestionBox({ isLightMode }) {
  const [currentQuestionIndex, setCurrQuestionIndex] = useState(0);
  const [isHighlighted, setHighlight] = useState(false);
  const [removeHighlight, setRemoveHighlight] = useState(false);
  const [ModeChange, setModeChange] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const [score, setScore] = useState(0);


  const handleOption = (isCorrect) => {
    setCurrQuestionIndex(currentQuestionIndex + 1);

    if (isCorrect === 'true') {
      setHighlight(false);
      setRemoveHighlight(false);
      setScore((prevScore) => prevScore + 1); // Increment the score
    }
  };

  const handleHighlight = () => {
    setHighlight(true);
    setRemoveHighlight(false);
  };

  const handleRemoveHighlight = () => {
    setHighlight(false);
    setRemoveHighlight(true);
  };

  const handleMode = () => {
    setModeChange(true);
  };

  useEffect(() => {
    if (ModeChange) {
      const timeoutId = setTimeout(() => {
        setModeChange(false);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [ModeChange]);

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      setAllQuestionsAnswered(true);
    }
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="section">
      {allQuestionsAnswered ? (
        <Result score={score} onReset={()=>{
          setCurrQuestionIndex(0);
          setAllQuestionsAnswered(false)
          setScore(0);
        }}  /> 
      ) : (
        <>
          <div className="header">
            <img src={Logo} alt="Logo" />
            <div className="mode">
              <button onClick={handleMode}>Mode</button>
            </div>
          </div>

          <div className={`section2 ${isHighlighted ? 'highlighted' : ''} ${isLightMode ? 'light-mode' : 'dark-mode'}`}>
            <div className={`question-box  ${ModeChange ? 'changed' : ''} ${isLightMode ? 'light-color' : 'dark-color'}`}>
              {currentQuestion && (
                <>
                  <h2 id="questions" className={removeHighlight ? '' : isHighlighted ? 'highlighted-text' : ''}>
                    {`${currentQuestionIndex}/5: `}
                    {currentQuestion.text}
                  </h2>
                  <ul className="options">
                    {currentQuestion.options.map((option) => (
                      <li key={option.id} onClick={() => handleOption(option.isCorrect.toString())}>
                        {option.text}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          <div className="section3">
            <button onClick={handleHighlight}>Highlight</button>
            <button onClick={handleRemoveHighlight}>Remove Highlight</button>
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionBox;

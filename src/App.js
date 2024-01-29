import React, { useState } from "react";
import "./App.css";
import QuestionBox from "./components/QuestionBox";
import questions from "./questions";
import Result from "./components/Result";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <div>
      {currentQuestionIndex < questions.length ? (
        <QuestionBox
          currentQuestionIndex={currentQuestionIndex}
          onNextQuestion={handleNextQuestion}
          questions={questions}
          onScoreChange={(newScore) => setScore(newScore)}
        />
      ) : (
        <Result score={score} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;

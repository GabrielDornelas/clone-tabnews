import React, { useState } from "react";

const questions = [
  {
    question: "Qual é a minha cor favorita ?",
    options: ["Azul", "Vermelho", "Cinza", "Amarelo"],
    correctAnswer: "Cinza",
  },
  {
    question: "Qual foi a cidade onde nos conhecemos ?",
    options: ["São Paulo", "São José dos Campos", "Campinas", "Jacareí"],
    correctAnswer: "Jacareí",
  },
  {
    question: "Qual o nome do nosso animal de estimação ?",
    options: ["Mel", "Serena", "Luna", "Bella"],
    correctAnswer: "Serena",
  },
  {
    question: "Qual nossa data de namoro ?",
    options: ["12/06", "24/03", "13/06", "24/12"],
    correctAnswer: "12/06",
  },
  {
    question: "Sabia que eu te amo muitão ?",
    options: ["sim", "sim", "sim", "sim"],
    correctAnswer: "sim",
  },
];

const Challenge = ({ onFinish }) => {
  const [currentChallenge, setCurrentChallenge] = useState(0);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentChallenge].correctAnswer) {
      if (currentChallenge === questions.length - 1) {
        onFinish();
      } else {
        setCurrentChallenge(currentChallenge + 1);
      }
    } else {
      alert("Resposta errada! Tente novamente.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20vh", color: "#fff" }}>
      <h2>{questions[currentChallenge].question}</h2>
      <div style={{ marginTop: "20px" }}>
        {questions[currentChallenge].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px 20px",
              fontSize: "1rem",
              cursor: "pointer",
              backgroundColor: "#f4a261",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Challenge;

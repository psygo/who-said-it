import questions from "./questions.js";

import socket from "./client.js";

export default function setup() {
  let currQuestionIdx = 0;
  let score = 0;

  const question = document.getElementById("question");
  setQuestion(currQuestionIdx);

  const kanye = document.getElementById("kanye");
  kanye.onclick = play;
  const hitler = document.getElementById("hitler");
  hitler.onclick = play;

  const resultsDiv = document.getElementById("results");
  resultsDiv.style.display = "none";

  function setQuestion(idx) {
    question.innerText = `${idx + 1}. ${questions[idx].question}`;
  }

  const scoreH3 = document.getElementById("score");
  function setScore(score) {
    scoreH3.innerText = `${score}/5`;
  }

  function play(e) {
    if (currQuestionIdx < questions.length) {
      if (e.target.id === questions[currQuestionIdx].answer.toLowerCase()) {
        score++;
        setScore(score);
      }

      socket.emit("score-msg", score, socket.id);

      if (currQuestionIdx === questions.length - 1) {
        showResults();
      } else {
        setQuestion(currQuestionIdx + 1);
        currQuestionIdx++;
      }
    }
  }

  const gameDiv = document.getElementById("game");

  function showResults() {
    gameDiv.style.display = "none";
    resultsDiv.style.display = "block";

    const resultH2 = document.getElementById("result");
    resultH2.innerText = `You've got ${score} out of 5 correct!`;
  }

  function hideResults() {
    gameDiv.style.display = "block";
    resultsDiv.style.display = "none";
  }

  const playAgainBtn = document.getElementById("play-again");
  playAgainBtn.onclick = reset;

  function reset() {
    hideResults();

    currQuestionIdx = 0;
    score = 0;

    setQuestion(currQuestionIdx);
    setScore(score);
  }
}

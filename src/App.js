import "./style.css";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

import Dice from "./Dice";

export default function App() {
  const [dice, setDice] = useState(allNewDice());

  const [tenzies, setTenzies] = useState(false);

  const [moves, setMoves] = useState(0);

  const [lastScore, setLastScore] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("lastScore") > 0) {
      setLastScore(localStorage.getItem("lastScore"));
    } else {
      setLastScore(0);
    }
  }, [tenzies]);

  useEffect(() => {
    const allHeld = dice.every((item) => item.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((item) => item.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice(
        (prevDice) =>
          prevDice.map((item) => {
            return item.isHeld ? item : generateNewDice();
          }),
        setMoves((prevMoves) => {
          return prevMoves + 1;
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());

      localStorage.setItem("lastScore", moves);

      setMoves(0);
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  }

  const diceElements = dice.map((item) => (
    <Dice
      key={item.id}
      value={item.value}
      isHeld={item.isHeld}
      holdDice={() => holdDice(item.id)}
    />
  ));

  return (
    <div className="container">
      <main>
        {tenzies && <Confetti />}
        <div className="info">
          <h3>
            Moves: <span>{moves}</span>
          </h3>
          <h3>
            Last Score: <span>{lastScore}</span>
          </h3>
        </div>
        <h1 className="title">Tenzi</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-btn" onClick={rollDice}>
          {tenzies ? "New game" : "Roll"}
        </button>
      </main>
    </div>
  );
}

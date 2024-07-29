import React from "react";
import coin_svg from "../assets/coin.svg";
import dragon_img from "../assets/dragon.webp";
import brilliant_img from "../assets/brilliant.png";
import cola_img from "../assets/cola.webp";
import dark_notcoin_img from "../assets/dark-notcoin.png";
import dark_notcoin2_img from "../assets/dark-notcoin2.png";
import dragon_coin_img from "../assets/dragon-coin.jpeg";
import notcoin_img from "../assets/notcoin.webp";
import { useState, useEffect, useRef } from "react";

export const Game = () => {
  const [score, setScore] = useState(() => {
    const storedScore = localStorage.getItem("score");
    return storedScore ? Number(storedScore) : 0;
  });
  const circleRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("score", score);
  }, [score]);

  const handleCircleClick = (event) => {
    const rect = circleRef.current.getBoundingClientRect();
    const offSetX = event.clientX - rect.left - rect.width / 2;
    const offSetY = event.clientY - rect.top - rect.height / 2;
    const DEG = 40;
    const tiltX = (offSetY / rect.height) * DEG;
    const tiltY = (offSetX / rect.width) * -DEG;

    circleRef.current.style.setProperty("--tiltX", `${tiltX}deg`);
    circleRef.current.style.setProperty("--tiltY", `${tiltY}deg`);

    setTimeout(() => {
      circleRef.current.style.setProperty("--tiltX", `0deg`);
      circleRef.current.style.setProperty("--tiltY", `0deg`);
    }, 300);

    const addOne = document.createElement("div");
    addOne.classList.add("add-one");
    addOne.textContent = "+1";
    addOne.style.left = `${event.clientX - rect.left}px`;
    addOne.style.top = `${event.clientY - rect.top}px`;

    circleRef.current.parentElement.appendChild(addOne);

    setScore(score + 1);

    setTimeout(() => {
      addOne.remove();
    }, 2000);
  };

  useEffect(() => {
    if (score >= 10) {
      circleRef.current.src = `${brilliant_img}`;
    }
    if (score >= 20) {
      circleRef.current.src = `${dragon_coin_img}`;
    }
    if (score >= 30) {
      circleRef.current.src = `${dragon_img}`;
    }
    if (score >= 40) {
      circleRef.current.src = `${dark_notcoin2_img}`;
    }
    if (score >= 50) {
      circleRef.current.src = `${dark_notcoin_img}`;
    }
    if (score >= 60) {
      circleRef.current.src = `${notcoin_img}`;
    }
  }, [score]);

  return (
    <>
      <div className="game">
        <div className="header">
          <img src={coin_svg} draggable="false" alt="coin" />
          <h2 className="score" id="score">
            {score}
          </h2>
        </div>
        <div className="circle" onClick={handleCircleClick}>
          <img
            ref={circleRef}
            id="circle"
            src={cola_img}
            alt="img of coin"
            draggable="false"
          />
        </div>
      </div>
    </>
  );
};

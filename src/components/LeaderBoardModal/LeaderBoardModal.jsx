import { Link } from "react-router-dom";
import styles from "../LeaderBoardModal/LeaderBoard.module.css";
import celebrationImageUrl from "./img/celebration.png";
import React, { useState } from "react";
import { postToDo } from "../../api";
const imgSrc = celebrationImageUrl;

export function LeaderBoardModal({ gameDurationMinutes, gameDurationSeconds, onClick }) {
  const [nameLeader, setNameLeader] = useState(null);
  const gameTime = gameDurationMinutes * 60 + gameDurationSeconds;
  const addToLeaders = () => {
    postToDo({ name: nameLeader, time: gameTime });
  };
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <img src={imgSrc} alt="img" />
        <h2 className={styles.title}>Вы попали на Лидерборд!</h2>
        <input
          className={styles.input}
          type="text"
          name=""
          id=""
          placeholder="Пользователь"
          value={nameLeader}
          onChange={e => setNameLeader(e.target.value)}
        />
        <button className={styles.sendTo} onClick={addToLeaders}>
          Отправить данные
        </button>

        <p className={styles.text}>Затраченное время:</p>
        <div className={styles.time}>
          {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
        </div>
        <button className={styles.sendTo} onClick={onClick}>
          Играть снова
        </button>
        <Link to="/leaderboard" className={styles.leaderLink}>
          Перейти к лидерборду
        </Link>
      </div>
    </div>
  );
}

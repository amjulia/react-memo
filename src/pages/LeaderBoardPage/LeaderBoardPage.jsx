import styles from "../LeaderBoardPage/LeaderBoard.module.css";
import celebrationImageUrl from "./img/celebration.png";
import React from "react";
const imgSrc = celebrationImageUrl;

export function LeaderBoardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <img src={imgSrc} alt="img" />
        <h2 className={styles.title}>Вы попали на Лидерборд!</h2>
        <input className={styles.input} type="text" name="" id="" placeholder="Пользователь" />
        <button className={styles.sendTo}>Отправить данные</button>
        <p className={styles.text}>Затраченное время:</p>
        <div className={styles.time}>
          1.25
          {/* {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")} */}
        </div>
        <button className={styles.sendTo}>Играть снова</button>
        <a href="#" className={styles.leaderLink}>
          Перейти к лидерборду
        </a>
      </div>
    </div>
  );
}

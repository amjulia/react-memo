import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { LeaderBoardModal } from "../LeaderBoardModal/LeaderBoardModal";
import { useEffect, useState } from "react";
import { getToDos } from "../../api";

export function EndGameModal({ isWon, gameDurationSeconds, gameDurationMinutes, onClick, isLeader }) {
  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";
  const [newLeader, setNewLeader] = useState(false);
  const gameTime = gameDurationMinutes * 60 + gameDurationSeconds;
  useEffect(() => {
    getToDos().then(data => {
      const leaders = data.leaders.sort((a, b) => a.time - b.time);
      if (leaders.length < 10 || gameTime < leaders[9].time) {
        setNewLeader(true);
      }
    });
  }, []);

  return (
    <>
      {isLeader && newLeader ? (
        <LeaderBoardModal
          gameDurationSeconds={gameDurationSeconds}
          gameDurationMinutes={gameDurationMinutes}
          onClick={onClick}
        />
      ) : (
        <div className={styles.modal}>
          <img className={styles.image} src={imgSrc} alt={imgAlt} />
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>Затраченное время:</p>
          <div className={styles.time}>
            {gameDurationMinutes.toString().padStart("2", "0")}.{gameDurationSeconds.toString().padStart("2", "0")}
          </div>

          <Button onClick={onClick}>Начать сначала</Button>
        </div>
      )}
    </>
  );
}

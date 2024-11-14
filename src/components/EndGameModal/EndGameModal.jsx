import styles from "./EndGameModal.module.css";
import { Button } from "../Button/Button";
import deadImageUrl from "./images/dead.png";
import celebrationImageUrl from "./images/celebration.png";
import { LeaderBoardModal } from "../LeaderBoardModal/LeaderBoardModal";

export function EndGameModal({
  isWon,
  gameDurationSeconds,
  gameDurationMinutes,
  onClick,
  isLeader,
  useVision,
  useAlohomora,
}) {
  const title = isWon ? "Вы победили!" : "Вы проиграли!";

  const imgSrc = isWon ? celebrationImageUrl : deadImageUrl;

  const imgAlt = isWon ? "celebration emodji" : "dead emodji";

  return (
    <>
      {isLeader ? (
        <LeaderBoardModal
          gameDurationSeconds={gameDurationSeconds}
          gameDurationMinutes={gameDurationMinutes}
          onClick={onClick}
          useVision={useVision}
          useAlohomora={useAlohomora}
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

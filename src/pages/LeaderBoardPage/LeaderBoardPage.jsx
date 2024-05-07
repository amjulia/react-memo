import { Link } from "react-router-dom";
import styles from "../LeaderBoardPage/LeaderBoardPage.module.css";
import { Button } from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { getToDos } from "../../api";

export function LeaderBoardPage() {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    getToDos()
      .then(data => {
        const leaders = data.leaders;
        setLeaders(leaders.sort((a, b) => a.time - b.time));
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);
  function secondsToTimeString(seconds) {
    return (
      Math.floor(Math.round(seconds) / 60)
        .toString()
        .padStart(2, "0") +
      ":" +
      (Math.round(seconds) % 60).toString().padStart(2, "0")
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.text}>Лидерборд</p>
        <Link to="/">
          <Button>Начать игру</Button>
        </Link>
      </div>
      <div className={styles.boardContent}>
        <div className={styles.top}>
          <p>Позиция</p>
          <p className={styles.user}>Пользователь</p>
          <p>Время</p>
        </div>
        <div className={styles.leader}>
          {leaders.map(leader => {
            return (
              <div className={styles.top} key={leader.id}>
                <p>{leader.id}</p>
                <p className={styles.user}>{leader.name}</p>
                <p>{secondsToTimeString(leader.time)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

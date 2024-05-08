import { Link } from "react-router-dom";
import styles from "../LeaderBoardPage/LeaderBoardPage.module.css";
import { Button } from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { getToDos } from "../../api";
import ach1 from "./img/ach1.svg";
import ach2 from "./img/ach2.svg";
export function LeaderBoardPage() {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    getToDos()
      .then(data => {
        const leaders = data.leaders;
        setLeaders(leaders.sort((a, b) => a.time - b.time).slice(0, 10));
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
          <p>Достижения</p>
          <p>Время</p>
        </div>
        <div className={styles.leader}>
          {leaders.map(leader => {
            return (
              <div className={styles.top} key={leader.id}>
                <p>{leader.id}</p>
                <p className={styles.user}>{leader.name}</p>
                <div>
                  <img src={ach1} alt={ach1} /> <img src={ach2} alt={ach2} />
                </div>
                <p>{secondsToTimeString(leader.time)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

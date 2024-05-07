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
        setLeaders(data.leaders);
      })
      .catch(error => {
        console.log(error.message);
      });
  }, []);
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
                <p>{leader.time}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

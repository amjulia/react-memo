import { Link } from "react-router-dom";
import styles from "../LeaderBoardPage/LeaderBoardPage.module.css";
import { Button } from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { getToDos } from "../../api";
import hardNo from "./img/hardNo.svg";
import achNo from "./img/achNo.svg";
import achYes from "./img/achYes.svg";
import hardYes from "./img/hardYes.svg";
export function LeaderBoardPage() {
  const [leaders, setLeaders] = useState([]);
  useEffect(() => {
    getToDos()
      .then(data => {
        const newLeaders = data.leaders.map(leader => {
          const hasSuperPoverAchievement = leader.achievements.includes(2);
          const hasHardModeAchievement = leader.achievements.includes(1);
          return { ...leader, hasSuperPoverAchievement, hasHardModeAchievement };
        });
        newLeaders.sort((a, b) => a.time - b.time).slice(0, 10);
        setLeaders(newLeaders.sort((a, b) => a.time - b.time).slice(0, 10));
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
          {leaders.map((leader, index) => {
            return (
              <div className={styles.top} key={leader.id}>
                <p>#{index + 1}</p>
                <p className={styles.user}>{leader.name}</p>
                <div>
                  {leader.hasHardModeAchievement ? (
                    <img src={hardYes} alt={hardYes} />
                  ) : (
                    <img src={hardNo} alt={hardNo} />
                  )}
                  {leader.hasSuperPoverAchievement ? (
                    <img src={achYes} alt={achYes} />
                  ) : (
                    <img src={achNo} alt={achNo} />
                  )}
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

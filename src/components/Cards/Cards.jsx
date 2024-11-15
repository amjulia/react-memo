import { shuffle } from "lodash";
import { useContext, useEffect, useState } from "react";
import { generateDeck } from "../../utils/cards";
import styles from "./Cards.module.css";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { DifficultyLevelContext } from "../../context/DifficultyLevel";
import { Link } from "react-router-dom";

// Игра закончилась
const STATUS_LOST = "STATUS_LOST";
const STATUS_WON = "STATUS_WON";
// Идет игра: карты закрыты, игрок может их открыть
const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";
// Начало игры: игрок видит все карты в течении нескольких секунд
const STATUS_PREVIEW = "STATUS_PREVIEW";
const STATUS_PAUSE = "STATUS_PAUSE";

function getTimerValue(startDate, endDate) {
  if (!startDate && !endDate) {
    return {
      minutes: 0,
      seconds: 0,
    };
  }

  if (endDate === null) {
    endDate = new Date();
  }

  const diffInSecconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
  const minutes = Math.floor(diffInSecconds / 60);
  const seconds = diffInSecconds % 60;
  return {
    minutes,
    seconds,
  };
}

/**
 * Основной компонент игры, внутри него находится вся игровая механика и логика.
 * pairsCount - сколько пар будет в игре
 * previewSeconds - сколько секунд пользователь будет видеть все карты открытыми до начала игры
 */
export function Cards({ pairsCount = 3, previewSeconds = 5 }) {
  const { isEasy } = useContext(DifficultyLevelContext);
  // В cards лежит игровое поле - массив карт и их состояние открыта\закрыта
  const [cards, setCards] = useState([]);
  // Текущий статус игры
  const [status, setStatus] = useState(STATUS_PREVIEW);
  const [lifes, setLifes] = useState(3);
  // Дата начала игры
  const [gameStartDate, setGameStartDate] = useState(null);
  // Дата конца игры
  const [gameEndDate, setGameEndDate] = useState(null);

  // Стейт для таймера, высчитывается в setInteval на основе gameStartDate и gameEndDate
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  });
  const [useVision, setUseVision] = useState(false);
  const [useAlohomora, setUseAlohomora] = useState(false);
  const isOpen = true;
  function finishGame(status = STATUS_LOST) {
    setGameEndDate(new Date());
    setStatus(status);
    setLifes(0);
  }
  function startGame() {
    const startDate = new Date();
    setGameEndDate(null);
    setGameStartDate(startDate);
    setTimer(getTimerValue(startDate, null));
    setStatus(STATUS_IN_PROGRESS);
    setLifes(3);
  }
  function resetGame() {
    setUseVision(false);
    setUseAlohomora(false);
    setGameStartDate(null);
    setGameEndDate(null);
    setTimer(getTimerValue(null, null));
    setStatus(STATUS_PREVIEW);
    setLifes(3);
    setSeconds(previewSeconds);
  }

  /**
   * Обработка основного действия в игре - открытие карты.
   * После открытия карты игра может пепереходит в следующие состояния
   * - "Игрок выиграл", если на поле открыты все карты
   * - "Игрок проиграл", если на поле есть две открытые карты без пары
   * - "Игра продолжается", если не случилось первых двух условий
   */
  const openCard = clickedCard => {
    // Если карта уже открыта, то ничего не делаем
    if (clickedCard.open) {
      return;
    }
    // Игровое поле после открытия кликнутой карты
    const nextCards = cards.map(card => {
      if (card.id !== clickedCard.id) {
        return card;
      }
      return {
        ...card,
        open: true,
      };
    });

    setCards(nextCards);

    const isPlayerWon = nextCards.every(card => card.open);
    // Победа - все карты на поле открыты
    if (isPlayerWon) {
      finishGame(STATUS_WON);
      return;
    }
    // Открытые карты на игровом поле
    const openCards = nextCards.filter(card => card.open);
    // if (openCards.length > 2) {
    //   return;
    // }
    // Ищем открытые карты, у которых нет пары среди других открытых
    const openCardsWithoutPair = openCards.filter(card => {
      const sameCards = openCards.filter(openCard => card.suit === openCard.suit && card.rank === openCard.rank);

      if (sameCards.length < 2) {
        return true;
      }

      return false;
    });
    //легкий режим (3 попытки)
    if (isEasy) {
      if (openCardsWithoutPair.length >= 2) {
        setLifes(lifes - 1);
        setTimeout(() => {
          const nextCardsWithoutPair = nextCards.map(card => {
            if (openCardsWithoutPair.includes(card)) {
              return {
                ...card,
                open: false,
              };
            }
            return card;
          });
          setCards(nextCardsWithoutPair);
          if (lifes - 1 === 0) {
            finishGame(STATUS_LOST);
          }
        }, 1000);
      }
    } else {
      const playerLost = openCardsWithoutPair.length >= 2;
      // "Игрок проиграл", т.к на поле есть две открытые карты без пары
      if (playerLost) {
        finishGame(STATUS_LOST);
        return;
      }
    }

    // ... игра продолжается
  };

  function handleAchievementVisionClick() {
    const currentTime = timer;
    setUseVision(true);
    const userOpenCards = cards.filter(card => card.open);
    const openCardsAll = cards.map(card => ({ ...card, open: true }));
    setCards(openCardsAll);
    setStatus(STATUS_PAUSE);

    setTimeout(() => {
      const closedUserCards = cards.map(card => {
        if (userOpenCards.some(openCard => openCard.id === card.id)) {
          // карты, открытые игроком, остаются открытыми
          return {
            ...card,
            open: true,
          };
        }
        // остальные карты закрываются
        return {
          ...card,
          open: false,
        };
      });
      setCards(closedUserCards);
      setTimer(currentTime);
      setStatus(STATUS_IN_PROGRESS);
    }, 5000); // показываем карты на 5 секунд
  }

  function handleAchievementAlohomoraClick() {
    setUseAlohomora(true);
    const notOpenedCards = cards.filter(card => !card.open);
    const randomCard = notOpenedCards[Math.floor(Math.random() * notOpenedCards.length)];
    const randomPair = notOpenedCards.filter(
      sameCard => randomCard.suit === sameCard.suit && randomCard.rank === sameCard.rank,
    );
    randomPair[0].open = true;
    randomPair[1].open = true;
    setUseAlohomora(true);
  }

  const isGameEnded = status === STATUS_LOST || status === STATUS_WON;
  const isLeader = status === STATUS_WON;
  // Игровой цикл
  useEffect(() => {
    // В статусах кроме превью доп логики не требуется
    if (status !== STATUS_PREVIEW) {
      return;
    }

    // В статусе превью мы
    if (pairsCount > 36) {
      alert("Столько пар сделать невозможно");
      return;
    }

    setCards(() => {
      return shuffle(generateDeck(pairsCount, 10));
    });

    const timerId = setTimeout(() => {
      startGame();
    }, previewSeconds * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [status, pairsCount, previewSeconds]);

  // Обновляем значение таймера в интервале
  useEffect(() => {
    if (status !== STATUS_PAUSE) {
      if (status === STATUS_LOST) return;
      if (status === STATUS_WON) return;
      const intervalId = setInterval(() => {
        setTimer(
          timer.seconds === 59
            ? t => ({
                seconds: t.seconds - 59,
                minutes: t.minutes + 1,
              })
            : t => ({
                ...t,
                seconds: t.seconds + 1,
              }),
        );
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [gameStartDate, gameEndDate, setTimer, status, timer]);

  const [seconds, setSeconds] = useState(previewSeconds);

  useEffect(() => {
    // Установка таймера
    const timer = setInterval(() => {
      setSeconds(setSeconds => setSeconds - 1); // Обновление состояния каждую секунду
    }, 1000);

    // Функция очистки, которая будет вызвана при размонтировании компонента
    return () => clearInterval(timer);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.timer}>
          {status === STATUS_PREVIEW ? (
            <div>
              <p className={styles.previewText}>Запоминайте пары!</p>
              <p className={styles.previewDescription}>Игра начнется через {seconds} секунд</p>
            </div>
          ) : (
            <>
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>min</div>
                <div>{timer.minutes.toString().padStart("2", "0")}</div>
              </div>
              .
              <div className={styles.timerValue}>
                <div className={styles.timerDescription}>sec</div>
                <div>{timer.seconds.toString().padStart("2", "0")}</div>
              </div>
            </>
          )}
        </div>
        {status === STATUS_IN_PROGRESS || status === STATUS_PAUSE ? (
          <>
            <div className={styles.imgBox}>
              <div className={styles.vision_block}>
                <button className={styles.vision} onClick={handleAchievementVisionClick} disabled={useVision}></button>
                <div className={styles.popup}>
                  <span className={styles.popup_heading}>Прозрение</span>
                  <span className={styles.popup_info}>
                    На 5 секунд показываются все карты. Таймер длительности игры на это время останавливается.
                  </span>
                </div>
              </div>
              <div className={styles.alohomora_block}>
                <button
                  className={styles.alohomora}
                  onClick={handleAchievementAlohomoraClick}
                  disabled={useAlohomora}
                ></button>
                <div className={styles.popup}>
                  <span className={styles.popup_heading}>Алохомора</span>
                  <span className={styles.popup_info}>Открывается случайная пара карт.</span>
                </div>
              </div>
            </div>
            {isEasy && <div className={styles.lifesCount}>Попыток: {lifes}</div>}
            <Button onClick={resetGame}>Начать заново</Button>
          </>
        ) : null}
      </div>
      <div className={styles.cards}>
        {cards.map(card => (
          <Card
            key={card.id}
            isOpen={isOpen}
            onClick={() => openCard(card)}
            open={status !== STATUS_IN_PROGRESS ? true : card.open}
            suit={card.suit}
            rank={card.rank}
          />
        ))}
      </div>
      {isGameEnded ? (
        <div className={styles.modalContainer}>
          <EndGameModal
            isLeader={isLeader}
            useVision={useVision}
            useAlohomora={useAlohomora}
            isWon={status === STATUS_WON}
            gameDurationSeconds={timer.seconds}
            gameDurationMinutes={timer.minutes}
            onClick={resetGame}
          />
        </div>
      ) : null}
      <Link className={styles.linkMain} to="/">
        Выбрать уровень
      </Link>
    </div>
  );
}

import { Link } from "react-router-dom";
import styles from "./SelectLevelPage.module.css";
import { Button } from "../../components/Button/Button";

export function SelectLevelPage() {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1 className={styles.title}>Выбери сложность</h1>
        <ul className={styles.levels}>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/3">
              1
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/6">
              2
            </Link>
          </li>
          <li className={styles.level}>
            <Link className={styles.levelLink} to="/game/9">
              3
            </Link>
          </li>
        </ul>
        <label className={styles.customCheckbox}>
          <input type="checkbox" className={styles.hiddenCheckbox} />
          <div className={styles.checkbox}>
            <svg
              className={styles.checkMark}
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2732 12.0123C10.2732 12.0123 18.4621 0.226727 18.6066 0L21.9999 2.23958L12.3598 16.3008C12.2153 16.5276 12.0283 16.7232 11.8095 16.8765C11.5906 17.0297 11.3442 17.1376 11.0844 17.1939C10.8245 17.2502 10.5563 17.2539 10.2951 17.2047C10.0338 17.1555 9.78469 17.0544 9.56187 16.9071C9.46546 16.8433 9.25713 16.6609 9.25713 16.6609L0 7.73959L2.74606 4.71805L10.2732 12.0123Z"
                fill="#7AC100"
              />
            </svg>
          </div>
          Легкий режим (3 жизни)
        </label>
        <Button>Играть</Button>
      </div>
    </div>
  );
}

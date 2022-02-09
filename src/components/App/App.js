import Settings from "../Settings/Settings";
import Book from "../Book/Book";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles["root"]}>
      <div className={styles["header"]}>
        <h1>ORDER BOOK</h1>
        <Settings />
      </div>
      <Book />
    </div>
  );
}

export default App;

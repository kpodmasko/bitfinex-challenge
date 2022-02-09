import Precision from "../Precision/Precision";
import Book from "../Book/Book";
import styles from "./App.module.css";
import store from "../../store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className={styles["root"]}>
        <div className={styles["header"]}>
          <h1>ORDER BOOK</h1>
          <Precision />
        </div>
        <Book />
      </div>
    </Provider>
  );
}

export default App;

import styles from "./Precision.module.css";
import {
  decreasePrecision,
  increasePrecision,
} from "../../store/slices/precisionSlice";
import { useSelector, useDispatch } from "react-redux";

function Precision() {
  const dispatch = useDispatch();
  const { canIncrease, canDecrease } = useSelector((state) => state.precision);

  return (
    <div className={styles["root"]}>
      <button
        title="decrease precision"
        disabled={!canDecrease}
        onClick={() => dispatch(decreasePrecision())}
      >
        {"<-"}
      </button>
      <button
        title="increase precision"
        disabled={!canIncrease}
        onClick={() => dispatch(increasePrecision())}
      >
        ->
      </button>
    </div>
  );
}

export default Precision;

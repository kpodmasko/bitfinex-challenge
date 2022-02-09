import PropTypes from "prop-types";
import styles from "./Settings.module.css";

function Settings(props) {
  const { onDecrease, onIncrease, isDecreaseDisabled, isIncreaseDisabled } =
    props;

  return (
    <div className={styles["root"]}>
      <button
        title="decrease precision"
        disabled={isDecreaseDisabled}
        onClick={onDecrease}
      >
        {"<-"}
      </button>
      <button
        title="increase precision"
        disabled={isIncreaseDisabled}
        onClick={onIncrease}
      >
        ->
      </button>
    </div>
  );
}

Settings.propTypes = {
  onDecrease: PropTypes.func,
  onIncrease: PropTypes.func,
  isIncreaseDisabled: PropTypes.bool,
  isDecreaseDisabled: PropTypes.bool,
};

Settings.defaultProps = {
  isDecreaseDisabled: false,
  isIncreaseDisabled: false,
};

export default Settings;

import styles from "./Book.module.css";
import BookColumn from "./BookColumn";

// TODO: correct naming

const firstBookColumnHeadColumns = [
  {
    label: "COUNT",
  },
  {
    label: "AMOUNT",
  },
  {
    label: "TOTAL",
  },
  {
    label: "PRICE",
  },
];

const secondBookColumnHeadColumns = [...firstBookColumnHeadColumns].reverse();

const rows = [[8744.9, 2, 1, 0.45603413]];
const secondRows = rows.map((row) => [...row].reverse());

function Book() {
  return (
    <div className={styles["root"]}>
      <BookColumn headColumns={firstBookColumnHeadColumns} rows={rows} />
      <BookColumn headColumns={secondBookColumnHeadColumns} rows={secondRows} />
    </div>
  );
}

export default Book;

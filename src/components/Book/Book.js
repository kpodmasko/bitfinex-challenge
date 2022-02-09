import styles from "./Book.module.css";
import BookColumn from "./BookColumn";
import { useBookQuery } from "../../store/api/bookApi";
import { useSelector } from "react-redux";

// TODO: correct naming

const bidsHeadColumns = [
  {
    label: "COUNT",
  },
  {
    label: "AMOUNT",
    fixed: 4,
  },
  {
    label: "TOTAL",
    fixed: 4,
  },
  {
    label: "PRICE",
  },
];

const asksHeadColumns = [...bidsHeadColumns].reverse();

// TODO: change to node_env
const symbol = "tBTCUSD";

function Book() {
  const { value: precision } = useSelector((state) => state.precision);
  const { data: book } = useBookQuery(
    { precision, symbol },
    { refetchOnMountOrArgChange: true }
  );
  const [bids, asks] = book || [];

  return (
    <div className={styles["root"]}>
      <BookColumn headColumns={bidsHeadColumns} rows={bids} />
      <BookColumn headColumns={asksHeadColumns} rows={asks} />
    </div>
  );
}

export default Book;

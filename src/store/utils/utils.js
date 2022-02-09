import { BOOK_ROWS_LIMIT } from "../constants/constants";

function checkUnnormalizedIsBids(item) {
  return item[2] >= 0;
}

function normalizeToBids(item) {
  return [item[1], item[2], 0, item[0]]; // count, amount, total, price
}

function normalizeToAsks(item) {
  return normalizeToBids(item).reverse();
}

function setTotalToAsks(item, total) {
  const newItem = [...item];

  newItem[1] = total;

  return newItem;
}

function setTotalToBids(item, total) {
  const newItem = [...item];

  newItem[2] = total;

  return newItem;
}

function getPriceFromAsks(item) {
  return item[0];
}

function getPriceFromBids(item) {
  return item[3];
}

function getAmountFromAsks(item) {
  return item[2];
}

function getAmountFromBids(item) {
  return item[1];
}

function sortAsksByPrice(a, b) {
  return getPriceFromAsks(a) - getPriceFromAsks(b);
}

function sortBidsByPrice(a, b) {
  return getPriceFromBids(a) - getPriceFromBids(b);
}

function calcTotal(items, getAmount) {
  return items.reduce((total, current) => total + getAmount(current), 0);
}

function normalizeData(data) {
  const book = data.reduce(
    (book, current) => {
      const isBids = checkUnnormalizedIsBids(current);
      const normalize = isBids ? normalizeToBids : normalizeToAsks;

      book[isBids ? 0 : 1].push(normalize(current));

      return book;
    },
    [[], []]
  );

  book[0] = book[0].sort(sortBidsByPrice);
  book[1] = book[1].sort(sortAsksByPrice);

  const slicedBook = book.map((bookItem) => bookItem.slice(0, BOOK_ROWS_LIMIT));

  slicedBook[0] = slicedBook[0].map((item, index, items) => [
    item[0],
    item[1],
    calcTotal(items.slice(0, index + 1), getAmountFromBids),
    item[3],
  ]);

  slicedBook[1] = slicedBook[1].map((item, index, items) => [
    item[0],
    calcTotal(items.slice(0, index + 1), getAmountFromAsks),
    item[2],
    item[3],
  ]);

  return slicedBook;
}

function updateData(outdated, update) {
  if (!outdated || !update) {
    return outdated;
  }

  const isBids = checkUnnormalizedIsBids(update);
  const normalize = isBids ? normalizeToBids : normalizeToAsks;

  let updatedBookItem = [...outdated[isBids ? 0 : 1]];
  const normalizedItem = normalize(update);
  const itemWithSamePriceIndex = updatedBookItem.find(
    (item) => item[2] === normalizedItem[2]
  );

  if (typeof itemWithSamePriceIndex === "number") {
    updatedBookItem[itemWithSamePriceIndex] = update;
  } else {
    updatedBookItem.push(normalize(update));
    updatedBookItem = updatedBookItem.sort(
      isBids ? sortBidsByPrice : sortAsksByPrice
    );
  }

  const setTotal = isBids ? setTotalToBids : setTotalToAsks;
  updatedBookItem = updatedBookItem.map((item, index, items) => {
    return setTotal(
      item,
      calcTotal(
        items.slice(0, index + 1),
        isBids ? getAmountFromBids : getPriceFromAsks
      )
    );
  });

  const updateBook = [];
  updateBook.push(isBids ? updatedBookItem : outdated[0]);
  updateBook.push(!isBids ? updatedBookItem : outdated[1]);

  return updateBook.map((bookItem) => bookItem.slice(0, BOOK_ROWS_LIMIT));
}

export { normalizeData, updateData };

import PropTypes from "prop-types";
import { memo, useMemo } from "react";

function BookColumn(props) {
  const { headColumns, rows } = props;

  const renderedHeadColumns = useMemo(() => {
    return headColumns.map((headColumn, index, arr) => (
      <th
        key={headColumn.label + index}
        style={{ width: `${100 / arr.length}px` }}
      >
        {headColumn.label}
      </th>
    ));
  }, [headColumns]);

  const renderedRows = useMemo(() => {
    return rows.map((row, rowIndex) => (
      <tr key={`${row.join("_")}__${rowIndex}}`}>
        {row.map((cell, cellIndex) => (
          <td key={`${cell}__${cellIndex}`}>{cell}</td>
        ))}
      </tr>
    ));
  }, [rows]);

  return (
    <table>
      <thead>
        <tr>{renderedHeadColumns}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}

BookColumn.propTypes = {
  headColumns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ),
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};

export default memo(BookColumn);

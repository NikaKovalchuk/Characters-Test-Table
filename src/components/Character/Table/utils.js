export const ASC_SORTING_ORDER = "asc";
export const DESC_SORTING_ORDER = "desc";

const descendingComparator = (a, b, sortColumn) => {
  if (a[sortColumn] === "unknown") return -1;
  if (b[sortColumn] === "unknown") return 1;

  // Value can be string or stringified int. Convert it to original state for
  // better sorting
  const curr = isNaN(+a[sortColumn]) ? a[sortColumn] : parseInt(a[sortColumn]);
  const next = isNaN(+b[sortColumn]) ? b[sortColumn] : parseInt(b[sortColumn]);

  if (next < curr) {
    return -1;
  }
  if (next > curr) {
    return 1;
  }
  return 0;
};

const getComparator = (a, b, sortOrder, sortColumn) => {
  return sortOrder === "desc"
    ? descendingComparator(a, b, sortColumn)
    : -descendingComparator(a, b, sortColumn);
};

export const sortCharacters = (listToSort, sorting) => {
  const { value, column } = sorting;
  const indexedList = listToSort.map((el, index) => [el, index]);
  indexedList.sort((a, b) => {
    const order = getComparator(a[0], b[0], value, column);
    // return order based on requested value if possible
    if (order !== 0) return order;
    // otherwise return order based on index
    return a[1] - b[1];
  });
  return indexedList.map((el) => el[0]);
};

export const searchCharacters = (listToSearch, searching) => {
  const { value, column } = searching;
  if (!value) return listToSearch;
  const filteredCharacters = listToSearch.filter((character) => {
    let searchSubString = value.toLowerCase().split(", ");
    // default is true because for logical AND operation we need all items to be true.
    // otherwise we wouldn't achieve needed logic.
    let includes = true;
    for (let subString of searchSubString) {
      if (subString === "" || subString === " ") {
        continue;
      }
      includes =
        includes &&
        character[column].some((item) =>
          item.toLowerCase().includes(subString)
        );
    }
    return includes;
  });
  return filteredCharacters;
};

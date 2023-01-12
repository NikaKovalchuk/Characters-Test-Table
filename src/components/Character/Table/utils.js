function descendingComparator(a, b, orderBy) {
  if (a[orderBy] === "unknown") return -1;
  if (b[orderBy] === "unknown") return 1;

  const curr = isNaN(+a[orderBy]) ? a[orderBy] : parseInt(a[orderBy]);
  const next = isNaN(+b[orderBy]) ? b[orderBy] : parseInt(b[orderBy]);
  if (next < curr) {
    return -1;
  }
  if (next > curr) {
    return 1;
  }
  return 0;
}

function getComparator(a, b, orderName, orderBy) {
  return orderName === "desc"
    ? descendingComparator(a, b, orderBy)
    : -descendingComparator(a, b, orderBy);
}

export function filmsForUser(user, films = []) {
  return Object.keys(films).length
    ? user.films
        .map((film) => films[film]?.title)
        .map((f) => f)
        .join(", ")
    : [];
}

export function deepSort(listToSort, orderName, orderBy) {
  const indexedList = listToSort.map((el, index) => [el, index]);
  indexedList.sort((a, b) => {
    const order = getComparator(a[0], b[0], orderName, orderBy);
    // return order based on requested value if possible
    if (order !== 0) return order;
    // otherwise return order based on index
    return a[1] - b[1];
  });
  return indexedList.map((el) => el[0]);
}

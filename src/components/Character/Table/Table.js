import { getCharactersWithFilms } from "../../../store/character";
import TableFooter from "../TableFooter";
import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import {
  ASC_SORTING_ORDER,
  DESC_SORTING_ORDER,
  searchCharacters,
  sortCharacters,
} from "./utils";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import * as React from "react";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";

const FIRST_PAGE = 0;
const DEFAULT_PAGE_SIZE = 10;

const CharacterTable = () => {
  const { error } = useSelector((state) => state.characters);

  const characters = useSelector(getCharactersWithFilms);

  const [pagination, setPagination] = useState({
    currentPage: FIRST_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const [sorting, setSorting] = useState({
    value: ASC_SORTING_ORDER,
    column: "",
  });

  const [searching, setSearching] = useState({ value: "", column: "" });

  const handleSorting = (header) => {
    const isAsc =
      sorting.column === header && sorting.value === ASC_SORTING_ORDER;
    setSorting({
      value: isAsc ? DESC_SORTING_ORDER : ASC_SORTING_ORDER,
      column: header,
    });
  };

  const resetPagination = () => {
    setPagination({
      ...pagination,
      currentPage: FIRST_PAGE,
    });
  };

  const handleSearching = (value, column) => {
    setSearching({ value, column: value ? column : "" });
    resetPagination();
  };

  const handleChangePage = (_, page) => {
    setPagination({
      ...pagination,
      currentPage: page,
    });
  };

  const handleRowsPerPageChange = (event) => {
    setPagination({
      currentPage: FIRST_PAGE,
      pageSize: event.target.value,
    });
  };

  const getFilteredUsers = useCallback(() => {
    const sortedCharacterList = sortCharacters(characters, sorting);
    return searchCharacters(sortedCharacterList, searching);
  }, [sorting, searching, characters]);

  // don't memo because search value way too random for good caching
  const filteredUsers = getFilteredUsers();

  const getCurrentPageUsers = useCallback(() => {
    const searchedCharacterList = getFilteredUsers();
    return searchedCharacterList.slice(
      pagination.currentPage * pagination.pageSize,
      (pagination.currentPage + 1) * pagination.pageSize
    );
  }, [sorting, searching, pagination, characters]);

  const currentPageUsers = getCurrentPageUsers();

  return (
    <>
      {error && <p>{`Ooops... Something went wrong. ${error}`}</p>}
      <TableContainer component={Paper}>
        {/* inline style to save some time */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader onSort={handleSorting} onSearch={handleSearching} />
          <TableBody>
            {currentPageUsers.map((row) => (
              <TableRow key={row.name} data={row} />
            ))}
          </TableBody>
          <TableFooter
            count={filteredUsers.length}
            currentPage={pagination.currentPage}
            pageSize={pagination.pageSize}
            handleChangePage={handleChangePage}
            handleRowsPerPageChange={handleRowsPerPageChange}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default CharacterTable;

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import TableHeader from "../TableHeader";
import TableRow from "../TableRow";
import TableFooter from "../TableFooter";
import { deepSort, filmsForUser } from "./utils";

export default function CharactersTable({ characters: propsCharacters }) {
  const { pageSize: originPageSize, error } = useSelector(
    (state) => state.characters
  );
  const { films } = useSelector((state) => state.films);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(originPageSize);

  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [search, setSearch] = useState("");
  const [searchRow, setSearchRow] = useState("");

  //store a list of characters with added movie objects
  const [characters, setCharacters] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPageUsers, setCurrentPageUsers] = useState([]);

  //add movie info to character list
  useEffect(() => {
    const usersWithFilms = propsCharacters.map((user) => {
      const newFilms = filmsForUser(user, films);
      return {
        ...user,
        films: newFilms,
      };
    });
    setCharacters(usersWithFilms);
  }, [films, propsCharacters]);

  const handleSearch = (value, row) => {
    if (value) {
      setSearch(value);
      setSearchRow(row);
    } else {
      setSearch("");
      setSearchRow("");
    }
  };

  const recordsAfterPagingAndSorting = () => {
    const newUsers = deepSort(filteredUsers, order, orderBy).slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    setCurrentPageUsers(newUsers);
  };

  function handleChangePage(e, page) {
    setCurrentPage(page + 1);
  }

  function handleRowsPerPageChange(e) {
    setPageSize(e.target.value);
    setCurrentPage(1);
  }

  useEffect(() => {
    recordsAfterPagingAndSorting();
  }, [filteredUsers, order, orderBy, currentPage, pageSize]);

  useEffect(() => {
    if (search !== "" && searchRow !== "") {
      setFilteredUsers(
        characters.filter((user) => {
          let searchElements = search.toLowerCase().split(",");
          let includes = true;
          for (let element of searchElements) {
            if (element !== "") {
              includes =
                includes && user[searchRow].toLowerCase().includes(element);
            }
          }
          return includes;
        })
      );
      setCurrentPage(1);
    } else {
      setFilteredUsers(characters);
    }
  }, [characters, search, searchRow]);

  const handleSortRequest = (header) => {
    const isAsc = orderBy === header && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(header);
  };

  return (
    <>
      {error && <p>{`Ooops... Something went wrong. ${error}`}</p>}
      <TableContainer component={Paper}>
        {/* inline style to save some time */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeader onClick={handleSortRequest} onSearch={handleSearch} />
          <TableBody>
            {currentPageUsers.map((row) => (
              <TableRow key={row.name} data={row} />
            ))}
          </TableBody>
          <TableFooter
            characters={filteredUsers}
            currentPage={currentPage}
            pageSize={pageSize}
            handleChangePage={handleChangePage}
            handleRowsPerPageChange={handleRowsPerPageChange}
          />
        </Table>
      </TableContainer>
    </>
  );
}

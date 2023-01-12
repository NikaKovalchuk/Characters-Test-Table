import * as React from "react";
import TableCell from "@mui/material/TableCell";
import MUITableRow from "@mui/material/TableRow";

export default function TableRow({ data }) {
  const filmsText = data.films.length ? data.films : "Loading...";

  return (
    <MUITableRow key={data.name}>
      <TableCell align="left" component="th" scope="row">
        {data.name}
      </TableCell>
      <TableCell align="left">{data.height}</TableCell>
      <TableCell align="left">{filmsText}</TableCell>
    </MUITableRow>
  );
}

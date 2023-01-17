import TableCell from "@mui/material/TableCell";
import MUITableRow from "@mui/material/TableRow";
import * as React from "react";

const TableRow = ({ data }) => {
  const filmsText = data.films.length ? data.films.join(", ") : "Loading...";

  return (
    <MUITableRow key={data.name}>
      <TableCell align="left" component="th" scope="row">
        {data.name}
      </TableCell>
      <TableCell align="left">{data.height}</TableCell>
      <TableCell align="left">{filmsText}</TableCell>
    </MUITableRow>
  );
};

//App rerenders row pretty often (page, filter change). Need to memo them.
export default React.memo(TableRow);

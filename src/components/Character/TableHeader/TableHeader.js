import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const HEADERS = [
  {
    name: "Name",
    value: "name",
    sorting: true,
    searching: false,
    maxWidth: 150,
  },
  {
    name: "Height",
    value: "height",
    sorting: true,
    searching: false,
    maxWidth: 150,
  },
  {
    name: "Movies",
    value: "films",
    sorting: false,
    searching: true,
    placeholder: "Input filter string here...",
  },
];

export default function TableHeader({ headers = HEADERS, onClick, onSearch }) {
  return (
    <TableHead>
      <TableRow>
        {/* inline style to save some time */}
        {headers.map((header) => (
          <TableCell
            key={header.value}
            sx={{ minWidth: 150, maxWidth: header.maxWidth }}
          >
            <>
              {header.name}
              {header.sorting && (
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => onClick(header.value)}
                >
                  sort
                </button>
              )}
              {header.searching && (
                <input
                  placeholder={header.placeholder}
                  style={{ marginLeft: "10px" }}
                  onChange={(e) => onSearch(e.target.value, header.value)}
                />
              )}
            </>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

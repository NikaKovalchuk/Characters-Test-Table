import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

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
    name: "Films",
    value: "films",
    sorting: false,
    searching: true,
    placeholder: "Input filter string here...",
  },
];

const TableHeader = ({ onSort, onSearch }) => {
  return (
    <TableHead>
      <TableRow>
        {/* inline style to save some time */}
        {HEADERS.map((header) => (
          <TableCell
            key={header.value}
            sx={{ minWidth: 150, maxWidth: header.maxWidth }}
          >
            <>
              {header.name}
              {header.sorting && (
                <button
                  onClick={() => onSort(header.value)}
                  style={{ marginLeft: "10px" }}
                >
                  sort
                </button>
              )}
              {header.searching && (
                <input
                  onChange={(event) =>
                    onSearch(event.target.value, header.value)
                  }
                  placeholder={header.placeholder}
                  style={{ marginLeft: "10px" }}
                />
              )}
            </>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default React.memo(TableHeader);

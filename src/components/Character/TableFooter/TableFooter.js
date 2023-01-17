import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MUITableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import * as React from "react";

const TablePaginationActions = (props) => {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    //inline style to save some time
    <Box ml={2.5} sx={{ flexShrink: 0 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
};

const TableFooter = ({
  count,
  pageSize,
  currentPage,
  handleChangePage,
  handleRowsPerPageChange,
}) => {
  return (
    <MUITableFooter>
      <TableRow>
        <TablePagination
          colSpan={3}
          count={count}
          rowsPerPage={pageSize}
          page={currentPage}
          onPageChange={handleChangePage}
          ActionsComponent={TablePaginationActions}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableRow>
    </MUITableFooter>
  );
};

export default React.memo(TableFooter);

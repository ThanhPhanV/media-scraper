import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pagination } from "@mui/material";
import Tooltip from "../tooltip";

export interface BasicTableData {
  titles: string[];
  rows: any[][];
}

export interface TableProps {
  data: BasicTableData;
  totalPage: number;
  page: number;
  totalCount?: number;
  handleChangePage?: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function BasicTable({
  data: { titles, rows },
  page,
  totalPage,
  handleChangePage,
}: TableProps) {
  return (
    <div className="mt-3">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {titles.map((title, index: number) =>
                index <= 0 ? (
                  <></>
                ) : (
                  <TableCell key={title}>
                    <span className="font-bold ">{title}</span>
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row[0]}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {row.map((cell, index: number) => {
                  if (index === 0) {
                    return <></>;
                  }
                  return (
                    <TableCell key={cell} size="medium" width={200}>
                      <Tooltip text={cell}>
                        <span className="truncate">{cell?.slice(0, 80)}</span>
                      </Tooltip>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-3 text-right flex justify-end">
        <Pagination
          color="primary"
          count={totalPage}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
}

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import React from 'react';

function GenericTable({ rows, columns }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              <TableCell>{column}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            <TableRow>
              <TableCell>{row}</TableCell>
            </TableRow>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GenericTable;

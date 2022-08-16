import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import React from 'react';

function GenericTable({ rows, columns }) {
  return (
    <TableContainer className='w-full'>
      <Table className='max-w-3xl m-auto'>
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((column) => {
              return <TableCell align='left'>{column}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GenericTable;

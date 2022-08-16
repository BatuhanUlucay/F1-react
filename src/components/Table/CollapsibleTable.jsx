import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function CollapsibleTable({ rows, columns, open }) {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box>
        <Table>
          <TableHead></TableHead>
          {/* <TableRow>
            {columns.map((column) => {
              return <TableCell key={column}></TableCell>;
            })}
          </TableRow> */}
          <TableBody>
            {rows}
          </TableBody>
        </Table>
      </Box>
    </Collapse>
  );
}

export default CollapsibleTable;

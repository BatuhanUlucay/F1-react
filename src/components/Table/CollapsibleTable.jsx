import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function CollapsibleTable({ rows, columns }) {
  return (
    <Collapse>
      <Box>
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
              <TableRow>{row}</TableRow>;
            })}
          </TableBody>
        </Table>
      </Box>
    </Collapse>
  );
}

export default CollapsibleTable;

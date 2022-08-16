import React, { useContext } from 'react';
import SeasonContext from '../../context/SeasonContext';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(yearArray, year, theme) {
  return {
    fontWeight:
      yearArray.indexOf(year) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function SeasonFilter() {
  const { year, setYear } = useContext(SeasonContext);
  const theme = useTheme();

  const thisYear = new Date().getFullYear();
  const filterSize = thisYear - 2012;
  const yearArray = Array(filterSize)
    .fill(0)
    .map((e, i) => i + 2012 + '');

  yearArray.push(thisYear);
  yearArray.reverse();

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div>
      <FormControl className="m-1 ml-16 w-60">
        <InputLabel id="demo-multiple-name-label">Season</InputLabel>
        <Select
          id="demo-multiple-name"
          value={year}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {yearArray.map((year) => (
            <MenuItem key={year} value={year} style={getStyles(yearArray, year, theme)}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SeasonFilter;

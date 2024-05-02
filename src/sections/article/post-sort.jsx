import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

PostSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func,
};

export default function PostSort({ options, onSort }) {
  return (
    <TextField select size="large" value={options[0].value} onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}

import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { useDispatch } from 'react-redux';
import { filterChange } from 'redux/filterSlice';

function Filter() {
  const dispatch = useDispatch();

  const setFilterData = useCallback(
    e => {
      const { value } = e.currentTarget;
      dispatch(filterChange(value.toLowerCase()));
    },
    [dispatch]
  );

  return (
    <FormControl
      sx={{
        minWidth: '350px',
        maxWidth: '500px',
        gap: '10px',
        margin: '0 auto',
      }}
    >
      <TextField
        id="outlined-basic"
        label="Filter"
        variant="outlined"
        type="search"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        onChange={setFilterData}
      />
    </FormControl>
  );
}

export default React.memo(Filter);
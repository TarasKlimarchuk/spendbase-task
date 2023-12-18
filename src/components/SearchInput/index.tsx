import { FC, useEffect, useState } from 'react';

import { TextField } from '@mui/material';

interface SearchInputProps {
  onSearch: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ onSearch }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    const t = setTimeout(() => {
      onSearch(name);
    }, 500);

    return () => {
      clearTimeout(t);
    };
  }, [name]);

  return (
    <TextField
      size="small"
      label="Search"
      variant="outlined"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
};

export default SearchInput;

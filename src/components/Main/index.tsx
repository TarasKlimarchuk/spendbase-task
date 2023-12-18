import { useState } from 'react';

import { Alert, Box, CircularProgress } from '@mui/material';

import SearchInput from '../SearchInput';
import FileTree from '../FileTree';
import useFetchInitialTreeData from '../../hooks/useFetchInitialTreeData.ts';

const Main = () => {
  const { initialData, loading, error } = useFetchInitialTreeData();
  const [searchValue, setSearchValue] = useState('');

  return (
    <Box sx={{ padding: 1 }}>
      <SearchInput onSearch={setSearchValue} />
      <Box sx={{ marginTop: 2 }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <FileTree initialData={initialData} searchValue={searchValue} />
        )}
      </Box>
    </Box>
  );
};

export default Main;

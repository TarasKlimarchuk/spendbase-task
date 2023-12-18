import { useEffect, useState } from 'react';

import { TreeElement } from '../types/models/treeElement.ts';

export const useFetchInitialTreeData = () => {
  const [initialData, setInitialData] = useState<TreeElement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        console.log(1, '=======================');
        setLoading(true);
        const response = await fetch('/assets/treeData.json');

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setInitialData(data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    initialData,
    loading,
    error,
  };
};

export default useFetchInitialTreeData;

import { useEffect, useState } from 'react';

import getFileTreeElementChildren from '../utils/getFileTreeElementChildren.ts';
import { ID } from '../types';
import { TreeElement } from '../types/models/treeElement.ts';
import { NodeModel } from '@minoru/react-dnd-treeview';

const useFileTree = (initialData: TreeElement[]) => {
  const [treeData, setTreeData] = useState(initialData);

  useEffect(() => {
    setTreeData(initialData);
  }, [initialData]);

  const handleDrop = (newTreeData: NodeModel<TreeElement['data']>[]) =>
    setTreeData(newTreeData as TreeElement[]);

  const handleDelete = (id: ID) => {
    const children = getFileTreeElementChildren(id, treeData);

    setTreeData((prev) =>
      prev.filter((el) => {
        const isChild = children.some((child) => child.id === el.id);
        return el.id !== id && !isChild;
      })
    );
  };

  return {
    treeData,
    handleDrop,
    handleDelete,
  };
};

export default useFileTree;

import { FC, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';

import {
  getBackendOptions,
  MultiBackend,
  Tree,
  TreeMethods,
} from '@minoru/react-dnd-treeview';

import './index.css';

import useFileTree from '../../hooks/useFileTree.ts';
import useSearchByNameFileTree from '../../hooks/useSearchByNameFileTree.ts';
import FileTreeItem from '../FileTreeItem';
import { ID } from '../../types';
import { TreeElement } from '../../types/models/treeElement.ts';
import TreeItemDragPreview from '../TreeItemDragPreview';
import prepareInitialData from '../../utils/prepareInitialTreeData.ts';

interface FileTreeProps {
  initialData: TreeElement[];
  searchValue: string;
}

const FileTree: FC<FileTreeProps> = ({ initialData, searchValue }) => {
  const { treeData, handleDelete, handleDrop } = useFileTree(
    prepareInitialData(initialData)
  );
  const { filteredData } = useSearchByNameFileTree(treeData, searchValue);

  const treeRef = useRef<TreeMethods>(null);

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    treeRef.current?.openAll();
  }, [searchValue]);

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        ref={treeRef}
        tree={filteredData}
        rootId={0}
        dragPreviewRender={(monitorProps) => (
          <TreeItemDragPreview monitorProps={monitorProps} />
        )}
        onDrop={handleDrop}
        canDrag={(d) => !d?.data?.accessProhibitions.includes('drag')}
        render={(node, { depth, isOpen, onToggle, hasChild }) => (
          <FileTreeItem
            id={node.id as ID}
            text={node.text}
            depth={depth}
            isOpen={isOpen}
            droppable={!!node.droppable}
            hasChildren={hasChild}
            accessProhibitions={node.data?.accessProhibitions || []}
            onToggle={onToggle}
            onDelete={handleDelete}
          />
        )}
        classes={{
          draggingSource: 'draggingSource',
          dropTarget: 'dropTarget',
        }}
      />
    </DndProvider>
  );
};

export default FileTree;

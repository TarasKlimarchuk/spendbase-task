import { FC } from 'react';

import { IconButton, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import styled from '@emotion/styled';

import { ID, AccessProhibitions } from '../../types';
import TypeIcon from '../TypeIcon';

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 32px;
  padding-inline-end: 8px;
`;

const Text = styled.div`
  padding-inline-start: 8px;
`;

const ArrowContainer = styled.div<{ isOpen: boolean }>`
  align-items: center;
  font-size: 0;
  cursor: pointer;
  display: flex;
  height: 24px;
  justify-content: center;
  width: 24px;
  transition: transform linear 0.1s;

  transform: ${(props) => (props.isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
`;

interface FileTreeItemProps {
  id: ID;
  text: string;
  depth: number;
  droppable: boolean;
  hasChildren: boolean;
  isOpen: boolean;
  accessProhibitions: AccessProhibitions[];
  onDelete: (id: ID) => void;
  onToggle: () => void;
}

const FileTreeItem: FC<FileTreeItemProps> = ({
  id,
  text,
  depth,
  isOpen,
  hasChildren,
  droppable,
  accessProhibitions,
  onDelete,
  onToggle,
}) => {
  return (
    <Wrapper style={{ paddingInlineStart: depth * 24 }}>
      <ArrowContainer isOpen={isOpen}>
        {droppable && hasChildren && (
          <div onClick={onToggle}>
            <ArrowRightIcon />
          </div>
        )}
      </ArrowContainer>
      <div>
        <TypeIcon droppable={droppable} />
      </div>
      <Text>
        <Typography variant="body2">{text}</Typography>
      </Text>
      {!accessProhibitions.includes('delete') && (
        <IconButton
          size={'small'}
          aria-label="delete"
          onClick={() => onDelete(id)}
        >
          <DeleteOutlineIcon />
        </IconButton>
      )}
    </Wrapper>
  );
};

export default FileTreeItem;

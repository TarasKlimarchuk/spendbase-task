import { FC } from 'react';

import { DragLayerMonitorProps } from '@minoru/react-dnd-treeview';
import styled from '@emotion/styled';

import TypeIcon from '../TypeIcon';
import { TreeElement } from '../../types/models/treeElement.ts';

type CustomDragPreviewProps = {
  monitorProps: DragLayerMonitorProps<TreeElement['data']>;
};

const Wrapper = styled.div`
  align-items: center;
  background-color: #1967d2;
  border-radius: 4px;
  box-shadow:
    0 12px 24px -6px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(0, 0, 0, 0.08);
  color: #fff;
  display: inline-grid;
  font-size: 14px;
  gap: 8px;
  grid-template-columns: auto auto;
  padding: 4px 8px;
  pointer-events: none;
`;

const Icon = styled.div`
  align-items: center;
  display: flex;
  gap: 3px;
`;

const CustomDragPreview: FC<CustomDragPreviewProps> = (props) => {
  const item = props.monitorProps.item;

  return (
    <Wrapper>
      <Icon>
        <TypeIcon droppable={!!item.droppable} />
        {item.text}
      </Icon>
    </Wrapper>
  );
};

export default CustomDragPreview;

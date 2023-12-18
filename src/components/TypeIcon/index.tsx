import { FC } from 'react';

import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';

type TypeIconProps = {
  droppable: boolean;
};

const TypeIcon: FC<TypeIconProps> = ({ droppable }) => {
  return droppable ? <FolderIcon /> : <DescriptionIcon />;
};

export default TypeIcon;

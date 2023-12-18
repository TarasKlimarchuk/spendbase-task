import { TreeElement } from '../types/models/treeElement.ts';
import getFileTreeElementChildren from './getFileTreeElementChildren.ts';

const prepareInitialData = (initialData: TreeElement[]): TreeElement[] => {
  initialData.forEach((el) => {
    if (el.droppable && el.data?.accessProhibitions.length) {
      const children = getFileTreeElementChildren(el.id, initialData);
      children.forEach((child) => {
        const initialDataChild = initialData.find((el) => el.id === child.id);
        if (initialDataChild) {
          initialDataChild.data = el.data;
        }
      });
    }
  });

  return initialData;
};

export default prepareInitialData;
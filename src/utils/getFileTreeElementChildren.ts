import { TreeElement } from '../types/models/treeElement.ts';
import { ID } from '../types';

const getFileTreeElementChildren = (
  id: ID,
  elements: TreeElement[]
): TreeElement[] => {
  return elements
    .filter((el) => el.parent === id)
    .reduce((children, el) => {
      children.push(el);
      if (el.droppable) {
        const nestedChildren = getFileTreeElementChildren(el.id, elements);
        children.push(...nestedChildren);
      }
      return children;
    }, [] as TreeElement[]);
};

export default getFileTreeElementChildren;

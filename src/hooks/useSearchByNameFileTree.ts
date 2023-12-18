import { useMemo } from 'react';

import { TreeElement } from '../types/models/treeElement.ts';

const useSearchByNameFileTree = (
  fileTree: TreeElement[],
  searchValue: string
) => {
  const filteredData = useMemo(() => {
    if (!searchValue) {
      return fileTree;
    }

    const searchText = searchValue.toLowerCase();

    return fileTree
      .filter((f) => {
        if (!f.droppable) {
          const parent = fileTree.find((el) => el.id === f.parent);
          if (parent && parent.text.toLowerCase().includes(searchText)) {
            return true;
          }
        }

        return f.text.toLowerCase().includes(searchText);
      })
      .map((f, _, arr) => {
        if (f.parent !== 0 && !arr.find((el) => el.id === f.parent)) {
          return { ...f, parent: 0 };
        }

        return f;
      });
  }, [searchValue, fileTree]);

  return {
    filteredData,
    searchValue,
  };
};

export default useSearchByNameFileTree;

//import { useMemo } from 'react';
//
// import getFileTreeElementChildren from '../utils/getFileTreeElementChildren.ts';
// import { TreeElement } from '../types/models/treeElement.ts';
//
// const useSearchByNameFileTree = (
//   fileTree: TreeElement[],
//   searchValue: string
// ) => {
//   const filteredData = useMemo(() => {
//     if (!searchValue) {
//       return fileTree;
//     }
//
//     const searchText = searchValue.toLowerCase();
//
//     return fileTree.filter((f) => {
//       if (f.droppable) {
//         return (
//           f.text.toLowerCase().includes(searchText) ||
//           getFileTreeElementChildren(f.id, fileTree).some((el) =>
//             el.text.toLowerCase().includes(searchText)
//           )
//         );
//       } else {
//         const parent = fileTree.find((el) => el.id === f.parent);
//         if (parent && parent.text.toLowerCase().includes(searchText)) {
//           return true;
//         }
//       }
//
//       return f.text.toLowerCase().includes(searchText);
//     });
//   }, [searchValue, fileTree]);
//
//   return {
//     filteredData,
//     searchValue,
//   };
// };
//
// export default useSearchByNameFileTree;

import { describe, it, expect, vi } from 'vitest';
import { act, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Main from './index.tsx';
import useFetchInitialTreeDataHook from '../../hooks/useFetchInitialTreeData';
import { TreeElement } from '../../types/models/treeElement.ts';

const fakeInitialData: TreeElement[] = [
  {
    id: 1,
    parent: 0,
    droppable: true,
    text: 'Folder 1',
    data: {
      accessProhibitions: ['drag'],
    },
  },
  {
    id: 2,
    parent: 1,
    text: 'File 1-1',
  },
  {
    id: 3,
    parent: 1,
    text: 'File 1-2',
  },
  {
    id: 4,
    parent: 0,
    droppable: true,
    text: 'Folder 2',
    data: {
      accessProhibitions: ['delete'],
    },
  },
  {
    id: 5,
    parent: 4,
    droppable: true,
    text: 'Folder 2-1',
  },
  {
    id: 6,
    parent: 5,
    text: 'File 2-1-1',
  },
];
describe('Main', () => {
  vi.mock('../../hooks/useFetchInitialTreeData');

  it('should display searched files and folders', async () => {
    vi.mocked(useFetchInitialTreeDataHook).mockReturnValue({
      initialData: fakeInitialData,
      loading: false,
      error: '',
    });

    const { getByText, getByLabelText, queryByText } = render(<Main />);

    const input = getByLabelText(/search/i);

    act(() => {
      userEvent.type(input, 'Folder 2');
    });

    // should find better solution for delay in vitest
    await new Promise((res) => setTimeout(res, 1000));

    expect(queryByText(/folder 1$/i)).not.toBeInTheDocument();
    expect(getByText(/folder 2$/i)).toBeInTheDocument();
    expect(getByText(/folder 2-1$/i)).toBeInTheDocument();
    expect(getByText(/file 2-1-1$/i)).toBeInTheDocument();
  });
});

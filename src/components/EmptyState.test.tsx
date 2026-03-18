import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('filter="all" のとき「No tasks yet」を表示する', () => {
    render(<EmptyState filter="all" />);
    expect(screen.getByText('No tasks yet')).toBeInTheDocument();
    expect(screen.getByText('Add a task above to get started!')).toBeInTheDocument();
  });

  it('filter="active" のとき「All done!」を表示する', () => {
    render(<EmptyState filter="active" />);
    expect(screen.getByText('All done!')).toBeInTheDocument();
    expect(screen.getByText('You have no active tasks.')).toBeInTheDocument();
  });

  it('filter="completed" のとき「No completed tasks」を表示する', () => {
    render(<EmptyState filter="completed" />);
    expect(screen.getByText('No completed tasks')).toBeInTheDocument();
    expect(screen.getByText('Complete some tasks to see them here.')).toBeInTheDocument();
  });
});

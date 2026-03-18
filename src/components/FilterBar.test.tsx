import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FilterBar } from './FilterBar';

const defaultProps = {
  filter: 'all' as const,
  onFilterChange: vi.fn(),
  activeCount: 3,
  completedCount: 0,
  onClearCompleted: vi.fn(),
};

describe('FilterBar', () => {
  it('All / Active / Completed ボタンを表示する', () => {
    render(<FilterBar {...defaultProps} />);
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('activeCount を「N left」として表示する', () => {
    render(<FilterBar {...defaultProps} activeCount={5} />);
    expect(screen.getByText('5 left')).toBeInTheDocument();
  });

  it('completedCount が 0 のとき「Clear done」を表示しない', () => {
    render(<FilterBar {...defaultProps} completedCount={0} />);
    expect(screen.queryByText('Clear done')).not.toBeInTheDocument();
  });

  it('completedCount が 1 以上のとき「Clear done」を表示する', () => {
    render(<FilterBar {...defaultProps} completedCount={2} />);
    expect(screen.getByText('Clear done')).toBeInTheDocument();
  });

  it('フィルターボタンをクリックすると onFilterChange が呼ばれる', async () => {
    const onFilterChange = vi.fn();
    render(<FilterBar {...defaultProps} onFilterChange={onFilterChange} />);

    await userEvent.click(screen.getByText('Active'));
    expect(onFilterChange).toHaveBeenCalledWith('active');

    await userEvent.click(screen.getByText('Completed'));
    expect(onFilterChange).toHaveBeenCalledWith('completed');

    await userEvent.click(screen.getByText('All'));
    expect(onFilterChange).toHaveBeenCalledWith('all');
  });

  it('「Clear done」をクリックすると onClearCompleted が呼ばれる', async () => {
    const onClearCompleted = vi.fn();
    render(<FilterBar {...defaultProps} completedCount={1} onClearCompleted={onClearCompleted} />);

    await userEvent.click(screen.getByText('Clear done'));
    expect(onClearCompleted).toHaveBeenCalledTimes(1);
  });
});

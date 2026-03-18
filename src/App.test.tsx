import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

describe('App', () => {
  it('ヘッダーを表示する', () => {
    render(<App />);
    expect(screen.getByText('My Tasks')).toBeInTheDocument();
  });

  it('初期状態で EmptyState を表示する', () => {
    render(<App />);
    expect(screen.getByText('No tasks yet')).toBeInTheDocument();
  });

  it('タスクを追加すると TodoItem が表示される', async () => {
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'New task');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('New task')).toBeInTheDocument();
    expect(screen.queryByText('No tasks yet')).not.toBeInTheDocument();
  });

  it('タスクを完了にすると activeCount が減る', async () => {
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'Task A');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('1 left')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Mark as complete' }));
    expect(screen.getByText('0 left')).toBeInTheDocument();
  });

  it('Active フィルターで未完了タスクのみ表示される', async () => {
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'Active task');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'Done task');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    // 「Done task」を完了にする (最新が上に来るので最初のチェックボタンが Done task)
    const toggleButtons = screen.getAllByRole('button', { name: 'Mark as complete' });
    await userEvent.click(toggleButtons[0]);

    await userEvent.click(screen.getByText('Active'));
    expect(screen.getByText('Active task')).toBeInTheDocument();
    expect(screen.queryByText('Done task')).not.toBeInTheDocument();
  });

  it('Completed フィルターで完了済みタスクのみ表示される', async () => {
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'Active task');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'Done task');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    const toggleButtons = screen.getAllByRole('button', { name: 'Mark as complete' });
    await userEvent.click(toggleButtons[0]);

    await userEvent.click(screen.getByText('Completed'));
    expect(screen.getByText('Done task')).toBeInTheDocument();
    expect(screen.queryByText('Active task')).not.toBeInTheDocument();
  });

  it('タスクを削除できる', async () => {
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'Delete me');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Delete me')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Delete task' }));
    expect(screen.queryByText('Delete me')).not.toBeInTheDocument();
  });

  it('「Clear done」で完了済みタスクを一括削除できる', async () => {
    render(<App />);
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'Keep me');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'Remove me');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));

    const toggleButtons = screen.getAllByRole('button', { name: 'Mark as complete' });
    await userEvent.click(toggleButtons[0]);

    await userEvent.click(screen.getByText('Clear done'));
    expect(screen.getByText('Keep me')).toBeInTheDocument();
    expect(screen.queryByText('Remove me')).not.toBeInTheDocument();
  });
});

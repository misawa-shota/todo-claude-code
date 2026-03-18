import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TodoItem } from './TodoItem';
import type { Todo } from '../types';

const baseTodo: Todo = {
  id: 'test-id',
  title: 'Buy milk',
  completed: false,
  priority: 'medium',
  dueDate: null,
  createdAt: '2026-03-18T00:00:00.000Z',
};

describe('TodoItem', () => {
  it('タイトルを表示する', () => {
    render(<TodoItem todo={baseTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });

  it('優先度バッジを表示する', () => {
    render(<TodoItem todo={baseTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('medium')).toBeInTheDocument();
  });

  it('チェックボタンをクリックすると onToggle が id と共に呼ばれる', async () => {
    const onToggle = vi.fn();
    render(<TodoItem todo={baseTodo} onToggle={onToggle} onDelete={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: 'Mark as complete' }));
    expect(onToggle).toHaveBeenCalledWith('test-id');
  });

  it('削除ボタンをクリックすると onDelete が id と共に呼ばれる', async () => {
    const onDelete = vi.fn();
    render(<TodoItem todo={baseTodo} onToggle={vi.fn()} onDelete={onDelete} />);
    await userEvent.click(screen.getByRole('button', { name: 'Delete task' }));
    expect(onDelete).toHaveBeenCalledWith('test-id');
  });

  it('completed=true のとき取り消し線スタイルが適用される', () => {
    render(<TodoItem todo={{ ...baseTodo, completed: true }} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Buy milk')).toHaveClass('line-through');
  });

  it('completed=false のとき取り消し線スタイルが適用されない', () => {
    render(<TodoItem todo={baseTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Buy milk')).not.toHaveClass('line-through');
  });

  it('dueDate がないとき期限日を表示しない', () => {
    render(<TodoItem todo={baseTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.queryByText(/due|overdue/i)).not.toBeInTheDocument();
  });

  it('dueDate が今日のとき「Due today」を表示する', () => {
    const today = new Date().toISOString().split('T')[0];
    render(<TodoItem todo={{ ...baseTodo, dueDate: today }} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Due today')).toBeInTheDocument();
  });

  it('dueDate が過去のとき overdue テキストを表示する', () => {
    render(
      <TodoItem
        todo={{ ...baseTodo, dueDate: '2020-01-01' }}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText(/overdue/i)).toBeInTheDocument();
  });

  it('priority=high のとき "high" バッジを表示する', () => {
    render(<TodoItem todo={{ ...baseTodo, priority: 'high' }} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  it('priority=low のとき "low" バッジを表示する', () => {
    render(<TodoItem todo={{ ...baseTodo, priority: 'low' }} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('low')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { AddTodoForm } from './AddTodoForm';

describe('AddTodoForm', () => {
  it('入力フィールドと Add ボタンを表示する', () => {
    render(<AddTodoForm onAdd={vi.fn()} />);
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('入力が空のとき Add ボタンが disabled になる', () => {
    render(<AddTodoForm onAdd={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
  });

  it('文字を入力すると Add ボタンが有効になる', async () => {
    render(<AddTodoForm onAdd={vi.fn()} />);
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'Buy milk');
    expect(screen.getByRole('button', { name: 'Add' })).toBeEnabled();
  });

  it('フォーム送信で onAdd がタイトル・デフォルト優先度・null の期限日で呼ばれる', async () => {
    const onAdd = vi.fn();
    render(<AddTodoForm onAdd={onAdd} />);
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'Buy milk');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onAdd).toHaveBeenCalledWith('Buy milk', 'medium', null);
  });

  it('送信後にフォームがリセットされる', async () => {
    render(<AddTodoForm onAdd={vi.fn()} />);
    const input = screen.getByPlaceholderText('Add a new task...');
    await userEvent.type(input, 'Buy milk');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(input).toHaveValue('');
  });

  it('空白のみのタイトルでは onAdd が呼ばれない', async () => {
    const onAdd = vi.fn();
    render(<AddTodoForm onAdd={onAdd} />);
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), '   ');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onAdd).not.toHaveBeenCalled();
  });

  it('入力フォーカス時に優先度オプションが展開される', async () => {
    render(<AddTodoForm onAdd={vi.fn()} />);
    expect(screen.queryByText('High')).not.toBeInTheDocument();
    await userEvent.click(screen.getByPlaceholderText('Add a new task...'));
    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  it('優先度を変更して onAdd に渡される', async () => {
    const onAdd = vi.fn();
    render(<AddTodoForm onAdd={onAdd} />);
    await userEvent.click(screen.getByPlaceholderText('Add a new task...'));
    await userEvent.click(screen.getByText('High'));
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'Urgent task');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onAdd).toHaveBeenCalledWith('Urgent task', 'high', null);
  });

  it('期限日を設定して onAdd に渡される', async () => {
    const onAdd = vi.fn();
    render(<AddTodoForm onAdd={onAdd} />);
    await userEvent.click(screen.getByPlaceholderText('Add a new task...'));
    await userEvent.type(screen.getByPlaceholderText('Add a new task...'), 'Task with date');
    const dateInput = screen.getByDisplayValue('');
    await userEvent.type(dateInput, '2026-12-31');
    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(onAdd).toHaveBeenCalledWith('Task with date', 'medium', '2026-12-31');
  });
});

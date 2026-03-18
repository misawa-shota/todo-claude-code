import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Priority } from '../types';

interface Props {
  onAdd: (title: string, priority: Priority, dueDate: string | null) => void;
}

const priorityOptions: { value: Priority; label: string }[] = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export function AddTodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed, priority, dueDate || null);
    setTitle('');
    setDueDate('');
    setPriority('medium');
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-4 mb-6">
      <div className="flex gap-3 items-center">
        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="Add a new task..."
          className="flex-1 text-gray-700 placeholder-gray-400 outline-none text-base"
        />
        <button
          type="submit"
          disabled={!title.trim()}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </div>
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex gap-4 items-center flex-wrap">
          <div className="flex gap-2">
            {priorityOptions.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPriority(opt.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  priority === opt.value
                    ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-400'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="ml-auto text-sm text-gray-600 border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-purple-400"
          />
        </div>
      )}
    </form>
  );
}

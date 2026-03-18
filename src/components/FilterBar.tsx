import type { Filter } from '../types';

interface Props {
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export function FilterBar({ filter, onFilterChange, activeCount, completedCount, onClearCompleted }: Props) {
  const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex bg-white/20 rounded-xl p-1 gap-1">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              filter === f.value
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-white/80 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-white/80 text-sm">{activeCount} left</span>
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-white/60 text-sm hover:text-white transition-colors"
          >
            Clear done
          </button>
        )}
      </div>
    </div>
  );
}

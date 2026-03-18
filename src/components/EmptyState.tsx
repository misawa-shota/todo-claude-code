import type { Filter } from '../types';

interface Props {
  filter: Filter;
}

export function EmptyState({ filter }: Props) {
  const messages = {
    all: { title: 'No tasks yet', subtitle: 'Add a task above to get started!' },
    active: { title: 'All done!', subtitle: 'You have no active tasks.' },
    completed: { title: 'No completed tasks', subtitle: 'Complete some tasks to see them here.' },
  };
  const { title, subtitle } = messages[filter];

  return (
    <div className="flex flex-col items-center justify-center py-16 text-white/60">
      <div className="w-16 h-16 mb-4 rounded-full bg-white/10 flex items-center justify-center">
        <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          {filter === 'all' && <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />}
          {filter === 'active' && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />}
          {filter === 'completed' && <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />}
        </svg>
      </div>
      <h3 className="text-lg font-medium text-white/80 mb-1">{title}</h3>
      <p className="text-sm">{subtitle}</p>
    </div>
  );
}

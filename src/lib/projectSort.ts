import type { projects } from './data';

export type SortKey = 'title' | 'type' | 'status' | 'dates';
export type SortDirection = 'ascending' | 'descending';
export const sortColumns: { key: SortKey; label: string }[] = [
	{ key: 'title', label: 'Projet' },
	{ key: 'type', label: 'Type' },
	{ key: 'status', label: 'Status' },
	{ key: 'dates', label: 'Dates' }
];
const collator = new Intl.Collator('fr', { sensitivity: 'base', numeric: true });

export function sortProjects(items: typeof projects, key: SortKey | null, direction: SortDirection) {
	if (!key) return items;
	return [...items].sort((a, b) => {
		const comparison = key === 'dates'
			? a.start - b.start || a.end - b.end
			: collator.compare(a[key], b[key]);
		return comparison * (direction === 'ascending' ? 1 : -1) || collator.compare(a.title, b.title);
	});
}

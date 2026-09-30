import { error } from '@sveltejs/kit';
import { projects } from '$lib/data';
export function load({ params }: { params: { slug: string } }) {
	const index = projects.findIndex((p) => p.slug === params.slug);
	if (index < 0) error(404, 'Projet introuvable');
	return {
		project: projects[index],
		previous: projects[(index + projects.length - 1) % projects.length].slug,
		next: projects[(index + 1) % projects.length].slug
	};
}

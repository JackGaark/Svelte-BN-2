import { error } from '@sveltejs/kit';
import { projects } from '$lib/data';
import { projectSlides } from '$lib/projectGallery';
export function load({ params, url }: { params: { slug: string }; url: URL }) {
	const index = projects.findIndex((p) => p.slug === params.slug);
	if (index < 0) error(404, 'Projet introuvable');
	const slides = projectSlides(params.slug);
	const requestedSlide = Number(url.searchParams.get('slide') ?? 1);
	return {
		slides,
		initialSlide: Number.isInteger(requestedSlide) && requestedSlide >= 1 && requestedSlide <= slides.length ? requestedSlide - 1 : 0,
		project: projects[index],
		previous: projects[(index + projects.length - 1) % projects.length].slug,
		next: projects[(index + 1) % projects.length].slug
	};
}

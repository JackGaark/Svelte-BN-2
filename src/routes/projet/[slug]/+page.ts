import { error } from '@sveltejs/kit';
import { projects } from '$lib/data';
import { projectSlides } from '$lib/projectGallery';
import type { PageLoad } from './$types';

type Slides = ReturnType<typeof projectSlides>;

function resolveInitialSlide(slides: Slides, params: URLSearchParams): number {
	if (params.has('image')) {
		const imageNumber = Number(params.get('image'));
		const byImage = slides.findIndex(
			(slide) => slide.kind === 'image' && slide.imageNumber === imageNumber
		);
		if (byImage >= 0) return byImage;
	}

	const slideNumber = Number(params.get('slide') ?? 1);
	const isValid = Number.isInteger(slideNumber) && slideNumber >= 1 && slideNumber <= slides.length;
	return isValid ? slideNumber - 1 : 0;
}

export const load: PageLoad = ({ params, url }) => {
	const index = projects.findIndex((p) => p.slug === params.slug);
	if (index < 0) error(404, 'Projet introuvable');

	const slides = projectSlides(params.slug);
	const count = projects.length;

	return {
		slides,
		initialSlide: resolveInitialSlide(slides, url.searchParams),
		project: projects[index],
		previous: projects[(index + count - 1) % count].slug,
		next: projects[(index + 1) % count].slug
	};
};

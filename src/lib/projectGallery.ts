import tiles from './tiles.json';
import { projects } from './data';

// Each project owns one gallery; overview numbering and slides use this same list.
const galleries = projects.map((project, projectIndex) =>
	Array.from({ length: project.imageCount }, (_, imageIndex) =>
		tiles[(projectIndex * 5 + imageIndex) % tiles.length]
	)
);
export type ProjectSlide = { kind: 'image'; src: string; flip: boolean; format: 'inset' | 'portrait' | 'full' } | { kind: 'text' };
export function projectSlides(slug: string) {
	const index = projects.findIndex((project) => project.slug === slug);
	const group = galleries[index] ?? [];
	const formats = ['inset', 'inset', 'portrait', 'full', 'inset'] as const;
	const images: ProjectSlide[] = group.length ? group.map((tile, imageIndex) => ({
		kind: 'image' as const,
		format: formats[imageIndex % formats.length],
		src: `/assets/2973-295-${tile.asset}.png`,
		flip: tile.flip
	})) : [{ kind: 'image', src: projects[index].image, flip: false, format: 'inset' }];
	// Text slides occupy gallery slots, so image + text slides match thumbnail totals.
	return images.map((image, slideIndex) => projects[index].textSlidePositions.includes(slideIndex)
		? { kind: 'text' } as const
		: image);
}

export const overviewTiles = galleries.flatMap((group, projectIndex) => group.map((tile, imageIndex) => ({
		...tile,
		project: projects[projectIndex],
		number: imageIndex + 1,
		total: group.length,
		projectNumber: String(projectIndex + 1).padStart(2, '0')
	})));

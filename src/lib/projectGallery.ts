import tiles from './tiles.json';
import { projects } from './data';

const galleries = projects.map((project, projectIndex) =>
	Array.from({ length: project.imageCount }, (_, imageIndex) =>
		tiles[(projectIndex * 5 + imageIndex) % tiles.length]
	)
);
export type ProjectSlide =
	| { kind: 'image'; src: string; flip: boolean; format: 'inset' | 'portrait' | 'full'; imageNumber: number; imageTotal: number }
	| { kind: 'text' };

export function projectSlides(slug: string): ProjectSlide[] {
	const index = projects.findIndex((project) => project.slug === slug);
	if (index < 0) return [];
	const project = projects[index];
	const group = galleries[index];
	const formats = ['inset', 'inset', 'portrait', 'full', 'inset'] as const;
	const slides: ProjectSlide[] = [];
	let imageIndex = 0;
	for (let position = 0; position < group.length + project.textSlidePositions.length; position++) {
		if (project.textSlidePositions.includes(position)) {
			slides.push({ kind: 'text' });
		} else {
			const tile = group[imageIndex];
			slides.push({ kind: 'image', src: `/assets/2973-295-${tile.asset}.png`, flip: tile.flip,
				format: formats[imageIndex % formats.length], imageNumber: imageIndex + 1, imageTotal: group.length });
			imageIndex++;
		}
	}
	return slides;
}

// SURVOL includes images only, numbered independently of interleaved text slides.
export const overviewTiles = galleries.flatMap((group, projectIndex) => group.map((tile, imageIndex) => ({
	...tile,
	project: projects[projectIndex],
	number: imageIndex + 1,
	total: group.length,
	projectNumber: String(projectIndex + 1).padStart(2, '0')
})));

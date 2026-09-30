export const images = Array.from(
	{ length: 8 },
	(_, i) => `/assets/2973-295-imgOverviewThumbnail${i || ''}.png`
);
export const projects = Array.from({ length: 33 }, (_, i) => ({
	slug: `grande-allee-${i + 1}`,
	title: '475 Grande-Allée, Qc',
	type: 'Résidentiel',
	status: 'Complété',
	start: 2021,
	end: 2025,
	image: i === 0 ? '/assets/2927-2132-img203GrandeAllee1.png' : images[i % 8]
}));
export const intro =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut orci ex, pulvinar sit amet rhoncus non, molestie in nulla.';

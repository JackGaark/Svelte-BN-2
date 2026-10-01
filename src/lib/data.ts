export const images = Array.from(
	{ length: 8 },
	(_, i) => `/assets/2973-295-imgOverviewThumbnail${i || ''}.png`
);
const projectTitles = [
	'475 Grande-Allée, Qc',
	'Café Saint-Laurent',
	'Maison des Érables',
	'Atelier du Canal',
	'Résidence Bellevue',
	'Les Terrasses du Parc',
	'Boutique du Vieux-Port',
	'Maison de la Falaise',
	'Bureaux Montcalm',
	'Chalet du Lac',
	'Duplex Saint-Sauveur',
	'Galerie des Arts',
	'Maison des Pins',
	'Résidence Beauséjour',
	'Restaurant des Quais',
	'Loft du Plateau',
	'Pavillon des Cèdres',
	'Clinique Saint-Jean',
	'Maison du Cap',
	'Les Jardins de Limoilou',
	'Hôtel des Remparts',
	'Chalet des Laurentides',
	'Résidence du Fleuve',
	'Librairie du Quartier',
	'Maison de la Cour',
	'Appartement Laurier',
	'Marché des Halles',
	'Maison des Rochers',
	'Résidence Outremont',
	'Studio Mile End',
	'Chalet de la Vallée',
	'Maison du Verger',
	'Espace Sainte-Catherine'
];

// Fixed sample values keep server rendering and filter testing consistent on refresh.
export const indexPreviewFormats = {
	landscape: { width: 520, height: 390 },
	portrait: { width: 368, height: 520 },
	square: { width: 520, height: 520 }
} as const;
const previewPattern = ['landscape', 'portrait', 'square'] as const;

export const projects = projectTitles.map((title, i) => ({
	slug: `grande-allee-${i + 1}`,
	title,
	previewFormat: previewPattern[i % previewPattern.length],
	type: [1, 3, 6, 8, 11, 14, 17, 20, 23, 26, 29, 32].includes(i)
		? 'Commercial'
		: 'Résidentiel',
	status: [2, 3, 7, 11, 16, 18, 23, 27, 29, 32].includes(i) ? 'En cours' : 'Complété',
	start: i === 0 ? 2021 : 2015 + ((i * 7) % 11),
	end: i === 0 ? 2025 : 2015 + ((i * 7) % 11) + 1 + ((i * 3) % 4),
	image: i === 0 ? '/assets/2927-2132-img203GrandeAllee1.png' : images[i % 8]
}));
export const intro =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut orci ex, pulvinar sit amet rhoncus non, molestie in nulla.';
export const studioAddress = {
	street: '1234 Rue de Machin',
	city: 'Montréal, Qc. H2H 2H2'
};

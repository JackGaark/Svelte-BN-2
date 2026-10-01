import { overviewTiles } from './projectGallery';

const portraitRows = [
	[4, 0, 5, 1, 6, 2],
	[3, 7, 2, 6, 1, 5],
	[5, 1, 6, 2, 4, 0],
	[2, 6, 1, 5, 3, 7],
	[4, 0, 5, 1, 6, 2]
];
const landscapeRows = [
	[4, 0, 5, 1, 6, 2, 0, 5],
	[3, 7, 2, 6, 1, 5, 7, 2],
	[5, 1, 6, 2, 4, 0, 1, 6],
	[2, 6, 1, 5, 3, 7, 6, 1],
	[4, 0, 5, 1, 6, 2, 0, 5]
];
function layout(rows: number[][]) {
	return rows.flatMap((row, rowIndex) => row.map((assetIndex) => {
		const asset = `imgOverviewThumbnail${assetIndex || ''}`;
		const flip = rowIndex % 2 === 1 && ![2, 6].includes(assetIndex);
		const tile = overviewTiles.find((item) => item.asset === asset && item.flip === flip)
			?? overviewTiles.find((item) => item.asset === asset)!;
		return { ...tile, flip };
	}));
}
export const portraitOverview = layout(portraitRows);
export const landscapeOverview = layout(landscapeRows);

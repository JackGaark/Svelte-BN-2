let cachedMarker: Promise<string> | undefined;

// Compare both advance width and rendered pixels: font loading alone cannot prove glyph coverage.
export function textSlideMarker(): Promise<string> {
	return cachedMarker ??= document.fonts.ready.then(() => {
		const canvas = document.createElement('canvas');
		canvas.width = 128;
		canvas.height = 64;
		const context = canvas.getContext('2d');
		if (!context) return 'TEXTE';
		const render = (fallback: string) => {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.font = `400 32px Greed, ${fallback}`;
			context.fillText('\u00B6', 8, 44);
			return { width: context.measureText('\u00B6').width, pixels: context.getImageData(0, 0, canvas.width, canvas.height).data };
		};
		const serif = render('serif');
		const sans = render('sans-serif');
		return serif.width === sans.width && serif.pixels.every((value, index) => value === sans.pixels[index])
			? '\u00B6' : 'TEXTE';
	}).catch(() => 'TEXTE');
}

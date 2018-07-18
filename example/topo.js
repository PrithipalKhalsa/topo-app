var customBoard2 = new DrawingBoard.Board('topo-board', {
	controls: [
		'Color',
		{ Size: { type: 'dropdown' } },
		 'DrawingMode',
		'Navigation',
		'Linetool',
		'Download'
	],
	size: 3,
	webStorage: 'session',
	enlargeYourContainer: true,
	droppable: true, //try dropping an image on the canvas!
	stretchImg: true //the dropped image can be automatically ugly resized to to take the canvas size
});
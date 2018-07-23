
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
	stretchImg: true,
	//listen to an event

});

var myBoard = new DrawingBoard.Board('zbeubeu');

//listen to an event
myBoard.ev.bind('board:reset', why);

//stop listening to it
myBoard.ev.unbind('board:reset', why);

function why() {
    alert('OH GOD WHY');
}

//you can also trigger new events
myBoard.ev.trigger('readme:example', 'what', 'up');

//and listen to them
myBoard.ev.bind('readme:example', function(one, two) {
    console.log(one, two); // 'what', 'up'
});
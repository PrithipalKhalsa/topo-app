DrawingBoard.Control.Linetool = DrawingBoard.Control.extend({

	name: 'linetool',

	defaults: {
		pencil: true,
		eraser: true,
		filler: true
	},
	
	prevCords: {},

	initialize: function() {

		this.prevMode = this.board.getMode();

		this.$el.append('<button class="drawing-board-control-drawingmode-linetool-button" data-mode="linetool"></button>');


		this.$el.on('click', 'button[data-mode]', $.proxy(function(e) {
			var value = $(e.currentTarget).attr('data-mode');
			var mode = this.board.getMode();
			if (mode !== value) this.prevMode = mode;
			var newMode = mode === value ? this.prevMode : value;
			this.board.setMode( newMode );
			e.preventDefault();
		}, this));

		this.board.ev.bind('board:mode', $.proxy(function(mode) {
			this.toggleButtons(mode);
		}, this));

		this.board.ev.bind('board:');

		this.toggleButtons( this.board.getMode() );
	},

	toggleButtons: function(mode) {
		this.$el.find('button[data-mode]').each(function(k, item) {
			var $item = $(item);
			$item.toggleClass('active', mode === $item.attr('data-mode'));
		});
	}

});

var MyTool = function(lc) {  // take lc as constructor arg
  var self = this;

  return {
    usesSimpleAPI: false,  // DO NOT FORGET THIS!!!
    name: 'MyTool',
    iconName: 'line',
    strokeWidth: lc.opts.defaultStrokeWidth,
    optionsStyle: 'stroke-width',

    didBecomeActive: function(lc) {
      var onPointerDown = function(pt) {
        self.currentShape = LC.createShape('Line', {
          x1: pt.x, y1: pt.y, x2: pt.x, y2: pt.y,
         color:lc.getColor('primary')});
        lc.setShapesInProgress([self.currentShape]);
        lc.repaintLayer('main');
      };

      // lc.on() returns a function that unsubscribes us. capture it.
      self.unsubscribeFuncs = [
        lc.on('lc-pointerdown', onPointerDown),
      ];
    },

    willBecomeInactive: function(lc) {
      // call all the unsubscribe functions
      self.unsubscribeFuncs.map(function(f) { f() });
    }
  }
};

LC.init(el, {
  // Add me to the toolbar
  tools: LC.defaultTools.concat([MyTool])
});
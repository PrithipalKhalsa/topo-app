const imageEles = document.querySelectorAll('img.card-img-top');
const versions = document.getElementById('versions');


// creates lc object with snapshot and returns 
const imgUrlFromSnapshot = function(snapshot) {
  let domEle = document.createElement('div');
  domEle.id = 'lc';
  let lc = LC.init(domEle, {
    snapshot: snapshot
  });
  let img = lc.getImage().toDataUrl();
  console.log(img);
  return img;
};

var img, iframe;


fetch('/testSnapshot.json').then(function(res) {
  return res.text();
}).then(function(json) {
  img = imgUrlFromSnapshot(json);
  //imageEles[0]['src'] = img; 
  iframe = '<iframe src="' + img + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
  versions.insertAdjacentHTML('beforeend', iframe);
});

// var img = lc.getImage().toDataURL();
// var iframe = '<iframe src="' + img + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
// var x = window.open();
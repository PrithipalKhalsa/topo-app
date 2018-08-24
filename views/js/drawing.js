function getUrlVars() {
      topoVars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      topoVars[key] = value;
  });
  return topoVars;
}
var urlTopoVars = getUrlVars();

//if urlTopovars
//then render topo array
//else render new topo

// loading a preexisting topo
  var lc = LC.init(document.getElementById("lc"), {
            keyboardShortcuts: false,
            tools: [LC.tools.Pencil, LC.tools.Eraser, LC.tools.Line,
            LC.tools.Text, LC.tools.Pan],
            imageURLPrefix: 'lc-images',
            toolbarPosition: 'bottom',
            defaultStrokeWidth: 1,
            strokeWidths: [1],
            backgroundColor: 'white'
        });
        


 
async function getArrayOfTopos(id) {
  const response = await fetch('topo/' + id);
  const json = await response.json();
  return json.result;
} 

var arrayOfTopos;

getArrayOfTopos(urlTopoVars.id).then(function(results) {
  $('lc').ready(function() {
    console.log(results)
    lc.loadSnapshot(JSON.parse(results[results.length - 1].JSONtopo));
    initNav();
  });
  console.log(results);
  arrayOfTopos=results;
});

var currentTopoView;
  
function initNav(){
  currentTopoView = arrayOfTopos.length-1;
  if (currentTopoView === 0)
    document.getElementById("prevtopo").disabled=document.getElementById("nexttopo").disabled=true;
}
  
function previousTopo(){
 currentTopoView--;
 lc.loadSnapshot(JSON.parse(arrayOfTopos[currentTopoView].JSONtopo));
  if (currentTopoView==0)
    document.getElementById("prevtopo").disabled = true;
  else
    document.getElementById("prevtopo").disabled = false;
  if (currentTopoView==arrayOfTopos.length-1)
    document.getElementById("nexttopo").disabled = true;
  else
    document.getElementById("nexttopo").disabled = false;
}
     
     
function nextTopo(){
  currentTopoView++;
  lc.loadSnapshot(JSON.parse(arrayOfTopos[currentTopoView].JSONtopo));
  if (currentTopoView==arrayOfTopos.length-1)
    document.getElementById("nexttopo").disabled = true;
  else
    document.getElementById("nexttopo").disabled = false;
  if (currentTopoView==0)
    document.getElementById("prevtopo").disabled = true;
  else
    document.getElementById("prevtopo").disabled = false;
}
          
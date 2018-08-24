const row = document.querySelectorAll('.row')[1]; // main album div
const appendHtml = (ele, html) => ele.insertAdjacentHTML('beforeend', html);

// domin of test server
const domain = 'https://84113db646b54538946028a66c8c1196.vfs.cloud9.us-west-2.amazonaws.com';


const sampleData = {
    img: '/topo-app/imgs/sampleClimb.png',
    info: 'This is a topo diagram'
}

let CreateTopoPrev = function(data) { // album html chunk
    let html = (`<div class="col-md-4">
              <div class="card mb-4 shadow-sm">
                <img class="card-img-top" data-src="${data.img}" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">${data.info}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
                </div>
              </div>
            </div>`);
    return html;
}


let climbNumber = 1,
    version = 1;

const testData = {
  climbid: '1',
  version: '1'
};

let getTopoRequest = new Request(`/topo/${testData.climbid}/version/${testData.version}`,{
  method: 'GET',
});

fetch(getTopoRequest).then(function(res) {
  return res.json();
}).then(function(json) {
  console.log(json);
});



// for demo
for (let i = 0; i < 7; i++) {
    appendHtml(row, CreateTopoPrev(sampleData));
}
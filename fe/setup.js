let fullScreenButton;

// From
// https://editor.p5js.org/jht1493/sketches/5LgILr8RF
function setup_fullScreenButton() {
  fullScreenButton = createButton("Full Screen");
  fullScreenButton.mousePressed(fullScreen_action);
  fullScreenButton.style(
    "background-color: black; color: white; border: none; /* Remove default button styling */ padding: 10px 20px; /* Adjust padding as needed */ text-align: center; text-decoration: none; display: inline-block; font-size: 16px; /* Adjust font size as needed */ cursor: pointer; position: fixed; left: 0; bottom: 0;"
  );
}

function fullScreen_action() {
  fullScreenButton.remove();
  fullscreen(1);
  let delay = 3000;
  setTimeout(ui_present_window, delay);
}

function ui_present_window() {
  resizeCanvas(windowWidth, windowHeight);
  // init_dim();
}

// Respond to window resizing event
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function get_url_params() {
  let query = window.location.search;
  // console.log('query |' + query + '|');
  console.log("query.length", query.length);
  if (query.length < 1) return null;
  let params = params_query(query);
  return params;
}

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
function params_query(query) {
  // eg. query='abc=foo&def=%5Basf%5D&xyz=5'
  // params={abc: "foo", def: "[asf]", xyz: "5"}
  const urlParams = new URLSearchParams(query);
  return urlParams;
}

let capture;
let myPose = {
  keypoints: [],
};
let poseArr = [];
let faceConn;
let faceMesh;

const CAPTURE_WIDTH = 1920;
const CAPTURE_HEIGHT = 1080;

function setPoses(data) {
  poseArr = data;
}

function drawFigure(pose, conn) {
  push();
  noFill();
  stroke(0);
  strokeWeight(4);
  scale(windowWidth / CAPTURE_WIDTH, windowHeight / CAPTURE_HEIGHT);
  for (let j = 0; j < conn.length; j++) {
    let indices = conn[j];
    let pointAIndex = indices[0];
    let pointBIndex = indices[1];
    let pointCIndex = indices[2];
    let pointA = pose.keypoints[pointAIndex];
    let pointB = pose.keypoints[pointBIndex];
    let pointC = pose.keypoints[pointCIndex];
    triangle(pointA.x, pointA.y, pointB.x, pointB.y, pointC.x, pointC.y);
  }
  pop();
}

// Sketch Lifecycle

function setup() {
  createCanvas(windowWidth, windowHeight);
  setup_fullScreenButton();
  // Create the video capture and hide the element.
  capture = createCapture(VIDEO);
  capture.size(CAPTURE_WIDTH, CAPTURE_HEIGHT);
  capture.hide();
  faceConn = faceMesh.getTriangles();
  faceMesh.detectStart(capture, (result) => {
    if (result) {
      myPose.keypoints = result.length > 0 ? result[0].keypoints : [];
    }
  });

  let params = get_url_params();
  if (params?.has("server")) {
    setupSocket(params.get("server"));
  } else {
    setupSocket("ws://localhost:3005");
  }
  startListen();

  setInterval(() => {
    sendJSON(myPose);
  }, 200);
}

function preload() {
  // Load the faceMesh model
  faceMesh = ml5.faceMesh({
    maxFaces: 1,
    refineLandmarks: false,
    flipHorizontal: false,
  });
}

function draw() {
  background(255);
  image(capture, 0, 0, width, height);
  myPose.keypoints.length > 0 && drawFigure(myPose, faceConn);
  poseArr.forEach((v) => {
    drawFigure(v, faceConn);
  });
}

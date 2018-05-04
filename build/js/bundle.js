(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _sceneManager = require("./sceneManager.js");

var canvas = document.getElementById("renderCanvas");

var sceneManager = new _sceneManager.SceneManager(canvas);

bindEventListener();
render();

function bindEventListener() {
  window.onresize = resizeCanvas;
  resizeCanvas();
}

function resizeCanvas() {
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  canvas.height = canvas.offsetHeight;
  canvas.width = canvas.offsetWidth;

  sceneManager.onWindowResize();
}

function render() {
  requestAnimationFrame(render);
  sceneManager.update();
}

},{"./sceneManager.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneManager = SceneManager;

var _sceneSubjects = require('./sceneSubjects/sceneSubjects.js');

function SceneManager(canvas) {

  var then = new Date().getTime() / 100;

  var pi = 3.1415;

  var screenDimensions = {
    width: canvas.width,
    height: canvas.height
  };

  var scene = buildScene();
  var renderer = buildRenderer(screenDimensions);
  var camera = buildCamera(screenDimensions);
  var controls = createControls(camera);
  var sceneSubjects = createSceneSubjects(scene);

  function buildScene() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#000');

    return scene;
  }

  function buildRenderer(_ref) {
    var width = _ref.width,
        height = _ref.height;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    var DPR = /* (window.devicePixelRatio)? window.devicePixelRatio : */1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    /* SHADOWS */
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFoftShadowMap;

    return renderer;
  }

  function buildCamera(_ref2) {
    var width = _ref2.width,
        height = _ref2.height;

    var aspectRatio = width / height;
    var fov = 60;
    var nearPlane = 0.1;
    var farPlane = 1000;
    var camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane);
    camera.position.set(0, 7, 14);
    camera.rotation.order = 'YXZ';
    camera.rotation.y = 0;

    return camera;
  }

  function createControls(camera) {
    var controls = new THREE.OrbitControls(camera);
    controls.target.set(0, 4, 0);

    return controls;
  }

  function createSceneSubjects(scene) {
    var sceneSubjects = new _sceneSubjects.SceneSubjects(scene);

    return sceneSubjects;
  }

  this.update = function () {

    var now = new Date().getTime() / 100;
    var delta = now - then;
    var frameTime = 60 / 1000;

    if (delta > frameTime) {
      var frameNumber = delta / frameTime;
      for (var i = 1; i < frameNumber; i++) {
        sceneSubjects.update();
      }
    }

    renderer.render(scene, camera);
    controls.update();

    then = new Date().getTime() / 100;
  };

  this.onWindowResize = function () {
    var width = canvas.width,
        height = canvas.height;


    screenDimensions.height = height;
    screenDimensions.width = width;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  };

  function setCameraPosition() {}
}

},{"./sceneSubjects/sceneSubjects.js":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneLights = SceneLights;
function SceneLights(scene) {

  var generalLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0);
  scene.add(generalLight);

  var ballLight = new THREE.PointLight(0xffffff, 1, 20, 2);
  ballLight.castShadow = true;
  ballLight.position.set(0, 3.5, 1);
  scene.add(ballLight);

  var ballLight2 = new THREE.PointLight(0xffffff, 0, 20, 2);
  ballLight2.castShadow = false;
  ballLight2.position.set(2, 10, 1);
  scene.add(ballLight2);

  var lights = {
    generalLight: generalLight,
    ballLight: ballLight
  };

  return lights;
}

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneMeshes = SceneMeshes;
function SceneMeshes(scene) {

  var pi = 3.1415;
  //const HexagonGeometry = Hexagon()

  var groundGeometry = new THREE.PlaneGeometry(100, 100, 4);
  var groundMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
  var plane = new THREE.Mesh(groundGeometry, groundMaterial);
  plane.receiveShadow = true;
  scene.add(plane);
  plane.rotation.x = -(pi / 2);

  var cubeGeometry = new THREE.CylinderGeometry(.7, .7, 1.5, 6);
  var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = false;
  scene.add(cube);
  cube.position.y = 3;

  var hexaGeometry = new THREE.CylinderGeometry(1, 1, 2, 6);
  var highHexaGeometry = new THREE.CylinderGeometry(1, 1, 6, 6);
  var hexaMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
  var hexa1 = new THREE.Mesh(hexaGeometry, hexaMaterial);
  hexa1.castShadow = true;
  hexa1.receiveShadow = true;
  scene.add(hexa1);
  hexa1.position.y = 1;

  var hexa2 = new THREE.Mesh(hexaGeometry, hexaMaterial);
  hexa2.castShadow = true;
  hexa2.receiveShadow = true;
  scene.add(hexa2);
  hexa2.position.x = -.86;
  hexa2.position.z = 1.5;
  hexa2.position.y = .5;

  var hexa3 = new THREE.Mesh(hexaGeometry, hexaMaterial);
  hexa3.castShadow = true;
  hexa3.receiveShadow = true;

  var hexa4 = new THREE.Mesh(highHexaGeometry, hexaMaterial);
  hexa4.castShadow = true;
  hexa4.receiveShadow = true;

  var hexa5 = new THREE.Mesh(highHexaGeometry, hexaMaterial);
  hexa5.castShadow = true;
  hexa5.receiveShadow = true;

  var hexa6 = new THREE.Mesh(highHexaGeometry, hexaMaterial);
  hexa6.castShadow = true;
  hexa6.receiveShadow = true;

  var hexa7 = new THREE.Mesh(highHexaGeometry, hexaMaterial);
  hexa7.castShadow = true;
  hexa7.receiveShadow = true;

  var hexa8 = new THREE.Mesh(highHexaGeometry, hexaMaterial);
  hexa8.castShadow = true;
  hexa8.receiveShadow = true;

  var hexa9 = new THREE.Mesh(highHexaGeometry, hexaMaterial);
  hexa9.castShadow = true;
  hexa9.receiveShadow = true;

  var hexa10 = new THREE.Mesh(highHexaGeometry, hexaMaterial);
  hexa10.castShadow = true;
  hexa10.receiveShadow = true;

  var hexa11 = new THREE.Mesh(highHexaGeometry, hexaMaterial);
  hexa11.castShadow = true;
  hexa11.receiveShadow = true;

  var hexa12 = new THREE.Mesh(highHexaGeometry, hexaMaterial);
  hexa12.castShadow = true;
  hexa12.receiveShadow = true;

  scene.add(hexa3, hexa4, hexa5, hexa6, hexa7, hexa8, hexa9, hexa10, hexa11, hexa12);
  hexa3.position.z = 1.5;
  hexa3.position.x = .86;
  hexa4.position.set(3.4, -.5, 0);
  hexa5.position.set(1.7, -1.3, 0);
  hexa6.position.set(-1.7, -1, 0);
  hexa7.position.set(-.85, -.5, -1.5);
  hexa8.position.set(-2.6, 0, -1.5);
  hexa9.position.set(.85, 1.3, -1.5);
  hexa10.position.set(2.6, 0, -1.5);
  hexa11.position.set(0, 2, -3);
  hexa12.position.set(-1.7, 1, -3);

  var meshes = {
    plane: plane,
    cube: cube
  };

  return meshes;
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScenePhysics = ScenePhysics;
function ScenePhysics(scene) {

  var world = new CANNON.World();
  var timeStep = 1 / 60;
  world.gravity.set(0, -5, 0);
  world.broadphase = new CANNON.NaiveBroadphase();

  var bodyGround = new CANNON.Body({
    mass: 0,
    shape: new CANNON.Plane()
  });
  world.addBody(bodyGround);

  var bodyCube = new CANNON.Body({
    mass: 5,
    position: new CANNON.Vec3(0, 7, 0),
    shape: new CANNON.Cylinder(1, 1, 3, 6)
  });
  world.addBody(bodyCube);

  var physics = {
    world: world,
    timeStep: timeStep,
    bodyGround: bodyGround,
    bodyCube: bodyCube
  };

  return physics;
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneSubjects = SceneSubjects;

var _sceneMeshes = require("./sceneMeshes.js");

var _sceneLights = require("./sceneLights.js");

var _scenePhysics = require("./scenePhysics.js");

function SceneSubjects(scene) {

  var sceneMeshes = (0, _sceneMeshes.SceneMeshes)(scene);
  var sceneLights = (0, _sceneLights.SceneLights)(scene);
  var scenePhysics = (0, _scenePhysics.ScenePhysics)(scene);

  var origin = sceneMeshes.cube.position.y + 1;

  var k = 0;

  sceneLights.ballLight.position.copy(sceneMeshes.cube.position);

  scenePhysics.bodyGround.position.copy(sceneMeshes.plane.position);
  scenePhysics.bodyGround.quaternion.copy(sceneMeshes.plane.quaternion);

  function updatePhysics(scenePhysics, sceneMeshes) {
    sceneMeshes.cube.position.y = Math.cos(k) + origin;
    //sceneMeshes.cube.rotation.y += 0.01
    sceneLights.ballLight.position.y = sceneMeshes.cube.position.y;

    k += 0.01;

    scenePhysics.world.step(scenePhysics.timeStep);
  }

  this.update = function () {
    updatePhysics(scenePhysics, sceneMeshes);
  };
}

},{"./sceneLights.js":3,"./sceneMeshes.js":4,"./scenePhysics.js":5}]},{},[1]);

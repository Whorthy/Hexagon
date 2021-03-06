import {SceneSubjects} from "./sceneSubjects/sceneSubjects.js"

export function SceneManager(canvas) {

  let then = new Date().getTime() / 100 

  const pi = 3.1415

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height 
  }

  const scene = buildScene()
  const renderer = buildRenderer(screenDimensions)
  const camera = buildCamera(screenDimensions)
  const controls = createControls(camera)
  const sceneSubjects = createSceneSubjects(scene)


  function buildScene() {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#000')

    return scene;
  }

  function buildRenderer({width, height}) {
    const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true})
    const DPR = /* (window.devicePixelRatio)? window.devicePixelRatio : */ 1
    renderer.setPixelRatio(DPR) 
    renderer.setSize(width, height)
    /* SHADOWS */
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFoftShadowMap

    return renderer

  }

  function buildCamera({width, height}) {
    const aspectRatio = width / height
    const fov = 60
    const nearPlane = 0.1
    const farPlane = 1000
    const camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlane, farPlane)
    camera.position.set(0,7,14)
    camera.rotation.order = 'YXZ'
    camera.rotation.y = 0

    return camera
  }

  function createControls(camera) {
    const controls = new THREE.OrbitControls(camera)
    controls.target.set(0,4,0)

    return controls
  }

  function createSceneSubjects(scene) {
    const sceneSubjects = new SceneSubjects(scene) 

    return sceneSubjects
  }

  this.update = function() {

    let now = new Date().getTime() / 100 
    let delta = now - then
    let frameTime = 60 / 1000
    
/*     if (delta > frameTime ) {
      let frameNumber = delta / frameTime
      for (var i = 1; i < frameNumber; i++) {
        sceneSubjects.update()
      }
    } */
    sceneSubjects.update()
    renderer.render(scene, camera)
    controls.update()
    
    then = new Date().getTime() / 100
  }

  this.onWindowResize = function() {
    const {width, height} = canvas;

    screenDimensions.height = height
    screenDimensions.width = width

    camera.aspect = width / height 
    camera.updateProjectionMatrix();

    renderer.setSize(width, height)
  }

  function setCameraPosition() {

  }
}
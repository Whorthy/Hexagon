import {SceneMeshes}  from "./sceneMeshes.js"
import {SceneLights}  from "./sceneLights.js"
import {ScenePhysics} from "./scenePhysics.js"

export function SceneSubjects(scene) {

  const sceneMeshes = SceneMeshes(scene)
  const sceneLights = SceneLights(scene)
  const scenePhysics = ScenePhysics(scene)
  
  const origin = sceneMeshes.cube.position.y +1

  let k = 0

  sceneLights.ballLight.position.copy(sceneMeshes.cube.position)

  scenePhysics.bodyGround.position.copy(sceneMeshes.plane.position)
  scenePhysics.bodyGround.quaternion.copy(sceneMeshes.plane.quaternion)

  function updatePhysics(scenePhysics, sceneMeshes) {
    sceneMeshes.cube.position.y = (Math.cos(k) + origin)
    //sceneMeshes.cube.rotation.y += 0.01
    sceneLights.ballLight.position.y = sceneMeshes.cube.position.y

    k += 0.01

    scenePhysics.world.step(scenePhysics.timeStep)
  }

  this.update = function() {
    updatePhysics(scenePhysics, sceneMeshes)
  }  
}
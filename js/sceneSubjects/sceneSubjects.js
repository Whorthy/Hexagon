function SceneSubjects(scene) {

  const sceneMeshes = SceneMeshes(scene)
  const sceneLights = SceneLights(scene)
  const scenePhysics = ScenePhysics(scene)

  //sceneLights.ballLight.position.copy(sceneMeshes.cube.position)

  scenePhysics.bodyGround.position.copy(sceneMeshes.plane.position)
  scenePhysics.bodyGround.quaternion.copy(sceneMeshes.plane.quaternion)

  function updatePhysics(scenePhysics, sceneMeshes) {

    

    scenePhysics.world.step(scenePhysics.timeStep)
  }

  this.update = function() {
    updatePhysics(scenePhysics, sceneMeshes)
  }
}
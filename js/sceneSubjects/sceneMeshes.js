function SceneMeshes(scene) {

  const pi = 3.1415
  const HexagonGeometry = Hexagon()

  const groundGeometry = new THREE.PlaneGeometry(100, 100, 4)
  const groundMaterial = new THREE.MeshPhongMaterial({color: 0x666666})
  const plane = new THREE.Mesh(groundGeometry, groundMaterial)
  plane.receiveShadow = true
  scene.add(plane)
  plane.rotation.x = - (pi / 2)

  const cubeGeometry = new THREE.CylinderGeometry( .7,.7,1.5,6)
  const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff})
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
  cube.castShadow = false
  scene.add(cube)
  cube.position.y = 3

  const hexaGeometry = new THREE.CylinderGeometry(1,1,2,6)
  const highHexaGeometry = new THREE.CylinderGeometry(1,1,6,6)
  const hexaMaterial = new THREE.MeshLambertMaterial({color: 0x666666})
  const hexa1 = new THREE.Mesh(hexaGeometry, hexaMaterial)
  hexa1.castShadow = true
  hexa1.receiveShadow = true
  scene.add(hexa1)
  hexa1.position.y = 1

  const hexa2 = new THREE.Mesh(hexaGeometry, hexaMaterial)
  hexa2.castShadow = true
  hexa2.receiveShadow = true
  scene.add(hexa2)
  hexa2.position.x = -.86
  hexa2.position.z = 1.5
  hexa2.position.y = .5

  const hexa3 = new THREE.Mesh(hexaGeometry, hexaMaterial)
  hexa3.castShadow = true
  hexa3.receiveShadow = true


  const hexa4 = new THREE.Mesh(highHexaGeometry, hexaMaterial)
  hexa4.castShadow = true
  hexa4.receiveShadow = true

  const hexa5 = new THREE.Mesh(highHexaGeometry, hexaMaterial)
  hexa5.castShadow = true
  hexa5.receiveShadow = true

  const hexa6 = new THREE.Mesh(highHexaGeometry, hexaMaterial)
  hexa6.castShadow = true
  hexa6.receiveShadow = true

  const hexa7 = new THREE.Mesh(highHexaGeometry, hexaMaterial)
  hexa7.castShadow = true
  hexa7.receiveShadow = true

  const hexa8 = new THREE.Mesh(highHexaGeometry, hexaMaterial)
  hexa8.castShadow = true
  hexa8.receiveShadow = true

  const hexa9 = new THREE.Mesh(highHexaGeometry, hexaMaterial)
  hexa9.castShadow = true
  hexa9.receiveShadow = true

  const hexa10 = new THREE.Mesh(highHexaGeometry, hexaMaterial)
  hexa10.castShadow = true
  hexa10.receiveShadow = true 

  const hexa11 = new THREE.Mesh(highHexaGeometry, hexaMaterial)
  hexa11.castShadow = true
  hexa11.receiveShadow = true

  const hexa12 = new THREE.Mesh(highHexaGeometry, hexaMaterial)
  hexa12.castShadow = true
  hexa12.receiveShadow = true

  scene.add(hexa3, hexa4, hexa5, hexa6, hexa7, hexa8, hexa9, hexa10, hexa11, hexa12)
  hexa3.position.z = 1.5
  hexa3.position.x = .86
  hexa4.position.set(3.4,-.5,0)
  hexa5.position.set(1.7, -1.3, 0)
  hexa6.position.set(-1.7,-1,0)
  hexa7.position.set(-.85,-.5,-1.5)
  hexa8.position.set(-2.6,0,-1.5)
  hexa9.position.set(.85,1.3,-1.5)
  hexa10.position.set(2.6,0,-1.5)
  hexa11.position.set(0,2,-3)
  hexa12.position.set(-1.7,1,-3)

  const meshes = {
    plane: plane,
    cube: cube
  }

  return meshes

}
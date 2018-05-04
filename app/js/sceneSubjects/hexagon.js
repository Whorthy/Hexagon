//Not used

function Hexagon() {
  
  let hexagon = new THREE.Geometry()

  hexagon.vertices.push(
    new THREE.Vector3(0,1,0),
    new THREE.Vector3(5,1,0),
    new THREE.Vector3(5,1,5),
    new THREE.Vector3(0,2,0),
    new THREE.Vector3(5,2,0),
    new THREE.Vector3(5,2,5)
  )

  hexagon.faces.push(
    new THREE.Face3(0,1,2),
    new THREE.Face3(3,4,5)
  )

  hexagon.computeBoundingSphere()
  hexagon.computeFaceNormals()
  hexagon.computeVertexNormals()

  return hexagon

}

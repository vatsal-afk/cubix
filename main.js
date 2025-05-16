import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const cubeGroup = new THREE.Group();
scene.add(cubeGroup);

const cubeSize = 1;
const spacing = 0.05;
const offset = (3 - 1) / 2;

function getFaceMaterials(x, y, z) {
  const materials = [];

  const colors = {
    white: 0xffffff,
    yellow: 0xffff00,
    green: 0x00ff00,
    blue: 0x0000ff,
    orange: 0xff8000,
    red: 0xff0000,
    black: 0x000000,
  };

  // Order of faces in BoxGeometry:
  // 0: right (+X), 1: left (-X), 2: top (+Y), 3: bottom (-Y), 4: front (+Z), 5: back (-Z)

  materials.push(new THREE.MeshBasicMaterial({ color: x === 2 ? colors.red : colors.black }));    // right
  materials.push(new THREE.MeshBasicMaterial({ color: x === 0 ? colors.orange : colors.black })); // left
  materials.push(new THREE.MeshBasicMaterial({ color: y === 2 ? colors.white : colors.black }));  // top
  materials.push(new THREE.MeshBasicMaterial({ color: y === 0 ? colors.yellow : colors.black })); // bottom
  materials.push(new THREE.MeshBasicMaterial({ color: z === 2 ? colors.green : colors.black }));  // front
  materials.push(new THREE.MeshBasicMaterial({ color: z === 0 ? colors.blue : colors.black }));   // back

  return materials;
}

for(let x = 0; x < 3; x++) {
  for(let y = 0; y < 3; y++) {
    for(let z = 0; z < 3; z++) {
      const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const materials = getFaceMaterials(x, y, z);
      const cubie = new THREE.Mesh(geometry, materials);

      cubie.position.set(
        (x - offset) * (cubeSize + spacing),
        (y - offset) * (cubeSize + spacing),
        (z - offset) * (cubeSize + spacing)
      );

      cubeGroup.add(cubie);
    }
  }
}

function animate() {

  cubeGroup.rotation.x += 0.01;
  cubeGroup.rotation.y += 0.01;

  renderer.render( scene, camera );

}
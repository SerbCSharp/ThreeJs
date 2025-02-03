import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

const gui = new GUI();

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('/2.png')

const particlesGeometry = new THREE.BufferGeometry();
const count = 20000;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for(let i = 0; i < count * 3; i++)
{
    positions[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

const particlesMaterial = new THREE.PointsMaterial({ size: 0.1, sizeAttenuation: true });
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
//particlesMaterial.alphaTest = 0.001;
//particlesMaterial.depthTest = false;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;
particlesMaterial.vertexColors = true;
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.append( renderer.domElement );

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    particles.rotation.y = elapsedTime * 0.2

    orbitControls.update();
    renderer.render( scene, camera );
    window.requestAnimationFrame(tick)
}

tick();
import React, { Fragment } from "react";
import * as THREE from 'three';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export default class ThreeDemo extends React.Component {
    public handlerenderThreeModal = () => {
        let mixer: any;
        let model: any;
        const clock = new THREE.Clock();
        const container = document.getElementById("three3");
        const renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.outputEncoding = THREE.sRGBEncoding;
        container?.appendChild( renderer.domElement );

        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xbfe3dd );

        const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
        camera.position.set( 5, 2, 8 );

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.target.set( 0, 0.5, 0 );
        controls.update();
        controls.enablePan = false;
        controls.enableDamping = true;

        scene.add( new THREE.HemisphereLight( 0xffffff, 0x000000, 0.4 ) );

        const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
        dirLight.position.set( 5, 2, 8 );
        scene.add( dirLight );
        const envMap = new THREE.CubeTextureLoader().load([
            "three-modal/textures/aim.002_baseColor.png",
            "three-modal/textures/aim.002_emissive.png",
            "three-modal/textures/aim.002_metallicRoughness.png",
            "three-modal/textures/aim.002_normal.png",
            "three-modal/textures/detail.002_baseColor.png",
            "three-modal/textures/detail.002_emissive.png",
            "three-modal/textures/detail.002_metallicRoughness.png",
            "three-modal/textures/detail.002_normal.png",

            "three-modal/textures/feather.002_baseColor.png",
            "three-modal/textures/feather.002_metallicRoughness.png",
            "three-modal/textures/feather.002_normal.png",

            "three-modal/textures/front.002_baseColor.png",
            "three-modal/textures/front.002_emissive.png",
            "three-modal/textures/front.002_metallicRoughness.png",
            "three-modal/textures/front.002_normal.png",

            "three-modal/textures/glass.002_baseColor.png",
            "three-modal/textures/glass.002_emissive.png",
            "three-modal/textures/glass.002_metallicRoughness.png",

            "three-modal/textures/handle.002_baseColor.png",
            "three-modal/textures/handle.002_metallicRoughness.png",
            "three-modal/textures/handle.002_normal.png",

            "three-modal/textures/liser_line_baseColor.png",

            "three-modal/textures/mat_gloss_baseColor.png",
            "three-modal/textures/mat_gloss_metallicRoughness.png",
            "three-modal/textures/mat_gloss_normal.png",

            "three-modal/textures/Midle_parts.002_baseColor.png",
            "three-modal/textures/Midle_parts.002_metallicRoughness.png",
            "three-modal/textures/Midle_parts.002_normal.png",

            "three-modal/textures/wires.002_baseColor.png",
            "three-modal/textures/wires.002_metallicRoughness.png",
            "three-modal/textures/wires.002_normal.png",

            "three-modal/textures/wood_parts.002_baseColor.png",
            "three-modal/textures/wood_parts.002_metallicRoughness.png",
            "three-modal/textures/wood_parts.002_normal.png",

        ]);
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( 'js/libs/draco/gltf/' );
        const loader = new GLTFLoader();
        loader.setDRACOLoader( dracoLoader );
        loader.load("three-modal/scene.gltf", (gltf: any) => {
            model = gltf.scene;
            model.position.set( 0, 0, 0 );
            model.scale.set( 0.005, 0.005, 0.005 );
            model.traverse( function ( child: any ) {

                if ( child.isMesh ) child.material.envMap = envMap;

            } );
            scene.add( model );
            mixer = new THREE.AnimationMixer( model );
            // mixer.clipAction( gltf.animations[ 0 ] ).play();
            animate();
        }, (xhr: any) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        }, function (error: any) {
            console.log(error);
        })
        function animate() {
            requestAnimationFrame( animate );
            const delta = clock.getDelta();
            mixer.update( delta );
            controls.update();
            // stats.update();
            model.rotation.y += 0.01;
            renderer.render( scene, camera );

        } 
    }
    componentDidMount() {
        this.handlerenderThreeModal();
    }
    render() {
        return (
            <Fragment>
                <div id="three3"></div>
            </Fragment>
        )
    }
}
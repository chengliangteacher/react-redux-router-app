import React, { Fragment } from "react";
import * as THREE from 'three';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export default class ThreeDemo extends React.Component {
    public mixer: any;
    public clock:any = new THREE.Clock();
    public renderer: any = new THREE.WebGLRenderer( { antialias: true } );
    public scene:any = new THREE.Scene();
    public camera:any = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
    public dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    public dracoLoader:any = new DRACOLoader();
    public loader:any = new GLTFLoader();
    public controls = new OrbitControls( this.camera, this.renderer.domElement );
    public handleRenderThree1 = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGL1Renderer();
        renderer.setSize(400, 400);
        document.getElementById("three")?.appendChild(renderer.domElement);
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.position.z = 5;
        const animate = function () {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.02;
            cube.rotation.y += 0.02;
            renderer.render(scene, camera)
        }
        animate();
    }
    public handleRenderThree2 = () => {
        //=====================================创建一个渲染器====================================//
        const renderer = new THREE.WebGL1Renderer();
        renderer.setSize(400, 400);
        document.getElementById("three2")?.appendChild(renderer.domElement);
        //=====================================创建相机====================================//
        const camera = new THREE.PerspectiveCamera(45, 1, 1, 500);
        camera.position.set(0, 0, 100);
        camera.lookAt(0, 0, 0);
        //=====================================创建一个场景====================================//
        const scene = new THREE.Scene();
        //=====================================定义一个材质====================================//
        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        //=====================================创建带有定点的几何体====================================//
        const points = [];
        points.push(new THREE.Vector3(0, 0, 0)); //----Vector3-三维
        points.push(new THREE.Vector3(10, 10, 10)); //----Vector3-三维
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        //=====================================画线====================================//
        const line = new THREE.Line(geometry, material);
        //=====================================添加到场景并调用render渲染====================================//
        scene.add(line);
        renderer.render(scene, camera);
    }
    public handlerenderThreeModal = () => {
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        document.getElementById("three3")?.appendChild(this.renderer.domElement);
        this.scene.background = new THREE.Color(0xbfe3dd);
        this.camera.position.set( 5, 2, 8 );
        this.controls.target.set( 0, 0.5, 0 );
        this.controls.update();
        this.controls.enablePan = false;
        this.controls.enableDamping = true;
        this.scene.add( new THREE.HemisphereLight( 0xffffff, 0x000000, 0.4 ) );
        const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
        dirLight.position.set( 5, 2, 8 );
        this.scene.add( dirLight );
        const envMap = new THREE.CubeTextureLoader().load( [
            "three-modal/textures/02_-_Default_baseColor.png",
            "three-modal/textures/02_-_Default_emissive.jpg",
            "three-modal/textures/03_-_Default_baseColor.png",
            "three-modal/textures/08_-_Default_baseColor.png",
            "three-modal/textures/08_-_Default_emissive.jpg",
            "three-modal/textures/09_-_Default_baseColor.jpg",
        ] );
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( 'js/libs/draco/gltf/' );
        const loader = new GLTFLoader();
        loader.setDRACOLoader( dracoLoader );
        this.loader.load("three-modal/scene.gltf",  (gltf: any) =>  {
            const model = gltf.scene;
            model.position.set( 1, 1, 0 );
            model.scale.set( 0.05, 0.05, 0.05 );
            model.traverse(  ( child: any ) =>  {
                if ( child.isMesh ) child.material.envMap = envMap;
            } );
            this.scene.add(model);
            this.mixer = new THREE.AnimationMixer( model );
            // this.mixer.clipAction( gltf.animations[ 0 ] ).play();
            this.animateThree();
        }, (xhr: any) => {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        }, function (error: any) {
            console.log(error);
        })
    }
    public animateThree = () => {
        requestAnimationFrame( this.animateThree );
        const delta = this.clock.getDelta();
        this.mixer.update( delta );
        this.controls.update();
        this.renderer.render( this.scene, this.camera );
    }
    componentDidMount() {
        // this.handlerenderThreeModal();
    }
    render() {
        return (
            <Fragment>
                <div id="three"></div>
                <div id="three2"></div>
                <div id="three3"></div>
            </Fragment>
        )
    }
}
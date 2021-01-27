import React from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class SimpleRubiksCube extends React.Component {
    componentDidMount() {
        this.handleRenderCube();
    }
    //=====================================初始化正方体three====================================//
    handleRenderCube = () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1650 / 720, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(1650, 720);
        renderer.physicallyCorrectLights = true;
        scene.background = new THREE.Color(0x444444);
        document.getElementById("cube")?.appendChild(renderer.domElement);

        //=====================================控制器====================================//
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.enablePan = true; // 启用或禁用摄像机平移
        controls.enableDamping = true;
        controls.rotateSpeed = 1; // 旋转速度
        controls.enabled = true; // 是否控制旋转
        controls.enableKeys = true; // 启用键盘控制
        controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
        }
        controls.addEventListener("start", (data) => {
            // controls.enabled = false;
            // console.log(data)
        })
        controls.addEventListener("end", (data) => {
            console.log(data)
        })
        
        document.addEventListener("touchstart", (e: any) => {
            console.log(e)
            console.log(controls.mouseButtons)
        }, false)

        camera.position.z = 10;
        const positions = [
            { x: 1, y: 1, z: 1 },
            { x: 1, y: 0, z: 1 },
            { x: 1, y: -1, z: 1 },
            { x: 0, y: 1, z: 1 },
            { x: 0, y: 0, z: 1 },
            { x: 0, y: -1, z: 1 },
            { x: -1, y: 1, z: 1 },
            { x: -1, y: 0, z: 1 },
            { x: -1, y: -1, z: 1 },

            { x: 1, y: 1, z: 0 },
            { x: 1, y: 0, z: 0 },
            { x: 1, y: -1, z: 0 },
            { x: 0, y: 1, z: 0 },
            { x: 0, y: 0, z: 0 },
            { x: 0, y: -1, z: 0 },
            { x: -1, y: 1, z: 0 },
            { x: -1, y: 0, z: 0 },
            { x: -1, y: -1, z: 0 },

            { x: 1, y: 1, z: -1 },
            { x: 1, y: 0, z: -1 },
            { x: 1, y: -1, z: -1 },
            { x: 0, y: 1, z: -1 },
            { x: 0, y: 0, z: -1 },
            { x: 0, y: -1, z: -1 },
            { x: -1, y: 1, z: -1 },
            { x: -1, y: 0, z: -1 },
            { x: -1, y: -1, z: -1 },
        ]

        const groups = new THREE.Group();

        positions.forEach(item => {
            const mesh = this.singeCube(item.x, item.y, item.z);
            groups.add(mesh);
        })

        scene.add(groups)
        groups.rotation.y += 0.7;
        groups.rotation.x += 0.4;
        const animate = function () {
            controls.update();
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();
    }
    singeCube = (x: number, y: number, z: number) => {
        const geometry = new THREE.BoxGeometry(1, 1, 1); // 正方体
        // //=====================================背面(255, 255, 255, 1)====================================//
        // geometry.faces[0].color.setHex(0x2c9d54)
        // geometry.faces[1].color.setHex(0x2c9d54)

        // //=====================================正面(248, 204, 12, 1)====================================//
        // geometry.faces[2].color.setHex(0x3d81f6)
        // geometry.faces[3].color.setHex(0x3d81f6)
        // //=====================================顶面(61, 129, 246, 1)====================================//
        // geometry.faces[4].color.setHex(0xFFC125)
        // geometry.faces[5].color.setHex(0xFFC125)
        // //=====================================底面(44, 157, 84, 1)====================================//
        // geometry.faces[6].color.setHex(0xffffff)
        // geometry.faces[7].color.setHex(0xffffff)
        // //=====================================右侧面(245, 108, 2, 1)====================================//
        // geometry.faces[8].color.setHex(0xdc4230)
        // geometry.faces[9].color.setHex(0xdc4230)
        // //=====================================左侧面(220, 66, 48, 1)====================================//
        // geometry.faces[10].color.setHex(0xf56c02)
        // geometry.faces[11].color.setHex(0xf56c02)
        // const material = new THREE.MeshBasicMaterial({ vertexColors: true });
        // const cube = new THREE.Mesh(geometry, material);
        // // cube.rotation.x += 0.5;
        // // cube.rotation.y += 1;
        // cube.position.x = x;
        // cube.position.y = y;
        // cube.position.z = z;
        // return cube;
        let mesh;
        const materials: any = [];
        const myFaces: any = [];
        const colors = ["rgba(255, 255, 255, 1)", "rgba(248, 204, 12, 1)", "rgba(61, 129, 246, 1)", "rgba(44, 157, 84, 1)", "rgba(245, 108, 2, 1)", "rgba(220, 66, 48, 1)",];
        colors.forEach(item => {
            myFaces.push(this.faces(item))
        })
        colors.forEach((item, index) => {
            let texture = new THREE.Texture(myFaces[index])
            texture.needsUpdate = true;
            materials.push(new THREE.MeshBasicMaterial({ map: texture }));
        })
        mesh = new THREE.Mesh(geometry, materials);
        mesh.position.x = x;
        mesh.position.y = y;
        mesh.position.z = z;
        return mesh;
    }
    public faces = (rgbaColor: string) => {
        var canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        var context = canvas.getContext("2d");
        if (context) {
            // 3
            context.fillStyle = "rgba(0,0,0,1)";
            context.fillRect(0, 0, 256, 256);
            context.rect(16, 16, 224, 224);
            context.lineJoin = "round";
            context.lineWidth = 16;
            context.fillStyle = rgbaColor;
            context.strokeStyle = rgbaColor;
            context.stroke();
            context.fill();
        } else {
            alert('您的浏览器不支持Canvas无法预览.\n');
        }
        return canvas;
    }
    render() {
        return (
            <div id="cube"></div>
        )
    }
}
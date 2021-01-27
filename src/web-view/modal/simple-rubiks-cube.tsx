import React from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class SimpleRubiksCube extends React.Component {
    public scene: any;
    public camera: any;
    public renderer: any;
    public controls: any;
    public startTime: number = 0;
    public rtime: number = 30;
    public isStart: boolean = false;
    public globalintersects: any;
    public seletcedMeshs: any;
    public firstIntersects: any;
    public lastIntersects: any;
    public firstFaceIntersects: any;
    public lastFaceIntersects: any;
    public firstClientX: number = 0;
    public firstClientY: number = 0;
    public lastClientX: number = 0;
    public lastClientY: number = 0;
    public rotateNormal: any;
    public radian: number = Math.PI / 2;
    public outRtime: number = 30;
    public outStartime: number = 0;
    public outIsStart: boolean = false;
    //=====================================b,f,up,under,r,l rgba(156, 39, 176, 1)====================================//
    //["rgba(255, 255, 255, 1)", "rgba(248, 204, 12, 1)", "rgba(61, 129, 246, 1)", "rgba(44, 157, 84, 1)", "rgba(245, 108, 2, 1)", "rgba(220, 66, 48, 1)"]
    public positions = [
        { x: 1, y: 1, z: 1, colors: ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)", "rgba(61, 129, 246, 1)", "rgba(0, 0, 0, 1)", "rgba(245, 108, 2, 1)", "rgba(0, 0, 0, 1)"] },
        { x: 1, y: 0, z: 1, colors: ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(245, 108, 2, 1)", "rgba(0, 0, 0, 1)"] },
        { x: 1, y: -1, z: 1, colors: ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(44, 157, 84, 1)", "rgba(245, 108, 2, 1)", "rgba(0, 0, 0, 1)"] },
        { x: 0, y: 1, z: 1, colors: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(61, 129, 246, 1)", "rgba(0, 0, 0, 1)", "rgba(245, 108, 2, 1)", "rgba(0, 0, 0, 1)"] },
        { x: 0, y: 0, z: 1, colors: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(245, 108, 2, 1)", "rgba(0, 0, 0, 1)"] },
        { x: 0, y: -1, z: 1, colors: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(44, 157, 84, 1)", "rgba(245, 108, 2, 1)", "rgba(0, 0, 0, 1)"] },
        { x: -1, y: 1, z: 1, colors: ["rgba(0, 0, 0, 1)", "rgba(248, 204, 12, 1)", "rgba(61, 129, 246, 1)", "rgba(0, 0, 0, 1)", "rgba(245, 108, 2, 1)", "rgba(220, 66, 48, 1)"] },
        { x: -1, y: 0, z: 1, colors: ["rgba(0, 0, 0, 1)", "rgba(248, 204, 12, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(245, 108, 2, 1)", "rgba(0, 0, 0, 1)"] },
        { x: -1, y: -1, z: 1, colors: ["rgba(0, 0, 0, 1)", "rgba(248, 204, 12, 1)", "rgba(0, 0, 0, 1)", "rgba(44, 157, 84, 1)", "rgba(245, 108, 2, 1", "rgba(220, 66, 48, 1)"] },

        { x: 1, y: 1, z: 0, colors: ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)", "rgba(61, 129, 246, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"] },
        { x: 1, y: 0, z: 0, colors: ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"] },
        { x: 1, y: -1, z: 0, colors: ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(44, 157, 84, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"] },
        { x: 0, y: 1, z: 0, colors: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(61, 129, 246, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"] },
        { x: 0, y: 0, z: 0, colors: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"] },
        { x: 0, y: -1, z: 0, colors: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(44, 157, 84, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"] },
        { x: -1, y: 1, z: 0, colors: ["rgba(0, 0, 0, 1)", "rgba(248, 204, 12, 1)", "rgba(61, 129, 246, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"] },
        { x: -1, y: 0, z: 0, colors: ["rgba(0, 0, 0, 1)", "rgba(248, 204, 12, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"] },
        { x: -1, y: -1, z: 0, colors: ["rgba(0, 0, 0, 1)", "rgba(248, 204, 12, 1)", "rgba(0, 0, 0, 1)", "rgba(44, 157, 84, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)"] },

        { x: 1, y: 1, z: -1, colors: ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)", "rgba(61, 129, 246, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(220, 66, 48, 1)"] },
        { x: 1, y: 0, z: -1, colors: ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(220, 66, 48, 1)"] },
        { x: 1, y: -1, z: -1, colors: ["rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(44, 157, 84, 1)", "rgba(0, 0, 0, 1)", "rgba(220, 66, 48, 1)"] },
        { x: 0, y: 1, z: -1, colors: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(61, 129, 246, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(220, 66, 48, 1)"] },
        { x: 0, y: 0, z: -1, colors: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(220, 66, 48, 1)"] },
        { x: 0, y: -1, z: -1, colors: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(44, 157, 84, 1)", "rgba(0, 0, 0, 1)", "rgba(220, 66, 48, 1)"] },
        { x: -1, y: 1, z: -1, colors: ["rgba(0, 0, 0, 1)", "rgba(248, 204, 12, 1)", "rgba(61, 129, 246, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(220, 66, 48, 1)"] },
        { x: -1, y: 0, z: -1, colors: ["rgba(0, 0, 0, 1)", "rgba(248, 204, 12, 1)", "rgba(61, 129, 246, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(220, 66, 48, 1)"] },
        { x: -1, y: -1, z: -1, colors: ["rgba(0, 0, 0, 1)", "rgba(248, 204, 12, 1)", "rgba(0, 0, 0, 1)", "rgba(44, 157, 84, 1)", "rgba(0, 0, 0, 1)", "rgba(220, 66, 48, 1)"] },
    ]
    public groups: any;
    public raycaster: any;
    public mouse: any;
    //=====================================初始化自动打乱魔方参数====================================//
    public initRtime: number = 10;
    public isInitStart: boolean = false;
    public initStartTime: number = 0;
    public outRadian: number = 0;
    public outnumber: number = 0;
    public componentDidMount() {
        this.handleInitCube();
        this.handleDraw();
        this.handleInitDraw();
        // this.handleOutDraw();
        this.handleListenPageWidth();
    }
    //=====================================控制器====================================//
    public initControls = () => {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target.set(0, 0, 0);
        this.controls.enablePan = true; // 启用或禁用摄像机平移
        this.controls.enableDamping = true;
        this.controls.rotateSpeed = 1; // 旋转速度
        this.controls.enabled = false; // 是否控制旋转
        this.controls.enableKeys = true; // 启用键盘控制
        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
        }
        this.controls.addEventListener("start", (event: any) => {
            // console.log(event)
        })
    }
    //=====================================设置控制器对相交射线无用====================================//
    public raycasterMouseMove = () => {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        if (intersects.length) {
            this.controls.enabled = false;
        } else {
            this.controls.enabled = false;
        }
        this.renderer.render(this.scene, this.camera);
    }
    //=====================================魔方移入事件====================================//
    public raycasterOnMouseMove = (event: any) => {
        event.preventDefault();
        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects: any = this.raycaster.intersectObjects(this.scene.children, true);
        if (intersects.length && this.firstFaceIntersects) {
            if (!this.firstFaceIntersects || this.isStart) return;
            this.lastFaceIntersects = intersects[0].object;
            this.lastIntersects = intersects[1].object;
            if (this.firstIntersects === this.lastIntersects) return;
            const dx = this.lastIntersects.position.x - this.firstIntersects.position.x;
            const dy = this.lastIntersects.position.y - this.firstIntersects.position.y;
            const dz = this.lastIntersects.position.z - this.firstIntersects.position.z;
            this.radian = Math.PI / 2;
            switch (this.firstFaceIntersects.name) {
                case "F": {
                    if (Math.abs(dy) > Math.abs(dz)) {
                        const publicz = this.firstIntersects.position.z;
                        this.rotateNormal = new THREE.Vector3(0, 0, 1);
                        this.seletcedMeshs = this.groups.children.filter((item: any) => !item.name).filter((item: any) => item.position.z === publicz);
                        if (dy > 0) {
                            this.radian = -this.radian;
                        }
                    } else {
                        const publicy = this.firstIntersects.position.y;
                        this.rotateNormal = new THREE.Vector3(0, 1, 0);
                        this.seletcedMeshs = this.groups.children.filter((item: any) => !item.name).filter((item: any) => item.position.y === publicy);
                        if (dz < 0) {
                            this.radian = -this.radian;
                        }
                    }
                    break;
                }
                case "B": {
                    if (Math.abs(dy) > Math.abs(dz)) {
                        const publicz = this.firstIntersects.position.z;
                        this.rotateNormal = new THREE.Vector3(0, 0, 1);
                        this.seletcedMeshs = this.groups.children.filter((item: any) => !item.name).filter((item: any) => item.position.z === publicz);
                        if (dy < 0) {
                            this.radian = -this.radian;
                        }
                    } else {
                        const publicy = this.firstIntersects.position.y;
                        this.rotateNormal = new THREE.Vector3(0, 1, 0);
                        this.seletcedMeshs = this.groups.children.filter((item: any) => !item.name).filter((item: any) => item.position.y === publicy);
                        if (dz > 0) {
                            this.radian = -this.radian;
                        }
                    }
                    break;
                }
                case "R": {
                    if (Math.abs(dy) > Math.abs(dx)) {
                        const publicx = this.firstIntersects.position.x;
                        this.rotateNormal = new THREE.Vector3(1, 0, 0);
                        this.seletcedMeshs = this.groups.children.filter((item: any) => !item.name).filter((item: any) => item.position.x === publicx);
                        if (dy > 0) {
                            this.radian = -this.radian;
                        }
                    } else {
                        const publicy = this.firstIntersects.position.y;
                        this.rotateNormal = new THREE.Vector3(0, 1, 0);
                        this.seletcedMeshs = this.groups.children.filter((item: any) => !item.name).filter((item: any) => item.position.y === publicy);
                        if (dx < 0) {
                            this.radian = -this.radian;
                        }
                    }
                    break;
                }
                case "L": {
                    if (Math.abs(dy) > Math.abs(dx)) {
                        const publicx = this.firstIntersects.position.x;
                        this.rotateNormal = new THREE.Vector3(1, 0, 0);
                        this.seletcedMeshs = this.groups.children.filter((item: any) => !item.name).filter((item: any) => item.position.x === publicx);
                        if (dy < 0) {
                            this.radian = -this.radian;
                        }
                    } else {
                        const publicy = this.firstIntersects.position.y;
                        this.rotateNormal = new THREE.Vector3(0, 1, 0);
                        this.seletcedMeshs = this.groups.children.filter((item: any) => !item.name).filter((item: any) => item.position.y === publicy);
                        if (dx > 0) {
                            this.radian = -this.radian;
                        }
                    }
                    break;
                }
                case "T": {
                    if (Math.abs(dz) > Math.abs(dx)) {
                        const publicx = this.firstIntersects.position.x;
                        this.rotateNormal = new THREE.Vector3(1, 0, 0);
                        this.seletcedMeshs = this.groups.children.filter((item: any) => !item.name).filter((item: any) => item.position.x === publicx);
                        if (dz < 0) {
                            this.radian = -this.radian;
                        }
                    } else {
                        const publicz = this.firstIntersects.position.z;
                        this.rotateNormal = new THREE.Vector3(0, 0, 1);
                        this.seletcedMeshs = this.groups.children.filter((item: any) => !item.name).filter((item: any) => item.position.z === publicz);
                        if (dx > 0) {
                            this.radian = -this.radian;
                        }
                    }
                    break;
                }
                case "U": {
                    if (Math.abs(dz) > Math.abs(dx)) {
                        const publicx = this.firstIntersects.position.x;
                        this.rotateNormal = new THREE.Vector3(1, 0, 0);
                        this.seletcedMeshs = this.groups.children.filter((item: any) => !item.name).filter((item: any) => item.position.x === publicx);
                        if (dz > 0) {
                            this.radian = -this.radian;
                        }
                    } else {
                        const publicz = this.firstIntersects.position.z;
                        this.rotateNormal = new THREE.Vector3(0, 0, 1);
                        this.seletcedMeshs = this.groups.children.filter((item: any) => !item.name).filter((item: any) => item.position.z === publicz);
                        if (dx < 0) {
                            this.radian = -this.radian;
                        }
                    }
                    break;
                }
                default: {
                    break;
                }
            }
            this.startTime = 0;
            this.rtime = 30;
            this.isStart = true;

        } else {
            if ((this.firstClientX || this.firstClientY) && !intersects.length) {
                const halfPi = Math.PI / 2;
                let bili = halfPi / 200;
                this.lastClientX = event.clientX
                this.lastClientY = event.clientY
                const dx = this.lastClientX - this.firstClientX;
                const dy = this.lastClientY - this.firstClientY;
                let count;
                if (!dx || !dy) return;
                if (this.outnumber === 1 || (Math.abs(dx) > Math.abs(dy) && !this.outnumber)) {
                    this.outnumber = 1;
                    this.rotateNormal = new THREE.Vector3(0, 1, 0);
                    if (dx > 0) {
                        if (bili*Math.abs(dx) > this.outRadian) {
                            count = bili*Math.abs(dx) - this.outRadian
                        } else {
                            count = -(this.outRadian - bili*Math.abs(dx))
                        }
                        this.outRadian = bili * Math.abs(dx);
                    }else {
                        if (bili*Math.abs(dx) > this.outRadian) {
                            count = -(bili*Math.abs(dx) - this.outRadian)
                        } else {
                            count = this.outRadian - bili*Math.abs(dx);
                        }
                        this.outRadian = -(bili * Math.abs(dx));
                    }
                } else {
                    if (this.outnumber === 2 || (window.innerWidth / 2 > this.firstClientX && !this.outnumber)) {
                        this.outnumber = 2;
                        this.rotateNormal = new THREE.Vector3(0, 0, 1);
                        if (dy > 0) {
                            if (bili*Math.abs(dy) > this.outRadian) {
                                count = bili*Math.abs(dy) - this.outRadian
                            } else {
                                count = -(this.outRadian - bili*Math.abs(dy))
                            }
                            this.outRadian = bili * Math.abs(dy);
                        } else {
                            if (bili*Math.abs(dy) > this.outRadian) {
                                count = -(bili*Math.abs(dy) - this.outRadian)
                            } else {
                                count = this.outRadian - bili*Math.abs(dy);
                            }
                            this.outRadian = -(bili * Math.abs(dy));
                        }
                    } else {
                        this.outnumber = 3;
                        this.rotateNormal = new THREE.Vector3(1, 0, 0);
                        if (dy > 0) {
                            if (bili*Math.abs(dy) > this.outRadian) {
                                count = bili*Math.abs(dy) - this.outRadian
                            } else {
                                count = -(this.outRadian - bili*Math.abs(dy))
                            }
                            this.outRadian = bili * Math.abs(dy);
                        } else {
                            if (bili*Math.abs(dy) > this.outRadian) {
                                count = -(bili*Math.abs(dy) - this.outRadian)
                            } else {
                                count = this.outRadian - bili*Math.abs(dy);
                            }
                            this.outRadian = -(bili * Math.abs(dy));
                        }
                    }

                }
                // this.firstClientX = this.lastClientX;
                // this.firstClientY = this.lastClientY;
                this.lastClientY = 0;
                this.lastClientX = 0;
                console.log(1111, count)
                this.groupRotate(count);
            }
        }
    }
    //=====================================魔方点击事件====================================//
    public raycasterOnMouseClick = (event: any) => {
        event.preventDefault();
        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects: any = this.raycaster.intersectObjects(this.scene.children, true);
        if (intersects.length) {
            if (intersects[1].object.position.x === 1 && intersects[1].object.position.y === 1 && intersects[1].object.position.z === 0) {
                this.globalintersects = intersects;
                this.startTime = 0;
                this.rtime = 30;
                this.isStart = true;
                // this.seletcedMeshs = this.groups.children.filter((item: any) => this.middlePositions.some((val: any) => val.x === item.position.x && val.y === item.position.y && val.z === item.position.z));
            }
        }
    }
    //=====================================魔方鼠标按下====================================//
    public raycasterOnMouseDown = (event: any) => {
        event.preventDefault();
        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects: any = this.raycaster.intersectObjects(this.scene.children, true);
        if (intersects.length && intersects.length > 1) {
            this.firstFaceIntersects = intersects[0].object;
            this.firstIntersects = intersects[1].object;
            this.firstClientX = 0;
            this.firstClientY = 0;
        } else {
            this.firstClientX = event.clientX;
            this.firstClientY = event.clientY;
        }
    }
    //=====================================魔方鼠标放开====================================//
    public raycasterOnMouseUp = (event: any) => {
        event.preventDefault();
        this.mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        this.handleubiksReturn();
        this.outnumber = 0;
        this.outRadian = 0;
        this.firstClientX = 0;
        this.firstClientY = 0;
    }
    //=====================================魔方根据外部旋转角度归位====================================//
    handleubiksReturn = () => {
        console.log(this.outRadian)
        this.outnumber = 0;
        this.outRadian = 0;
        this.firstClientX = 0;
        this.firstClientY = 0;
    }
    //=====================================整体旋转====================================//
    groupRotate = (rate: number) => {
        let r = rate;
        const rotWorldMatrix = new THREE.Matrix4();
        rotWorldMatrix.makeRotationAxis(this.rotateNormal.normalize(), r);
        rotWorldMatrix.multiply(this.groups.matrix);
        this.groups.matrix = rotWorldMatrix;
        this.groups.rotation.setFromRotationMatrix(this.groups.matrix);
    }
    //=====================================旋转魔方====================================//
    handleFacerotate = (seletcedMeshs: any, rtime: any) => {
        const cloneMiddleMeshs = JSON.parse(JSON.stringify(seletcedMeshs.map((item: any) => item.position)));
        const r = this.radian / rtime;
        if (this.rotateNormal.z === 1) {
            cloneMiddleMeshs.forEach((item: any, index: number) => {
                seletcedMeshs[index].up = this.rotateNormal;
                const px = item.x;
                const py = item.y;
                const newx = Math.pow(px * px + py * py, 0.5) * Math.cos(r + Math.atan2(py, px));
                const newy = Math.pow(px * px + py * py, 0.5) * Math.sin(r + Math.atan2(py, px));
                seletcedMeshs[index].position.x = newx;
                seletcedMeshs[index].position.y = newy;
                const rotWorldMatrix = new THREE.Matrix4();
                rotWorldMatrix.makeRotationAxis(this.rotateNormal.normalize(), this.radian / rtime);
                rotWorldMatrix.multiply(seletcedMeshs[index].matrix);        // pre-multiply
                seletcedMeshs[index].matrix = rotWorldMatrix;
                seletcedMeshs[index].rotation.setFromRotationMatrix(seletcedMeshs[index].matrix);
            })
        } else if (this.rotateNormal.y === 1) {
            cloneMiddleMeshs.forEach((item: any, index: number) => {
                seletcedMeshs[index].up = this.rotateNormal;
                const px = item.x;
                const py = item.z;
                const newx = Math.pow(px * px + py * py, 0.5) * Math.cos(-r + Math.atan2(py, px));
                const newy = Math.pow(px * px + py * py, 0.5) * Math.sin(-r + Math.atan2(py, px));
                seletcedMeshs[index].position.x = newx;
                seletcedMeshs[index].position.z = newy;
                const rotWorldMatrix = new THREE.Matrix4();
                rotWorldMatrix.makeRotationAxis(this.rotateNormal.normalize(), this.radian / rtime);
                rotWorldMatrix.multiply(seletcedMeshs[index].matrix);        // pre-multiply
                seletcedMeshs[index].matrix = rotWorldMatrix;
                seletcedMeshs[index].rotation.setFromRotationMatrix(seletcedMeshs[index].matrix);
            })
        } else if (this.rotateNormal.x === 1) {
            cloneMiddleMeshs.forEach((item: any, index: number) => {
                seletcedMeshs[index].up = this.rotateNormal;
                const px = item.z;
                const py = item.y;
                const newx = Math.pow(px * px + py * py, 0.5) * Math.cos(-r + Math.atan2(py, px));
                const newy = Math.pow(px * px + py * py, 0.5) * Math.sin(-r + Math.atan2(py, px));
                seletcedMeshs[index].position.z = newx;
                seletcedMeshs[index].position.y = newy;
                const rotWorldMatrix = new THREE.Matrix4();
                rotWorldMatrix.makeRotationAxis(this.rotateNormal.normalize(), this.radian / rtime);
                rotWorldMatrix.multiply(seletcedMeshs[index].matrix);        // pre-multiply
                seletcedMeshs[index].matrix = rotWorldMatrix;
                seletcedMeshs[index].rotation.setFromRotationMatrix(seletcedMeshs[index].matrix);
            })
        }
    }
    //=====================================魔方旋转动画====================================//
    public handleDraw = () => {
        if (this.isStart) {
            this.handleFacerotate(this.seletcedMeshs, this.rtime);
            this.startTime++;
            if (this.startTime === this.rtime) {
                this.isStart = false;
                for (var i in this.seletcedMeshs) {
                    this.seletcedMeshs[i].position.round();
                }
                this.seletcedMeshs = [];
                this.firstIntersects = null;
                this.firstFaceIntersects = null;
                this.lastFaceIntersects = null;
                this.lastIntersects = null;
            }
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.handleDraw);
    }
    public handleOutDraw = () => {
        if (this.outIsStart) {
            if (this.outStartime === this.outRtime) {
                this.outIsStart = false;
            }
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.handleOutDraw);
    }
    //=====================================魔方旋转动画====================================//
    public handleInitDraw = () => {
        if (this.isInitStart) {
            this.handleFacerotate(this.seletcedMeshs, this.initRtime);
            this.initStartTime++;
            if (this.initStartTime === this.initRtime) {
                this.isInitStart = false;
                for (var i in this.seletcedMeshs) {
                    this.seletcedMeshs[i].position.round();
                }
                this.seletcedMeshs = [];
                this.firstIntersects = null;
                this.lastIntersects = null;
                this.firstFaceIntersects = null;
                this.lastFaceIntersects = null;
                this.firstClientX = 0;
                this.firstClientY = 0;
                this.lastClientX = 0;
                this.lastClientY = 0;
            }
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.handleInitDraw);
    }
    //=====================================渲染动画器====================================//
    public renderAnimate = () => {
        requestAnimationFrame(this.renderAnimate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    //=====================================事件====================================//
    public handleMethods = () => {
        document.addEventListener("mousemove", this.raycasterOnMouseMove, false);
        // document.addEventListener("click", this.raycasterOnMouseClick, false);
        document.addEventListener("mousedown", this.raycasterOnMouseDown, false);
        document.addEventListener("mouseup", this.raycasterOnMouseUp, false);
        document.addEventListener("touchstart", (e: any) => {
        }, false)
    }
    //=====================================隐形贴图用于区分点击的哪个面====================================//
    public setFaceName = () => {
        //=====================================正面====================================//
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ color: 0xfffff, opacity: 0, transparent: true }));
        plane.position.set(-1.52, 0, 0);
        const rotWorldMatrix = new THREE.Matrix4();
        const rotateNormal = new THREE.Vector3(0, 1, 0);
        rotWorldMatrix.makeRotationAxis(rotateNormal.normalize(), -(Math.PI / 2));
        rotWorldMatrix.multiply(plane.matrix);        // pre-multiply
        plane.matrix = rotWorldMatrix;
        plane.rotation.setFromRotationMatrix(plane.matrix);
        plane.name = "F";
        this.groups.add(plane)
        //=====================================右面====================================//
        const plane2 = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ color: 0xfffff, opacity: 0, transparent: true }));
        plane2.position.set(0, 0, 1.52);
        plane2.name = "R";
        this.groups.add(plane2)
        //=====================================背面====================================//
        const plane3 = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ color: 0xfffff, opacity: 0, transparent: true }));
        plane3.position.set(1.52, 0, 0);
        const rotWorldMatrix3 = new THREE.Matrix4();
        const rotateNormal3 = new THREE.Vector3(0, 1, 0);
        rotWorldMatrix3.makeRotationAxis(rotateNormal3.normalize(), (Math.PI / 2));
        rotWorldMatrix3.multiply(plane3.matrix);        // pre-multiply
        plane3.matrix = rotWorldMatrix3;
        plane3.rotation.setFromRotationMatrix(plane3.matrix);
        plane3.name = "B";
        this.groups.add(plane3)
        //=====================================右面====================================//
        const plane4 = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ color: 0xfffff, opacity: 0, transparent: true }));
        plane4.position.set(0, 0, -1.52);
        const rotWorldMatrix4 = new THREE.Matrix4();
        const rotateNormal4 = new THREE.Vector3(0, 0, 0);
        rotWorldMatrix4.makeRotationAxis(rotateNormal4.normalize(), (Math.PI));
        rotWorldMatrix4.multiply(plane4.matrix);        // pre-multiply
        plane4.matrix = rotWorldMatrix4;
        plane4.rotation.setFromRotationMatrix(plane4.matrix);
        plane4.name = "L";
        this.groups.add(plane4)
        //=====================================上面====================================//
        const plane5 = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ color: 0xfffff, opacity: 0, transparent: true }));
        plane5.position.set(0, 1.52, 0);
        const rotWorldMatrix5 = new THREE.Matrix4();
        const rotateNormal5 = new THREE.Vector3(1, 0, 0);
        rotWorldMatrix5.makeRotationAxis(rotateNormal5.normalize(), (-Math.PI / 2));
        rotWorldMatrix5.multiply(plane5.matrix);        // pre-multiply
        plane5.matrix = rotWorldMatrix5;
        plane5.rotation.setFromRotationMatrix(plane5.matrix);
        plane5.name = "T";
        this.groups.add(plane5)
        //=====================================下面====================================//
        const plane6 = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ color: 0xfffff, opacity: 0, transparent: true }));
        plane6.position.set(0, -1.52, 0);
        const rotWorldMatrix6 = new THREE.Matrix4();
        const rotateNormal6 = new THREE.Vector3(1, 0, 0);
        rotWorldMatrix6.makeRotationAxis(rotateNormal6.normalize(), (Math.PI / 2));
        rotWorldMatrix6.multiply(plane6.matrix);        // pre-multiply
        plane6.matrix = rotWorldMatrix6;
        plane6.rotation.setFromRotationMatrix(plane6.matrix);
        plane6.name = "U";
        this.groups.add(plane6)
    }
    //=====================================初始化正方体three====================================//
    public handleInitCube = () => {
        this.scene = new THREE.Scene(); //----------初始化场景
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //----------初始化相机
        this.renderer = new THREE.WebGLRenderer(); //----------初始化渲染器
        this.renderer.setSize(window.innerWidth, window.innerHeight); //----------设置渲染宽高
        this.renderer.physicallyCorrectLights = true;
        this.scene.background = new THREE.Color(0x444444); //----------设置场景背景色
        document.getElementById("cube")?.appendChild(this.renderer.domElement); //----------将渲染器添加到dom节点中
        this.initControls(); //----------控制器
        this.camera.position.z = 6; //----------设置相机位置
        this.camera.position.x = -6; //----------设置相机位置
        this.camera.position.y = 6; //----------设置相机位置
        this.groups = new THREE.Group(); //----------初始化mesh组合
        this.positions.forEach(item => {
            const mesh = this.singeCube(item.x, item.y, item.z, item.colors);
            this.groups.add(mesh);
        })
        this.scene.add(this.groups) //----------添加到场景中
        this.setFaceName(); // 设置每个面的名称
        //=====================================坐标系====================================//
        // const axesHelper = new THREE.AxesHelper(5);
        // this.scene.add(axesHelper)

        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.handleMethods(); //----------事件
        this.renderAnimate(); //----------动画渲染器
    }
    /* 
        @description  生成单个小方块
        @autor        cheng liang
        @create       2021-01-13 09:54"
        @params       (x, y, z)坐标
        @return       mesh
    */
    public singeCube = (x: number, y: number, z: number, colors: Array<string>) => {
        const geometry = new THREE.BoxGeometry(1, 1, 1); // 正方体
        let mesh;
        const materials: any = [];
        const myFaces: any = [];
        //=====================================b,f,up,under,r,l rgba(156, 39, 176, 1)====================================//
        // const colors = ["rgba(255, 255, 255, 1)", "rgba(248, 204, 12, 1)", "rgba(61, 129, 246, 1)", "rgba(44, 157, 84, 1)", "rgba(245, 108, 2, 1)", "rgba(220, 66, 48, 1)"];
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
    /* 
        @description  canvas生成单个魔方面贴图
        @autor        cheng liang
        @create       2021-01-13 09:54"
        @params       rgba颜色
        @return       cavas
    */
    public faces = (rgbaColor: string) => {
        var canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        var context = canvas.getContext("2d");
        if (context) {
            context.fillRect(0, 0, 256, 256);
            context.rect(16, 16, 224, 224);
            context.lineWidth = 16;
            // this.drawRoundRectPath(context, 0, 0, 224, 224, 40)
            context.fillStyle = rgbaColor;
            context.strokeStyle = rgbaColor;
            context.stroke();
            context.fill();
        } else {
            alert('您的浏览器不支持Canvas无法预览.\n');
        }
        return canvas;
    }
    //=====================================绘制填充圆角矩形====================================//
    public drawRoundRectPath = (cxt: any, left: number, top: number, width: number, height: number, r: number,) => {
        const pi = Math.PI;
        cxt.beginPath();
        cxt.arc(left + r, top + r, r, - pi, -pi / 2);
        cxt.arc(left + width - r, top + r, r, -pi / 2, 0);
        cxt.arc(left + width - r, top + height - r, r, 0, pi / 2);
        cxt.arc(left + r, top + height - r, r, pi / 2, pi);
        cxt.closePath();
    }
    //=====================================根据页面大小更新====================================//
    handleListenPageWidth = () => {
        window.addEventListener("resize", () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;//相机视角长宽比
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        })
    }
    render() {
        return (
            <div id="cube"></div>
        )
    }
}
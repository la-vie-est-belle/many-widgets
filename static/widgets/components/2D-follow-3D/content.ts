
import { _decorator, Component, Node, CameraComponent, Vec3, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MW2DFollow3D')
export class MW2DFollow3D extends Component {

    private _cameraComonent: CameraComponent = new CameraComponent();

    onLoad() {
        this._init();
    }

    start () {
        
    }

    private _init() {
        this._initCamera();
        this._changeLayer();
    }

    private _initCamera() {
        let camera = find('Main Camera')!;
        this._cameraComonent = camera.getComponent(CameraComponent)!;
    }

    private _changeLayer() {
        /*
        Change the layer to UI_2D
        */
        this.node.layer = 1 << 25;
        for (let i=0; i<this.node.children.length; i++) {
            this.node.children[i].layer = 1 << 25;
        }
    }

    follow(node3D: Node, offsetVec3: Vec3) {
        /* 
        Get the 3D node's world position (node3DWorldPos),
        and change it to the position on Canvas (node3DUIPos),
        then you can set the 2d node's position according to the node3DUIPos.
        */

        let node3DWorldPos = node3D.getWorldPosition();
        let node3DUIPos = this._cameraComonent.convertToUINode(node3DWorldPos, find('Canvas')!);

        this.node.setPosition(node3DUIPos.add(offsetVec3));
    }
}
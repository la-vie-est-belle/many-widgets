
import { _decorator, Component, Node, RenderTexture, UITransform, Camera, Sprite, SpriteFrame, EventTouch, Vec2, Vec3, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWMagnifier')
export class MWMagnifier extends Component {

    private _magnifierCamera: Node = new Node();
    private _sprite: Node = new Node();
    private _texture: RenderTexture = new RenderTexture();

    onLoad() {
        this._init();
    }

    start () {
    }

    private _init() {
        this._initNodes();
        this._initTextures();
        this._initEvents();
    }

    private _initNodes() {
        this._magnifierCamera = this.node.children[0];
        this._sprite = this.node.children[1].children[0];
    }

    private _initTextures() {
        let spriteWidth = this._sprite.getComponent(UITransform)?.width!;
        let spriteHeight = this._sprite.getComponent(UITransform)?.height!;
        this._texture.resize(spriteWidth, spriteHeight);

        let camera = new Camera();
        camera = this._magnifierCamera.getComponent(Camera)!;
        camera.targetTexture?.resize(spriteWidth, spriteHeight);
        this._texture = camera.targetTexture!

        let spriteFrame = new SpriteFrame();
        spriteFrame = this._sprite.getComponent(Sprite)?.spriteFrame!;
        spriteFrame.texture = this._texture;
    }

    private _initEvents() {
        this.node.parent?.on(Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.parent?.on(Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
    }

    private _onTouchStart(event: EventTouch) {
        let pos = event.getUILocation();
        let pos2 = this.node.parent?.getComponent(UITransform)?.convertToNodeSpaceAR(new Vec3(pos.x, pos.y, 0))!;
        this.node.setPosition(pos2.x, pos2.y, 0);
    }

    private _onTouchMove(event: EventTouch) {
        let pos = event.getUILocation();
        let pos2 = this.node.parent?.getComponent(UITransform)?.convertToNodeSpaceAR(new Vec3(pos.x, pos.y, 0))!;
        this.node.setPosition(pos2.x, pos2.y, 0);
    }

    zoomIn() {
        let currentOrthoHeight = this._magnifierCamera.getComponent(Camera)!.orthoHeight;

        if (currentOrthoHeight <= 10) {
            console.log('Cannot zoom in anymore.')
            return
        }
        else {
            let camera = new Camera();
            camera = this._magnifierCamera.getComponent(Camera)!;
            camera.orthoHeight -= 2;
        }
    }

    zoomOut() {
        let currentOrthoHeight = this._magnifierCamera.getComponent(Camera)!.orthoHeight;

        if (currentOrthoHeight >= 50) {
            console.log('Cannot zoom out anymore.')
            return
        }
        else {
            let camera = new Camera();
            camera = this._magnifierCamera.getComponent(Camera)!;
            camera.orthoHeight += 2;
        }
    }

    setZoomValue(value: number) {
        if (value < 10 || value > 50) {
            console.error('The zoom value should be between(including) 10 and 50.');
            return;
        }
        else {
            let camera = new Camera();
            camera = this._magnifierCamera.getComponent(Camera)!;
            camera.orthoHeight = value;
        }
    }
}
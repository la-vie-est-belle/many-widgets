
import { _decorator, Component, Node, EventTouch, UITransform, Vec3, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWJoystick3D')
export class MWJoystick3D extends Component {
    @property({type: Node})
    targetNode: Node = new Node();

    @property({type: Node})
    camera3D: Node = new Node();

    @property
    playerSpeed: number = 0.1;

    @property
    cameraSpeed: number = 0.5;

    private _isMoving = false;
    private _childNode = new Node();
    private _moveDir: Vec3 = new Vec3(0, 1, 0);
    private _nodeUITransform: UITransform = new UITransform();
    private _startPos: Vec2 = new Vec2();

    /* 
    This will be finished in the next version.
    */
    private _isOnlyFourDirections: Boolean = false;

    onLoad() {
        this._init();
    }

    start () {
    }

    private _init() {
        this._changeLayer();
        this._initNode();
        this._initTouchEvent();
        this._initUITransform();
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

    private _initNode() {
        this._childNode = this.node.children[0];
    }

    private _initUITransform() {
        this._nodeUITransform = this.node.getComponent(UITransform)!;
    }

    private _initTouchEvent() {
        this.node.on(Node.EventType.TOUCH_START, this._onJoystickTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this._onJoystickTouchMove, this);   
        this.node.on(Node.EventType.TOUCH_END, this._onJoystickTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this._onJoystickTouchCancel, this);
    }

    private _onJoystickTouchStart(event: EventTouch) {
        this._isMoving = true;

        let loc = event.getUILocation();
        let pos = this._nodeUITransform.convertToNodeSpaceAR(new Vec3(loc.x, loc.y, 0));
        this._childNode.setPosition(pos);

        this._moveDir = new Vec3(this._childNode.position.x, this._childNode.position.y, 0).normalize();

        event.propagationStopped = true;
    }

    private _onJoystickTouchMove(event: EventTouch) {
        let posDelta = event.getDelta();
        this._childNode.setPosition(this._childNode.position.add3f(posDelta.x, posDelta.y, 0));
        
        this._moveDir = new Vec3(this._childNode.position.x, this._childNode.position.y, 0).normalize();

        event.propagationStopped = true;
    }

    private _onJoystickTouchEnd(event: EventTouch) {
        this._isMoving = false;
        this._childNode.setPosition(Vec3.ZERO);

        event.propagationStopped = true;
    }

    private _onJoystickTouchCancel(event: EventTouch) {
        this._isMoving = false;
        this._childNode.setPosition(Vec3.ZERO);

        event.propagationStopped = true;
    }

    private _onCanvasTouchStart(event: EventTouch) {
        this._startPos = event.getUILocation();
    }

    private _onCanvasTouchMove(event: EventTouch) {
        let newPos = event.getUILocation();
        
        if ((newPos.x-this._startPos.x) > 150) {
            this.camera3D.setRotationFromEuler(this.camera3D.eulerAngles.add3f(0, this.cameraSpeed, 0));
        }
        else if ((newPos.x-this._startPos.x) < -150) {
            this.camera3D.setRotationFromEuler(this.camera3D.eulerAngles.add3f(0, -this.cameraSpeed, 0));
        }
        
        if ((newPos.y-this._startPos.y) > 150) {
            this.camera3D.setRotationFromEuler(this.camera3D.eulerAngles.add3f(-this.cameraSpeed, 0, 0));
        }
        else if ((newPos.y-this._startPos.y) < -150) {
            this.camera3D.setRotationFromEuler(this.camera3D.eulerAngles.add3f(this.cameraSpeed, 0, 0));
        }
    }

    private _limitChildNode() {
        let x = this._childNode.position.x;
        let y = this._childNode.position.y;

        let len = new Vec3(x, y, 0).length();
        let maxLen = this._nodeUITransform.width / 2;

        let ratio = len / maxLen;
        if (ratio > 1) {
            this._childNode.setPosition(x/ratio, y/ratio, 0);
        }
    }

    private _rotateTargetNode() {
        let radian = new Vec2(this._moveDir.x, this._moveDir.y).signAngle(new Vec2(1, 0));
        let angle = radian / Math.PI * 180 + 90;
        this.targetNode.setRotationFromEuler(0, -angle, 0);
    }

    private _moveTargetNode() {
        let xDir = this._moveDir.x;
        let zDir = this._moveDir.y;
        this.targetNode.setPosition(this.targetNode.position.add3f(xDir*this.playerSpeed, 0, -zDir*this.playerSpeed));

    }

    setTargetNode(targetNode: Node) {
        this.targetNode = targetNode;
    }

    setPlayerSpeed(speed: number) {
        this.playerSpeed = speed;
    }

    setCameraSpeed(speed: number) {
        this.cameraSpeed = speed;
    }

    isCameraMovable(isMovable: Boolean) {
        if (isMovable) {
            this.node.parent?.on(Node.EventType.TOUCH_START, this._onCanvasTouchStart, this);
            this.node.parent?.on(Node.EventType.TOUCH_MOVE, this._onCanvasTouchMove, this);
        }
        else {
            this.node.parent?.off(Node.EventType.TOUCH_START, this._onCanvasTouchStart, this);
            this.node.parent?.off(Node.EventType.TOUCH_MOVE, this._onCanvasTouchMove, this);
        }
    }

    update (deltaTime: number) {
        this._limitChildNode();

        if (this._isMoving) {
            this._rotateTargetNode();
            this._moveTargetNode();
        }
    }
}
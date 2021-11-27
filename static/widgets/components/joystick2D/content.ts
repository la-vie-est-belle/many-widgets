
import { _decorator, Component, Node, EventTouch, UITransform, Vec3, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWJoystick2D')
export class MWJoystick2D extends Component {
    @property({type: Node})
    targetNode: Node = new Node();

    @property
    speed: number = 10;

    private _isMoving = false;
    private _childNode = new Node();
    private _moveDir: Vec3 = new Vec3(0, 1, 0);
    private _nodeUITransform: UITransform = new UITransform();
    private _canvasUITransform: UITransform = new UITransform();
    private _isBorderExhisted: Boolean = false;

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
        this._canvasUITransform = this.node.parent?.getComponent(UITransform)!;
    }

    private _initTouchEvent() {
        this.node.on(Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this._onTouchMove, this);   
        this.node.on(Node.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
    }

    private _onTouchStart(event: EventTouch) {
        this._isMoving = true;

        let loc = event.getUILocation();
        let pos = this._nodeUITransform.convertToNodeSpaceAR(new Vec3(loc.x, loc.y, 0));
        this._childNode.setPosition(pos);

        this._moveDir = new Vec3(this._childNode.position.x, this._childNode.position.y, 0).normalize();
    }

    private _onTouchMove(event: EventTouch) {
        let posDelta = event.getDelta();
        this._childNode.setPosition(this._childNode.position.add3f(posDelta.x, posDelta.y, 0));
        
        this._moveDir = new Vec3(this._childNode.position.x, this._childNode.position.y, 0).normalize();
    }

    private _onTouchEnd(event: EventTouch) {
        this._isMoving = false;
        this._childNode.setPosition(Vec3.ZERO);
    }

    private _onTouchCancel(event: EventTouch) {
        this._isMoving = false;
        this._childNode.setPosition(Vec3.ZERO);
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
        this.targetNode.setRotationFromEuler(0, 0, -angle);
    }

    private _moveTargetNode() {
        let xDir = this._moveDir.x;
        let yDir = this._moveDir.y;
        this.targetNode.setPosition(this.targetNode.position.add3f(xDir*this.speed, yDir*this.speed, 0));

        /* 
        The following code works for the node which has same width and height.
        For the node which has different width and height should be treated specially.
        */
       
        if (this._isBorderExhisted) {
            let targetNodeUITransform: UITransform = new UITransform();
            targetNodeUITransform = this.targetNode.getComponent(UITransform)!;
            let targetNodeAnchorX = targetNodeUITransform.anchorX!;
            let targetNodeAnchorY = targetNodeUITransform.anchorY!;
            let targetNodeWidth = targetNodeUITransform.width;
            let targetNodeHeight = targetNodeUITransform.height;

            if (this.targetNode.position.x > this._canvasUITransform.width/2-targetNodeWidth*(1-targetNodeAnchorX)) {
                this.targetNode.setPosition(this._canvasUITransform.width/2-targetNodeWidth*(1-targetNodeAnchorX), this.targetNode.position.y, 0);
            }
            else if (this.targetNode.position.x < -this._canvasUITransform.width/2+targetNodeWidth*targetNodeAnchorX) {
                this.targetNode.setPosition(-this._canvasUITransform.width/2+targetNodeWidth*targetNodeAnchorX, this.targetNode.position.y, 0);
            }

            if (this.targetNode.position.y > this._canvasUITransform.height/2-targetNodeHeight*(1-targetNodeAnchorY)) {
                this.targetNode.setPosition(this.targetNode.position.x, this._canvasUITransform.height/2-targetNodeHeight*(1-targetNodeAnchorY), 0);
            }
            else if (this.targetNode.position.y < -this._canvasUITransform.height/2+targetNodeHeight*targetNodeAnchorY) {
                this.targetNode.setPosition(this.targetNode.position.x, -this._canvasUITransform.height/2+targetNodeHeight*targetNodeAnchorY);
            }
        }
    }

    setTargetNode(targetNode: Node) {
        this.targetNode = targetNode;
    }

    setSpeed(speed: number) {
        this.speed = speed;
    }

    setBorder() {
        this._isBorderExhisted = true;
    }

    clearBorder() {
        this._isBorderExhisted = false;
    }

    update (deltaTime: number) {
        this._limitChildNode();

        if (this._isMoving) {
            this._rotateTargetNode();
            this._moveTargetNode();
        }
    }
}
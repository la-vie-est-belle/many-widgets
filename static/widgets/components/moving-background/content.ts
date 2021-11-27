
import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWMovingBackground')
export class MWMovingBackground extends Component {
    @property
    moveSpeed: number = 100;

    private _bg1: Node = null!;
    private _bg2: Node = null!;
    private _bgWidth: number = 0;
    private _isMoving: boolean = false;
    private _triggerX: number = 0;

    start () {
        this._init();
        this.move();
    }

    _init() {
        this._changeLayer();
        this._setBgNode();
        this._setTrigger();
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

    private _setBgNode() {
        this._bg1 = this.node.children[0];
        this._bg2 = this.node.children[1];

        // bg1 and bg2 should have the same width.
        this._bgWidth = this._bg1.getComponent(UITransform)?.contentSize.width!;

        this._bg1.setPosition(0, 0, 0);

        // set position. BGs are moving from right to left, so bg2 should be put on the rigth of bg1
        this._bg2.setPosition(this._bg1.position.x+this._bgWidth, this._bg1.position.y, 0);
    }

    private _setTrigger() {
        this._triggerX = -this._bg1.getComponent(UITransform)?.contentSize.width!;
    }

    move() {
        this._isMoving = true;
    }

    setMoveSpeed(speed: number) {
        this.moveSpeed = speed;
    }

    stop() {
        this._isMoving = false;
    }

    private _moveBackground(dt: number) {
        // move
        this._bg1.setPosition(this._bg1.position.x-dt*this.moveSpeed,
                              this._bg1.position.y, 0);
        this._bg2.setPosition(this._bg2.position.x-dt*this.moveSpeed,
                              this._bg2.position.y, 0);
            
        // reset position
        if (this._bg1.position.x <= this._triggerX) {
            this._bg1.setPosition(this._bg2.position.x+this._bgWidth, this._bg1.position.y, 0);
        }
        else if (this._bg2.position.x <= this._triggerX) {
            this._bg2.setPosition(this._bg1.position.x+this._bgWidth, this._bg2.position.y, 0);
        }
    }

    update(deltaTime: number) {
        if (this._isMoving) {
            this._moveBackground(deltaTime);
        }
    }
}

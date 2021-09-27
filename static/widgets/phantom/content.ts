
import { _decorator, Component, Node, RenderTexture, UITransform, Camera, ImageAsset, Sprite, SpriteFrame, Vec3, instantiate, Color, Tween, TweenSystem, tween, find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWPhantom')
export class MWPhantom extends Component {
    @property({type: Node})
    target: Node | null = null;

    private _phantom1: Node = new Node();
    private _phantom2: Node = new Node();
    private _phantom3: Node = new Node();
    private _phantom4: Node = new Node();
    private _phantom5: Node = new Node();
    private _phantom1Tween = new Tween();
    private _phantom2Tween = new Tween();
    private _phantom3Tween = new Tween();
    private _phantom4Tween = new Tween();
    private _phantom5Tween = new Tween();
    private _isFinished1 = true;
    private _isFinished2 = true;
    private _isFinished3 = true;
    private _isFinished4 = true;
    private _isFinished5 = true;
    private _phantomArray: Node[] = [];
    private _phantomTweenArray: any[] = [];
    private _statusArray = [this._isFinished1, this._isFinished2, this._isFinished3, this._isFinished4, this._isFinished5];

    onLoad() {
        this._init();
    }

    start () {
    }

    private _init() {
        this._addNodes();
        this._setOpacity();
    }

    private _addNodes() {
        if (!this.target) {
            return;
        }
        
        this._phantom1 = instantiate(this.target);
        this._phantom2 = instantiate(this.target);
        this._phantom3 = instantiate(this.target);
        this._phantom4 = instantiate(this.target);
        this._phantom5 = instantiate(this.target);
        this._phantomArray = [this._phantom1, this._phantom2, this._phantom3, this._phantom4, this._phantom5];
        this._phantomTweenArray = [this._phantom1Tween, this._phantom2Tween, this._phantom3Tween, this._phantom4Tween, this._phantom5Tween];

        for (let i=0; i<this._phantomArray.length; i++) {
            this.node.parent!.addChild(this._phantomArray[i]);
            this._phantomArray[i].setSiblingIndex(this.target.getSiblingIndex());
        }
    }

    private _setOpacity() {
        /*
        Different codes are used to set the opacity of UI_2D and UI_3D.
        */
        if (!this.target) {
            return;
        }

        if (this.target.layer == (1 << 25)) {
            let sprite = new Sprite();
            for (let i=0; i<this._phantomArray.length; i++) {
                sprite = this._phantomArray[i].getComponent(Sprite)!;
                sprite.color = new Color(255, 255, 255, 255-(i+1)*30)
            }
        }
        else {
            // to be finished
        }
    }

    private _movePhantom(targetPosition: Vec3) {
        /* 
        Use tween to move phantoms to target.
        */
        for (let i=0; i<this._phantomTweenArray.length; i++) {
            if (this._statusArray[i]) {
                this._statusArray[i] = false;
                this._phantomTweenArray[i] = tween(this._phantomArray[i])
                                            .to((i*0.02), {position: targetPosition}, {easing: 'sineInOut'})
                                            .call(()=>{this._statusArray[i]=true})
                                            .start();
            }
        }
    }

    show() {
        for (let i=0; i<this._phantomArray.length; i++) {
            this._phantomArray[i].active = true;
        }
    }

    hide() {
        for (let i=0; i<this._phantomArray.length; i++) {
            this._phantomArray[i].active = false;
        }
    }

    setTarget(target: Node) {
        this.target = target;
        this._addNodes();
        this._setOpacity();
    }

    setPhantomLength() {
        /* to be finished */
    }

    update(deltaTime: number) {
        if (this.target) {
            this._movePhantom(this.target.position);
        }
    }
}


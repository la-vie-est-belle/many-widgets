
import { _decorator, Component, Node, UITransform, instantiate, tween, Vec3, Layout, Prefab, NodePool, EditBox } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWRollingNumber')
export class MWRollingNumber extends Component {
    @property({type: Prefab})
    childLayoutPrefab: Prefab = null!;

    @property
    rollTime: number = 2;

    private _numStr: string = "";
    private _numberHeight: number = 0;
    private _isOk2Roll: boolean = false;
    private _childLayoutsArray: Node[] = [];
    private _childLayoutsPool: NodePool = new NodePool();
    private _parentLayutUITransform: UITransform = new UITransform();

    start () {
        this._init();
    }

    _init() {
        /*
        Initialize the parent layout.
        */
        this._changeLayer();
        this._initParentLayout();
        this._initParentLayoutAnchorPoint();
        this._initParentLayoutUITransform();
    }

    private _changeLayer() {
        /*
        Change the layer to UI_2D
        */
        this.node.layer = 1 << 25;
    }

    private _initParentLayout() {
        /*
        Set Rolling Number Layout Type and ResizeMode to Horizontal and Container.
        */
       let layout = new Layout();
       layout = this.node.getComponent(Layout)!;
       layout.type = Layout.Type.HORIZONTAL;
       layout.resizeMode = Layout.ResizeMode.CONTAINER;
    }

    private _initParentLayoutAnchorPoint() {
        /*
        This is to make sure the new number layout will be put on the right of exhisted number layouts.
        If you want the new layout put on the left. Then set the anchor point x to 1.
        */
        let layoutUITransform = new UITransform();
        let rollingNumberLayout = this.node;

        layoutUITransform = rollingNumberLayout.getComponent(UITransform)!;
        layoutUITransform.anchorX = 0.065; // Can't be 0, or first numbet will masked.
    }

    private _initParentLayoutUITransform() {
        /*
        This method will make the cc.UITransform in Inspector useless.
        You can, delete this method as you like.
        */
        this._parentLayutUITransform = this.node.getComponent(UITransform)!;
        this._parentLayutUITransform.setContentSize(20, 50);
    }
    
    private _getNumberHeight() {
        /*
        Calculate the number height(and the point height) bewteen digits in each layout.
        */
        return this._childLayoutsArray[0].getComponent(UITransform)?.contentSize.height! / 11;
    }

    setNumber(numStr: string) {
        /*
        Add or reduce the number layouts according to the length of numStr.
        */
        this._numStr = numStr;

        if (!isNaN(Number(numStr))) {
            let diff = numStr.length - this._childLayoutsArray.length;

            if (diff > 0) {
                for(let i=0; i<diff; i++) {
                    this._spawnChildLayout();
                }
                this._refreshChildLayoutPositionX();
            }
            else if (diff < 0) {
                // remove extra child layouts
                for (let i=0; i>diff; i--) {
                    this._recycleChildLayout();
                }
                this._refreshChildLayoutPositionX();
            }

            this._isOk2Roll = true;
        }
        else {
            console.log("Not a number!");
            this._isOk2Roll = false;
        }
    }

    private _spawnChildLayout() {
        let childLayout = new Node();
        if (this._childLayoutsPool.size() > 0) {
            this._childLayoutsPool.get();
        }
        else {
            childLayout = instantiate(this.childLayoutPrefab);
        }
        this._childLayoutsArray.push(childLayout);
        this.node.addChild(childLayout);
    }

    private _recycleChildLayout() {
        this._childLayoutsPool.put(this._childLayoutsArray[this._childLayoutsArray.length-1]);
        this._childLayoutsArray[this._childLayoutsArray.length-1].removeFromParent();
        this._childLayoutsArray.splice(this._childLayoutsArray.length-1, 1);
    }

    private _refreshChildLayoutPositionX() {
        let width = this._childLayoutsArray[0].getComponent(UITransform)?.contentSize.width!;
        let posY = this._childLayoutsArray[0].position.y;

        for (let i=0; i<this._childLayoutsArray.length; i++) {
            this._childLayoutsArray[i].setPosition(i*width, posY, 0);
        }
    }

    show() {
        if (this._isOk2Roll) {
            this._roll();
        }
        else {
            console.log("Can not roll a NAN or the previous tween is not finished.")
        }
    }

    private _roll() {
        let y = 0;
        this._numberHeight = this._getNumberHeight();

        for (let i=0; i<this._numStr.length; i++) {
            if (this._numStr[i] == ".") {
                y = this._numberHeight * 10;
            }
            else {
                y = Number(this._numStr[i]) * this._numberHeight;
            }
            
            let childLayout = this._childLayoutsArray[i];
            childLayout.setPosition(childLayout.position.x, 0, 0);
            tween(childLayout).by(this.rollTime, {position: new Vec3(0, y, 0)}, {easing: "sineOut"}).start();
        }
    }

    setRollTime(seconds: number) {
        this.rollTime = seconds;
    }
}
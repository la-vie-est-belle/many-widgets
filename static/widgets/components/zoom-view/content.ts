import { _decorator, Component, SystemEventType, EventTouch, Vec3, UITransform, Node, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWZoomView')
export class MWZoomView extends Component {
    
    private _spriteNode: Node = new Node();

    private _zoomViewUITransform: UITransform = new UITransform();
    private _startPos1: Vec3 = new Vec3();
    private _startPos2: Vec3 = new Vec3();
    private _touchDis: number = 0;

    start () {
        this._init();
    }

    private _init() {
        this._changeLayer();
        this._initZoomViewUITransform();
        this._initSpriteNode();
        this._initEvents();
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

    private _initZoomViewUITransform() {
        this._zoomViewUITransform = this.node.getComponent(UITransform)!;
    }

    private _initSpriteNode() {
        this._spriteNode = this.node.children[0]!;
        
        let spriteUITransform = new UITransform();
        spriteUITransform = this._spriteNode.getComponent(UITransform)!;
        spriteUITransform?.setContentSize(this._zoomViewUITransform.contentSize.width, this._zoomViewUITransform.contentSize.height);
    }

    private _initEvents() {
        this.node.on(SystemEventType.TOUCH_START , this._onTouchStart, this);
        this.node.on(SystemEventType.TOUCH_MOVE , this._onTouchMove, this);
    }

    private _onTouchStart(e: EventTouch) {
        let touches = e.getTouches();

        if (touches.length == 2) {
            let loc1 = touches[0].getLocation();
            let loc2 = touches[1].getLocation();
            this._startPos1 = this._zoomViewUITransform.convertToNodeSpaceAR(new Vec3(loc1.x, loc1.y, 0));
            this._startPos2 = this._zoomViewUITransform.convertToNodeSpaceAR(new Vec3(loc2.x, loc2.y, 0));
            this._touchDis = Vec3.distance(this._startPos1, this._startPos2);
        }
    }

    private _onTouchMove(e: EventTouch) {
        let touches = e.getTouches();

        if (touches.length == 1) {
            let delta = e.getDelta();
            this._spriteNode.setPosition(this._spriteNode.position.add3f(delta.x, delta.y, 0));
        }
        else if (touches.length == 2) {
            let loc1 = touches[0].getLocation();
            let loc2 = touches[1].getLocation();
            let touchPoint1 = this._zoomViewUITransform.convertToNodeSpaceAR(new Vec3(loc1.x, loc1.y, 0));
            let touchPoint2 = this._zoomViewUITransform.convertToNodeSpaceAR(new Vec3(loc2.x, loc2.y, 0));
            let newTouchDis = Vec3.distance(touchPoint1, touchPoint2);
        
            /*
            On Android, e.getTouches().length in TOUCH_START is always 1,
            so to make the zoom work on Android, we need to set this_touchDis to 0.
            */
            if (!this._touchDis) {
                this._touchDis = 0;
            }

            if (newTouchDis > this._touchDis) {
                // zoom in
                this._touchDis = newTouchDis;
                this._spriteNode.setScale(this._spriteNode.scale.add3f(0.5, 0.5, 0));
            }
            else if (newTouchDis < this._touchDis) {
                // zoom out
                if (this._spriteNode.scale.x <= 1 ) {
                    this._spriteNode.setScale(1, 1, 0);
                    return;
                }

                this._touchDis = newTouchDis;
                this._spriteNode.setScale(this._spriteNode.scale.add3f(-0.5, -0.5, 0));
            }
        }
        
        this._restrictSprite();
    }

    private _restrictSprite() {
        let x = this._spriteNode.position.x;
        let y = this._spriteNode.position.y;
        let spriteWidth = this._spriteNode.getComponent(UITransform)?.contentSize.width! * this._spriteNode.scale.x;
        let spriteHeight = this._spriteNode.getComponent(UITransform)?.contentSize.height! * this._spriteNode.scale.y;
        let parentNodeWidth = this.node.getComponent(UITransform)?.contentSize.width!;
        let parentNodeHeight = this.node.getComponent(UITransform)?.contentSize.height!;

        if (x>0 && x>spriteWidth/2-parentNodeWidth/2) {
            x = spriteWidth/2-parentNodeWidth/2;
            this._spriteNode.setPosition(x, y, 0);
        }
        if (x<0 && x<parentNodeWidth/2-spriteWidth/2) {
            x = parentNodeWidth/2-spriteWidth/2;
            this._spriteNode.setPosition(x, y, 0);
        }
        if (y>0 && y>spriteHeight/2-parentNodeHeight/2) {
            y = spriteHeight/2-parentNodeHeight/2;
            this._spriteNode.setPosition(x, y, 0);
        }
        if (y<0 && y<parentNodeHeight/2-spriteHeight/2) {
            y = parentNodeHeight/2-spriteHeight/2;
            this._spriteNode.setPosition(x, y, 0);
        }
    }

    setSpriteFrame() {
        /*
        The goal is to set a sprite frame on _spriteNode,
        but as there are many ways of dynamically loading a sprite frame, 
        the decision made is to leave this method for the coders to finish.
        
        You may refer to the document: https://docs.cocos.com/creator/3.2/manual/zh/asset/dynamic-load-resources.html#
        */
    }
}

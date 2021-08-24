
import { _decorator, Component, Node, Label, UITransform, EventMouse } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWTooltip')
export class MWTooltip extends Component {

    private _nodeUITransform: UITransform = new UITransform();
    private _label: Node = new Node();
    private _labelComponent: Label = new Label();
    private _canvasWidth: number = 0;
    private _isMobile: Boolean = false;
    private _tooltipsArray: any[] = [];

    onLoad() {
        this._init();
    }

    start () {
    }

    private _init() {
        this._initNode();
        this._getSystem();
    }

    private _initNode() {
        let canvas = this.node.parent;
        let canvasUITransform = canvas?.getComponent(UITransform)!;
        this._canvasWidth = canvasUITransform.contentSize.width;

        this.node.setSiblingIndex(100000);
        this.node.setPosition(100000, 100000, 0);
        this._nodeUITransform = this.node.getComponent(UITransform)!;

        this._label = this.node.children[0];
        this._labelComponent = this._label.getComponent(Label)!;
    }

    private _getSystem() {
        if (navigator.userAgent.match(/(iPhone|iPod|Android|ios|iPad)/i)) {
            this._isMobile = true;
        }
    }

    setTooltip(targetNode: Node, str: string) {
        if (!this._isMobile) {
            targetNode.on(Node.EventType.MOUSE_ENTER, this._showTooltip, this);
            targetNode.on(Node.EventType.MOUSE_LEAVE, this._hideTooltip, this);
        }
        else {
            targetNode.on(Node.EventType.TOUCH_START, this._showTooltip, this);
            targetNode.on(Node.EventType.TOUCH_CANCEL, this._hideTooltip, this);
            targetNode.on(Node.EventType.TOUCH_END, this._hideTooltip, this);
        }

        this._tooltipsArray.push({"nodeUUID": targetNode.uuid, "tooltip": str});
    }

    cancelTooltip(targetNode: Node) {
        if (!this._isMobile) {
            targetNode.off(Node.EventType.MOUSE_ENTER, this._showTooltip, this);
            targetNode.off(Node.EventType.MOUSE_LEAVE, this._hideTooltip, this);
        }
        else {
            targetNode.off(Node.EventType.TOUCH_START, this._showTooltip, this);
            targetNode.off(Node.EventType.TOUCH_CANCEL, this._hideTooltip, this);
            targetNode.off(Node.EventType.TOUCH_END, this._hideTooltip, this);
        }

        for (let i=0; i<this._tooltipsArray.length; i++) {
            if (this._tooltipsArray[i].nodeUUID == targetNode.uuid) {
                this._tooltipsArray.splice(i, 1);
            }
        }
    }

    private _showTooltip(event: EventMouse) {
        let targetNode: any = event.currentTarget!;
        this._setTooltipPosition(targetNode);
        this._setTooltipLabel(targetNode);
    }

    private _hideTooltip(event: EventMouse) {
        this.node.setPosition(100000, 100000, 0)
    }

    private _setTooltipLabel(targetNode: Node) {
        for (let i=0; i<this._tooltipsArray.length; i++) {
            if (this._tooltipsArray[i].nodeUUID == targetNode.uuid) {
                this._labelComponent.string = this._tooltipsArray[i].tooltip;
                break;
            }
        }
    }

    private _setTooltipPosition(targetNode: Node) {
        let targetNodeX = targetNode.position.x;
        let targetNodeY = targetNode.position.y;
        let targetNodeHeight = targetNode.getComponent(UITransform)?.contentSize.height!;
        
        let offset = 10;

        if (targetNodeY > 0) {
            this.node.setPosition(targetNodeX, targetNodeY-targetNodeHeight-offset);
        }
        else {
            this.node.setPosition(targetNodeX, targetNodeY+targetNodeHeight+offset);
        }

        let tooltipNodeX = this.node.position.x;
        let tooltipNodeWidth = this._nodeUITransform.contentSize.width!;

        
        if ((tooltipNodeX + tooltipNodeWidth/2) > this._canvasWidth/2) {
            let extraX = (tooltipNodeX + tooltipNodeWidth/2) - this._canvasWidth/2;
            this.node.setPosition(tooltipNodeX-extraX-offset, this.node.position.y);
        }
        else if ((tooltipNodeX - tooltipNodeWidth/2) < -this._canvasWidth/2) {
            let extraX = (tooltipNodeX - tooltipNodeWidth/2) + this._canvasWidth/2;
            this.node.setPosition(tooltipNodeX-extraX+offset, this.node.position.y);
        }
    }
}
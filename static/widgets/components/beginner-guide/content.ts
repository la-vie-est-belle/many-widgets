
import { _decorator, Component, Node, find, Label, UITransform, Sprite, Color, Mask, assetManager, ImageAsset, SpriteFrame, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWBeginnerGuide')
export class MWBeginnerGuide extends Component {

    private _guideStep: number = 0;
    private _instructionsArray: string[] = [];
    private _clickNodesArray: Node[] = [];
    private _isGuideOver: boolean = false;
    private _background: Node = new Node();
    private _instruction: Node = new Node();
    private _instructionLabelComponent: Label = new Label();
    private _maskUITransform: UITransform = new UITransform();
    private _canvasUITransform: UITransform = new UITransform();

    onLoad() {
        this._init();
    }

    start() {

    }

    private _init() {
        this._changeLayer();
        this._initNode();
    }

    private _initNode() {
        this._initGuideNode();
        this._initCanvasNode();
        this._initBackgroundNode();
        this._initInstructionNode();
    }

    private _initGuideNode() {
        this._maskUITransform = this.node.getComponent(UITransform)!;
        
        let maskCompo = new Mask();
        maskCompo = this.node.getComponent(Mask)!;
        maskCompo.inverted = true;
    }

    private _initCanvasNode() {
        let canvas = this.node.parent;
        this._canvasUITransform = canvas?.getComponent(UITransform)!;
    }

    private _initBackgroundNode() {
        this._background = this.node.children[0];

        let canvasWidth = this._canvasUITransform.contentSize.width!;
        let canvasHeight = this._canvasUITransform.contentSize.height!;
        let bgUITransform = this._background.getComponent(UITransform)!;
        bgUITransform.setContentSize(canvasWidth*2, canvasHeight*2);

        let bgSprite = this._background.getComponent(Sprite)!;
        bgSprite.color = new Color(53, 49, 49, 125);
    }

    private _initInstructionNode() {
        this._instruction = this.node.children[1];
        this._instructionLabelComponent = this._instruction.getComponent(Label)!;
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

    private _setInstruction(str: string) {
        this._instructionLabelComponent.string = str;
    }

    private _moveToClickNode(clickNode: Node) {
        let clickNodePos = clickNode.position;
        this.node.setPosition(clickNodePos);

        let clickNodeUITransform = clickNode.getComponent(UITransform)!;
        let clickNodeWorldPos = this._canvasUITransform.convertToWorldSpaceAR(clickNode.position);
        let clickNodeWidth = clickNodeUITransform.contentSize.width!;
        let clickNodeHeight = clickNodeUITransform.contentSize.height!;

        /*
        The mask's width and height are a little bigger than those of the click node.
        */
        this._maskUITransform.setContentSize(clickNodeWidth*1.2, clickNodeHeight*1.2);

        /*
        Set Instruction's position.
        If y coordinate of the click node is smaller than 0, then place the typer higher than the click node.
        Otherwise, place it lower than it.
        */
        if (clickNode.position.y < 0) {
            this._instruction.setWorldPosition(clickNodeWorldPos.add3f(0, clickNodeHeight*1.5, 0));
        }
        else {
            this._instruction.setWorldPosition(clickNodeWorldPos.subtract3f(0, clickNodeHeight*1.5, 0));
        }
    }

    private _moveToNextStep() {
        this._guideStep++;

        if (this._guideStep <= this._clickNodesArray.length) {
            this._playOneStep();
        }
        else {
            this._finishGuide();
        }
    }

    private _playOneStep() {
        /*
        Play one step of the guide.
        */
        this._setInstruction(this._instructionsArray[this._guideStep-1]);
        this._moveToClickNode(this._clickNodesArray[this._guideStep-1]);
    }

    private _finishGuide() {
        /*
        Once the guide is over, all the click nodes should cancel the listener.
        */
        for (let i=0; i<this._clickNodesArray.length; i++) {
            this._clickNodesArray[i].off(Node.EventType.TOUCH_START, this._moveToNextStep, this);
       }
       this.hide();
    }

    show() {
        /*
        Show the guide.
        */
        this._guideStep = 1;
        this.node.active = true;
        this._playOneStep();
    }

    hide() {
        /*
        Hide the guide.
        */
       this.node.active = false;
    }

    setClickNodes(nodePathArray: string[]) {
        /*
        Set the paths of the nodes that need clicking.
        */
       for (let i=0; i<nodePathArray.length; i++) {
            let clickNode = find(nodePathArray[i])!;
            this._clickNodesArray.push(clickNode);
            clickNode.on(Node.EventType.TOUCH_START, this._moveToNextStep, this);
       }
    }

    setInstructions(instructionsArray: string []) {
        /*
        Set the instructions.
        */
       this._instructionsArray = instructionsArray;
    }

    isGuideOver() {
        /*
        Returns true if the beginner guidance is over. Otherwises, returns false.
        */
       return this._isGuideOver;
    }
}

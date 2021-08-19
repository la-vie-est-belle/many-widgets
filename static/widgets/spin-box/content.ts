
import { _decorator, Component, Node, Button, Label, EditBox } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWSpinBox')
export class MWSpinBox extends Component {
    @property
    step: number = 1;

    @property
    minValue: number = 0;

    @property
    maxValue: number = 99999;

    private _currtentNum: number = 0;
    private _spinTextLabel: Node = new Node();
    private _spinLabelComponent: Label = new Label();
    private _upBtn: Node = new Node();
    private _downBtn: Node = new Node();

    start () {
        this._init();
    }

    private _init() {
        this._initNode();
        this._initEvent();
        this._initLabelComponent();
    }

    private _initNode() {
        let editBox = this.node.children[0];
        editBox.on(EditBox.EventType.TEXT_CHANGED, this._checkText, this);
        
        this._spinTextLabel = editBox.children[0];
        this._upBtn = this.node.children[1].children[0];
        this._downBtn = this.node.children[1].children[1];
    }

    private _initEvent() {
        this._upBtn.on(Button.EventType.CLICK, this._addNum, this);
        this._downBtn.on(Button.EventType.CLICK, this._minusNum, this);
    }

    private _initLabelComponent() {
        this._spinLabelComponent = this._spinTextLabel.getComponent(Label)!;
    }

    private _addNum() {
        this._currtentNum += this.step;
        if (this._currtentNum > this.maxValue) {
            this._currtentNum = this.maxValue
        }
        this._spinLabelComponent.string = this._currtentNum.toString();
    
    }

    private _minusNum() {
        this._currtentNum -= this.step;
        if (this._currtentNum < this.minValue) {
            this._currtentNum = this.minValue
        }

        this._spinLabelComponent.string = this._currtentNum.toString();
    }

    private _checkText() {
        let num = Number(this._spinLabelComponent.string);
        if (!isNaN(num)) {
            if (num<this.maxValue && num > this.minValue) {
                this._currtentNum = num;
            }        
        }

        this._spinLabelComponent.string = this._currtentNum.toString();
    }

    setValue(num: number) {
        this._currtentNum = num;
        this._spinLabelComponent.string = this._currtentNum.toString();
    }

    setMaxValue(num: number) {
        this.maxValue = num;
    }

    setMinValue(num: number) {
        this.minValue = num;
    }

    setSingleStep(num: number) {
        this.step = num;
    }
}

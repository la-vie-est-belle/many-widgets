
import { _decorator, Component, Node, Label, instantiate, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWComboBox')
export class MWComboBox extends Component {
    private _itemsTextArray: string[] = [];

    private _openSign: string = "v";
    private _closeSign: string = "<";
    private _currentLabel: Node = new Node();
    private _btnSign: Node = new Node();
    private _scrollView: Node = new Node();
    private _content: Node = new Node();
    private _item: Node = new Node();

    onLoad() {
        this._init();
    }

    start () {

    }

    private _init() {
        this._initChildNode();
        this._initEvent();
    }

    private _initChildNode() {
        /*
        Adjustment on the children hierarchy of MW ComboBox is not recommended.
        */
        this._currentLabel = this.node.children[0];
        this._btnSign = this.node.children[1];
        this._scrollView = this.node.children[2];
        this._content = this._scrollView.children[0].children[0];
        this._item = instantiate(this._content.children[0]);
        this._content.removeAllChildren();
    }

    private _initEvent() {
        this.node.on(Button.EventType.CLICK, this._openCloseComboBox, this);
    }

    private _bugFix() {
        /*
        Don't know why the items crowd together when _scrollView shows at the first time, 
        but it get normal when _scrollView hides and shows again.

        The solution is to first let _scrollView show and hide for one time. 
        However, this action can be noticed. You will see the blink of _scrollVien when the project starts.
        */
       this.scheduleOnce(()=>{this._scrollView.active=true;}, 0.1);
       this.scheduleOnce(()=>{this._scrollView.active=false;}, 0.2);
    }

    setItems(stringArray: string[]) {
        this._recycle();
        this._itemsTextArray = stringArray;

        this.setCurrentText(this._itemsTextArray[0]);
        this._spawnItems();

        this._bugFix();
    }

    private _recycle() {
        /*
        Delete all children of _content node.
        */
        this._itemsTextArray = [];
        this._content.removeAllChildren();
    }

    private _spawnItems() {
        for(let i=0; i<this._itemsTextArray.length; i++) {
            let item = new Node();
            item = instantiate(this._item);
            this._content.addChild(item);
            this._setItemText(item, this._itemsTextArray[i]);
            item.on(Button.EventType.CLICK, this._itemClicked, this);
        }
    }

    private _setItemText(item: Node, text: string) {
        let label = new Label();
        label = item.children[0].getComponent(Label)!;
        label.string = text;
    }

    private _openCloseComboBox() {
        if (this._scrollView.active) {
            this._scrollView.active = false;
            
            let label = new Label();
            label = this._btnSign.getComponent(Label)!;
            label.string = this._closeSign;
        }
        else {
            this._scrollView.active = true;

            let label = new Label();
            label = this._btnSign.getComponent(Label)!;
            label.string = this._openSign;
        }
    }

    getCurrentText() {
        return this._currentLabel.getComponent(Label)?.string;
    }

    setCurrentText(text: string) {
        let label = new Label();
        label = this._currentLabel.getComponent(Label)!;
        label.string = text;
    }

    setOpenSign(sign: string) {
        this._openSign = sign;
    }

    setClosedSign(sign: string) {
        this._closeSign = sign;
    }

    _itemClicked(button: Button) {
        let currentLabel = this._currentLabel.getComponent(Label)!;
        currentLabel.string = button.node.children[0].getComponent(Label)!.string;

        this._openCloseComboBox();
    }
}

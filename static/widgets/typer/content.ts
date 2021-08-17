import { _decorator, Component, Label, CCFloat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWTyper')
export class MWTyper extends Component {
    @property({type: CCFloat})
    scheduleInterval: number = 0.1;

    private _label: Label = new Label();
    private _defaultString: string = '';
    private _scheduleCount: number = 0;

    start() {
        this._init();
        this.show();
    }

    private _init() {
        this._changeLayer();
    }

    private _changeLayer() {
        /*
        Change the layer to UI_2D
        */
        this.node.layer = 1 << 25;
    }

    show() {
        this._label = this.node.getComponent(Label)!;
        this._defaultString = this._label.string;
        this._label.string = '';

        this.schedule(this._typing, 
                    this.scheduleInterval, 
                    this._defaultString.length-1);
    }

    hide() {
        this.unschedule(this._typing);
        this.node.active = false;
    }

    setScheduleInterval(seconds: number) {
        this.scheduleInterval = seconds;
    }

    private _typing () {
        this._label.string += this._defaultString[this._scheduleCount];
        this._scheduleCount++;
    }
}
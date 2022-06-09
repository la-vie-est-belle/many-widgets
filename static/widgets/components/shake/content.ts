import { _decorator, Component, Node, Tween, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('MW_Shake')
export class MW_Shake extends Component {
    private _originalPos: Vec3 = new Vec3();
    private _shakeXTween = new Tween();
    private _shakeYTween = new Tween();
    private _shakeXYTween = new Tween();

    start() {
    }

    private _shakeX(target: Node, duration: number, offset: number, repeat: number) {
        this._shakeXTween = new Tween(target)
                            .to((duration/7), {position: new Vec3(target.position).add3f(offset+1, 0, 0)}, {easing: "sineInOut"})
                            .to((duration/7), {position: new Vec3(target.position).add3f(-offset*2-2, 0, 0)},  {easing: "sineInOut"})
                            .to((duration/7), {position: new Vec3(target.position).add3f(offset*3+3, 0, 0)},  {easing: "sineInOut"})
                            .to((duration/7), {position: new Vec3(target.position).add3f(-offset*4-4, 0, 0)},  {easing: "sineInOut"})
                            .to((duration/7), {position: new Vec3(target.position).add3f(offset*3+3, 0, 0)},  {easing: "sineInOut"})
                            .to((duration/7), {position: new Vec3(target.position).add3f(-offset*2-2, 0, 0)},  {easing: "sineInOut"})
                            .to((duration/7), {position: new Vec3(target.position).add3f(offset+1, 0, 0)}, {easing: "sineInOut"})
                            .call(()=>{this.node.setPosition(this._originalPos);})
                            .union();
        
        if (repeat == -1) {
            this._shakeXTween.repeatForever().start();
        }
        else {
            this._shakeXTween.repeat(repeat).start();
        }
    }

    private _shakeY(target: Node, duration: number, offset: number, repeat: number) {
        this._shakeYTween = new Tween(target)
                            .to((duration/7), {position: new Vec3(target.position).add3f(0, offset+1, 0)}, {easing: "sineInOut"})
                            .to((duration/7), {position: new Vec3(target.position).add3f(0, -offset*2-2, 0)},  {easing: "sineInOut"})
                            .to((duration/7), {position: new Vec3(target.position).add3f(0, offset*3+3, 0)},  {easing: "sineInOut"})
                            .to((duration/7), {position: new Vec3(target.position).add3f(0, -offset*4-4, 0)},  {easing: "sineInOut"})
                            .to((duration/7), {position: new Vec3(target.position).add3f(0, offset*3+3, 0)},  {easing: "sineInOut"})
                            .to((duration/7), {position: new Vec3(target.position).add3f(0, -offset*2-2, 0)},  {easing: "sineInOut"})
                            .to((duration/7), {position: new Vec3(target.position).add3f(0, offset+1, 0)}, {easing: "sineInOut"})
                            .call(()=>{this.node.setPosition(this._originalPos);})
                            .union();
        
        if (repeat == -1) {
            this._shakeYTween.repeatForever().start();
        }
        else {
            this._shakeYTween.repeat(repeat).start();
        }
    }

    private _shakeXY(target: Node, duration: number, offset: number, repeat: number = 1) {
        this._shakeXYTween = new Tween(target)
                            .to((duration/14), {position: new Vec3(target.position).add3f(offset+1, 0, 0)}, {easing: "sineInOut"})
                            .to((duration/14), {position: new Vec3(target.position).add3f(0, offset+1, 0)}, {easing: "sineInOut"})
                            .to((duration/14), {position: new Vec3(target.position).add3f(0, -offset*2-2, 0)},  {easing: "sineInOut"})
                            .to((duration/14), {position: new Vec3(target.position).add3f(-offset*2-2, 0, 0)},  {easing: "sineInOut"})
                            .to((duration/14), {position: new Vec3(target.position).add3f(offset*3+3, 0, 0)},  {easing: "sineInOut"})
                            .to((duration/14), {position: new Vec3(target.position).add3f(0, offset*3+3, 0)},  {easing: "sineInOut"})
                            .to((duration/14), {position: new Vec3(target.position).add3f(0, -offset*4-4, 0)},  {easing: "sineInOut"})
                            .to((duration/14), {position: new Vec3(target.position).add3f(-offset*4-4, 0, 0)},  {easing: "sineInOut"})
                            .to((duration/14), {position: new Vec3(target.position).add3f(0, offset*3+3, 0)},  {easing: "sineInOut"})
                            .to((duration/14), {position: new Vec3(target.position).add3f(offset*3+3, 0, 0)},  {easing: "sineInOut"})
                            .to((duration/14), {position: new Vec3(target.position).add3f(0, -offset*2-2, 0)},  {easing: "sineInOut"})
                            .to((duration/14), {position: new Vec3(target.position).add3f(-offset*2-2, 0, 0)},  {easing: "sineInOut"})
                            .to((duration/14), {position: new Vec3(target.position).add3f(0, offset+1, 0)}, {easing: "sineInOut"})
                            .to((duration/14), {position: new Vec3(target.position).add3f(offset+1, 0, 0)}, {easing: "sineInOut"})
                            .call(()=>{this.node.setPosition(this._originalPos);})
                            .union();

        if (repeat == -1) {
            this._shakeXYTween.repeatForever().start();
        }
        else {
            this._shakeXYTween.repeat(repeat).start();
        }
    }

    /*
    Shake the target.
    Pass "x" to shake to the left and right.
    Pass "y" to shake to the top and bottom.
    Pass "xy" to shake in all directions.
    */
    shake(target: Node, duration: number = 0.5, offset: number = 5, repeat: number = 1,  direction: string = "x") {
        this._originalPos = target.position; 

        if (direction.toLowerCase() == "x") {
            this._shakeX(target, duration, offset, repeat);
        }
        else if (direction.toLowerCase() == "y") {
            this._shakeY(target, duration, offset, repeat)
        }
        else if (direction.toLowerCase() == "xy") {
            this._shakeXY(target, duration, offset, repeat);
        }
    }

    stopShaking() {
        this._shakeXTween.stop();
        this._shakeYTween.stop();
        this.node.setPosition(this._originalPos);
    }
}
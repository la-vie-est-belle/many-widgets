import { _decorator, Component, Node, Vec3, Vec2 } from 'cc';
const { ccclass } = _decorator;

@ccclass('MW2DFollow2D')
export class MW2DFollow2D extends Component {
    private _speed: number = 100;
    private _target: Node | null = null;
    private _isFollowing: boolean = false;

    onLoad() {
    }

    start () {
    }

    setTarget(target: Node) {
        this._target = target
    }

    setSpeed(value: number) {
        this._speed = value
    }

    startFollow(target: Node) {
        this._isFollowing = true
        this._target = target
    }

    stopFollow() {
        this._isFollowing = false
    }

    private _follow(dt: number) {
        if (!this._target) {
            return
        }

        let targetPos = this._target.position
        let nodePos = this.node.position

        let normalizeVec = new Vec3(targetPos).subtract(new Vec3(nodePos)).normalize()
        this.node.position.add3f(normalizeVec.x*this._speed*dt, normalizeVec.y*this._speed*dt, 0)

        let angle = new Vec2(0, 1).signAngle(new Vec2(normalizeVec.x, normalizeVec.y)) * 180 / Math.PI + 90;
        this.node.setRotationFromEuler(0, 0, angle)
    }

    update (deltaTime: number) {
        if (this._isFollowing) {
            this._follow(deltaTime)
        }
    }
}

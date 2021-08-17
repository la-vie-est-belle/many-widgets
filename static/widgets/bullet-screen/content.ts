
import { _decorator, Component, Node, Prefab, tween, Color, Label, UITransformComponent, NodePool, Vec3, CCFloat, instantiate, CCInteger, CCBoolean, macro } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MWBulletScreen')
export class MWBulletScreen extends Component {
    @property({type: Prefab})
    bulletScreenPrefab: Prefab = null!; 

    @property({type: CCFloat})
    spawnInterval: number = 8;

    @property({type: CCInteger})
    bulletsNum: number = 5;

    @property
    isAllowRepeated: boolean = false;

    private _bullets = ["Many Widgets", "la vie est belle", "Hello, world!", "Cocos Creator", "Bullet Screen", "Life is beautiful", "Cocos Creator 3D"];
    private _canvasUITransform: UITransformComponent = new UITransformComponent();
    private _lastIndex: number = Number.MAX_SAFE_INTEGER;
    private _bulletsPool: NodePool = new NodePool();
    private _isBulletScreenOn: boolean = true;
    private _fixedDeltaTime: number = 0;
    private _bulletsArray: Node[] = [];

    start() {
        this._init();
    }

    private _init() {
        this._initCanvasUITransform();
        this._spawnBullets()
    }

    private _initCanvasUITransform() {
        // please make sure MWBulletScreen.ts is a component of the Canvas
        this._canvasUITransform = this.node.getComponent(UITransformComponent)!;
    }

    private _spawnBullets() {
        let num = Math.round(Math.random()*this.bulletsNum);      

        for (let i=0; i<num; i++) {

            let bullet = new Node();
            if (this._bulletsPool.size() > 0) {
                bullet = this._bulletsPool.get()!;
            }
            else {
                bullet = instantiate(this.bulletScreenPrefab)!;
            }
            
            // add to Canvas and the array
            this.node.addChild(bullet);
            this._bulletsArray.push(bullet);
            
            // set random start pos y and move time
            let randomPosY = this._randomStartPosY();
            let randomMoveTime = this._randomMoveTime();
            bullet.setPosition(this._canvasUITransform.width/2+10, randomPosY, 0);

            // set bullet's content and color
            let label: Label = new Label()!;
            label = bullet.getComponent(Label)!;
            label.string = this._randomContent()!; 
            label.color = this._randomColor()!;
            
            // run the action
            tween(bullet).to(randomMoveTime, {position: new Vec3(-this._canvasUITransform.width/2-500, randomPosY, 0)})
                         .call(() => {this._recycleBullet(bullet)}).start();
        }
    }

    private _recycleBullet(bullet: Node) {
        this._bulletsPool.put(bullet);

        // delete the prefab from the array
        for (let i=0; i<this._bulletsArray.length; i++) {
            if (this._bulletsArray[i].uuid == bullet.uuid) {
                this._bulletsArray.splice(i, 1);
                break;
            }
        }
    }

    private _randomColor() {
        let red = Math.round(Math.random()*255);
        let green = Math.round(Math.random()*255);
        let blue = Math.round(Math.random()*255);
        return new Color(red, green, blue);
    }

    private _randomContent() {
        let date = new Date();
        let seed = (date.getTime()*9301+49297) % 233280 / 233280;
        let index = Math.floor(seed * this._bullets.length);

        if (index != this._bullets.length) {
            
            // no repeat
            if (!this.isAllowRepeated) {
                if (this._lastIndex != index) {
                    this._lastIndex = index;
                    return this._bullets[index];
                }
                return ""
            }

            // can repeat
            this._lastIndex = index;
            return this._bullets[index];
        }
    }

    private _randomMoveTime() {
        let moveTime = Math.round(Math.random()*12) + 12;
        return moveTime;
    }

    private _randomStartPosY() {
        let height = this._canvasUITransform.height;
        let y = (Math.round(Math.random()*height) - height/2) * 0.8;
        return y;
    }

    show() {
        this._isBulletScreenOn = true;

        for (let i=0; i<this._bulletsArray.length; i++) {
            this._bulletsArray[i].active = true;
        }
    }

    hide() {
        this._isBulletScreenOn = false;

        for (let i=0; i<this._bulletsArray.length; i++) {
            this._bulletsArray[i].active = false;
        }

        this._bulletsArray = [];
    }

    setSpawnInterval(interval: number) {
        this.spawnInterval = interval;
    }

    setBulletsNum(num: number) {
        this.bulletsNum = parseInt(num.toFixed(0));
    }

    setAllowRepeated(status: boolean) {
        this.isAllowRepeated = status;
    }

    setBullets(textArray: string[]) {
        this._bullets = textArray;
    }

    update (deltaTime: number) {
        this._fixedDeltaTime += deltaTime;
        if (this._fixedDeltaTime>this.spawnInterval && this._isBulletScreenOn) {
            this._spawnBullets();
            this._fixedDeltaTime = 0;
        }
    }
}
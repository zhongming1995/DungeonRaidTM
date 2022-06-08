const {ccclass, property} = cc._decorator;

@ccclass
export default class Flash extends cc.Component {
    @property({
        type: cc.Float,
        displayName: "持续时间",
        tooltip: "持续时间",
    })
    private duration:number = 0;

    private _median:number = 0;
    private _material:cc.Material = null;
    private _time:number = 0;

    onLoad() {
        this._median = this.duration / 2;
        // 获取材质
        if (this.node.getComponent(cc.Sprite)) {
            this._material = this.node.getComponent(cc.Sprite).getMaterial(0);
        } else {
            this._material = this.node.getComponent(sp.Skeleton).getMaterial(0);
        }
        // 设置材质对应的属性
        this._material.setProperty("u_rate", 1);
    }

    update(dt) {
        if (this._time > 0) {
            this._time -= dt;
            this._time = this._time < 0 ? 0 : this._time;
            let rate = Math.abs(this._time - this._median) * 2 / this.duration;
            this._material.setProperty("u_rate", rate);
        }
    }

    /** 受击*/
    hitFlash() {
        this._material.setProperty("u_color", new cc.Color(0,0,0,255));
        this._time = this.duration;
    }

    /** 冰冻*/
    setFreezeColor() {
        this._material.setProperty("u_color", new cc.Color(0,86,225,255));
        this._material.setProperty("u_rate", 0.5);
    }

    /**火烧 */
    setFireColor(){
        this._material.setProperty("u_color", new cc.Color(0,210,44,44));
        this._time = 0.1;
    }

    clear() {
        this._material.setProperty("u_color", new cc.Color(255,255,255,255));
        this._material.setProperty("u_rate", 1);
    }
}

import { app } from "../../app";
import Util from "../../core/utils/Util";
import Enemy from "../Enemy";
import Player from "../role/Player";
import { JsonModule } from "../../core/conf/ClientConfigMgr";
import { resLoader } from "../../core/resLoad/ResLoader";
import { BattleModeType, BoundNameEnum, EventName } from "../../Defines";
import ArrayUtil from "../../core/utils/ArrayUtil";
import QuadTree from "../../common/QuadTree ";
import ItemHelper from "../../common/ItemHelper";

interface IWaveData { //波次数据
    id:number;
    tm:number;
    curTm:number;
}


interface IFbMonsterData { //需要创建怪物数据
    pos:cc.Vec2;
    mid:number;
    fid:number;
}

const {ccclass, property} = cc._decorator;

/**
 * 刷怪机制：
 * 读取下一波时间。
 * 当前波束被全部消灭，强制下一波。
 * 存活时间到了，只要在屏幕外就直接清除。
 */
@ccclass
export default class WaveMng extends cc.Component {

    private _enemyList:Enemy[] = null;

    private _target:any = null; 

    private _fbArr:IWaveData[] = [];

    private _cTime:number;
    private _createList: IFbMonsterData[] = null;  //创建怪物列表

    public checkEnemys:Enemy[] = [];
    public quadTree:QuadTree = null;

    private _wHalf:number = 0;
    private _hHalf:number = 0;

    initial (target:Player) {

        this._target = app.gameMgr.camera;
        this._fbArr = [];
        this._enemyList = [];
        this._createList = [];
        this._cTime = 0;
 
        const size = cc.view.getVisibleSize();
        this._wHalf = size.width * 0.25 + 50;
        this._hHalf = size.height * 0.25 + 50;
     
        // if(ItemHelper.isDoubleMode()){
        //     this.startWaves();
        // }
    } 

    startWaves(){
        let cfg;
        if(ItemHelper.isDoubleMode()){ //双人模式
            cfg = app.confMgr.conf.fbconfig.getConfById(420001);
        }else{    //单人模式

            if(app.dataMgr.battleData.player1.trySuperSkill !=null){  //超武试用 
                cfg = app.confMgr.conf.fbconfig.getConfById(410001);
            }else{
                let fbConfs = app.confMgr.conf.fbconfig.getConfArr();
                cfg = fbConfs[0];
            }
        }

        this._fbArr.push({id:cfg.id,tm:cfg.fresh_cd,curTm:0});
    }

    gameUpdate (dt) {

        this._fbArr.forEach(f =>{
            f.curTm += dt;
        })
        for(let i=0;i<this._fbArr.length;i++){
            let fb = this._fbArr[i];
            if(fb.curTm > fb.tm){          
                ArrayUtil.fastRemoveAt(this._fbArr,i);
                this.freshCreateWave(fb);
                break;
            }
        }

        let rect = app.gameMgr.camera.getViewRect();
        this.quadTree = new QuadTree(rect,0);

        this.checkEnemys = [];
        this._enemyList.forEach(enemy=>{
            enemy.gameUpdate(dt);

            if(!enemy.isDie && enemy.inView){
                this.checkEnemys.push(enemy);
                this.quadTree.insert(enemy.getCollisionData());
            }
           
        })
     // console.log('this._enemyList---------',this._enemyList.length,this.checkEnemys.length,this.quadTree.objLen())
        
        //逐帧创建怪物
        if(this._createList.length > 0) {
            this._cTime += dt;
            if(this._cTime >= 0.01) {
                this._cTime = 0;
                this.createEnemy();
            }
        }
    }

    protected onEnable(): void {
        cc.systemEvent.on(EventName.gm_create_enemy,this.gmCreateEnemy,this);
    }
    gmCreateEnemy(enemyId,count,type){
        console.log("gmCreateEnemy :: ", enemyId,count,type)
        let obj = Object.create(null);
        obj.id = Math.random() > 0.5 ? 400001 : 400001;
        obj.monster_id = enemyId;
        obj.monster_num = count;
        obj.fresh_site = type;
        if(type == 20){
            //椭圆
            this.initEllipseEnemys(obj);
        }else if(type == 21){
            //生成圆形
            this.initCircleEnemy(obj);
        }
        else{
            //范围随机生成
            this.initEnemys(obj);
        }
    }
    protected onDisable(): void {
        cc.systemEvent.off(EventName.gm_create_enemy,this.gmCreateEnemy,this);
    }

    /**触发去创建一波 */
    freshCreateWave(fb:{id:number,tm:number,curTm:number}){
  
        let fbconf = app.confMgr.conf.fbconfig.getConfById(fb.id);
        if(!fbconf){
            return;
        }
        let nextIdStr:string = fbconf.next_id;
        if(nextIdStr){
            let ids = Util.splitNumber(nextIdStr);
            for(let i=0;i<ids.length;i++){
                let conf = app.confMgr.conf.fbconfig.getConfById(ids[i]);
                this._fbArr.push({id:conf.id,tm:conf.fresh_cd,curTm:0});
            }
        }
        console.log('timeToFreshWave--------',fbconf.id)

        if(fbconf.fresh_site == 20){
            this.initEllipseEnemys(fbconf);
        }else{
            this.initEnemys(fbconf);
        }
    }
    /**椭圆包围圈 */
    private initEllipseEnemys(fbconf:JsonModule.IFbconfig){
        const mIds = Util.splitNumber(fbconf.monster_id);
        const nums = Util.splitNumber(fbconf.monster_num);
        let midArr:number[] = [];
        for(let i=0;i<nums.length;i++){
            let l = nums[i],mid = mIds[i];
            for(let j =0;j<l;j++){
                midArr.push(mid);
            }
        }
        let len = midArr.length;

        var w = this._wHalf;//椭圆长
        var h = this._hHalf; //椭圆高
        var angle = 360 / len;
        var x, y;
        const point = this._target.node.getPosition();
        for (let i = 0; i < len; i++)
        {
            // Mathf.Deg2Rad 单位角度的弧 相当于 1° 的弧度
            x = w * Math.cos(i * (angle/180) * Math.PI);
            y = h * Math.sin(i * (angle/180) * Math.PI);
                

            let obj:IFbMonsterData = Object.create(null);
            obj.pos = cc.v2(x + point.x,y + point.y);
            obj.mid = midArr[i];
            obj.fid = fbconf.id;
            this._createList.push(obj)
        }
    }
    /**圆形包围圈 */
    private initCircleEnemy(fbconf:JsonModule.IFbconfig){
        const mIds = Util.splitNumber(fbconf.monster_id);
        const nums = Util.splitNumber(fbconf.monster_num);
        let midArr:number[] = [];
        for(let i=0;i<nums.length;i++){
            let l = nums[i],mid = mIds[i];
            for(let j =0;j<l;j++){
                midArr.push(mid);
            }
        }
        let len = midArr.length;
        const point = this._target.node.getPosition();
        const averageAngle = 360 / len;
        let a = 0;
        for (let i = 0; i < len; i++) {
            let r = this._hHalf + 10;//半径
            let pos = cc.v2();
            pos.x = point.x + Math.sin(a * Math.PI / 180) * r;
            pos.y = point.y + Math.cos(a * Math.PI / 180) * r;
            a += averageAngle;
            let obj:IFbMonsterData = Object.create(null);
            obj.pos = pos;
            obj.mid = midArr[i];
            obj.fid = fbconf.id;
            this._createList.push(obj)
        }
    }
    /**方形 随机生成怪物 */
    private initEnemys(fbconf:JsonModule.IFbconfig) {

        const mIds = Util.splitNumber(fbconf.monster_id);
        const nums = Util.splitNumber(fbconf.monster_num);
        let midArr:number[] = [];
        for(let i=0;i<nums.length;i++){
            let l = nums[i],mid = mIds[i];
            for(let j =0;j<l;j++){
                midArr.push(mid);
            }
        }
        //计算四边平均怪物数量
        let total = midArr.length;
        let m_idx:number =0;
        const means = [];
        if(total < 4) {
            for (let i = 0; i < total; i++) {
                means.push(1);
            }
        }else{
            const mean = Math.floor(total / 4);
            for (let i = 0; i < 4; i++) {
                total -= mean;
                means.push(mean);
            }
            for (let i = 0; i < total; i++) {
                means[i] += 1;
            }
        }

        const point = this._target.node.getPosition();
        const state = fbconf.fresh_site > 0 ? fbconf.fresh_site : 1;
        const xMin = point.x - this._wHalf / state;// / 1//Util.randomNumber(1,fbconf.fresh_site);
        const xMax = point.x + this._wHalf / state;// / 1//Util.randomNumber(1,fbconf.fresh_site);
        const yMin = point.y - this._hHalf / state;// / 1//Util.randomNumber(1,fbconf.fresh_site);
        const yMax = point.y + this._hHalf / state;// / 1//Util.randomNumber(1,fbconf.fresh_site);

        const tmpRects = [
            new cc.Vec2(xMin, yMin), 
            new cc.Vec2(xMin, yMax),
            new cc.Vec2(xMax, yMax), 
            new cc.Vec2(xMax, yMin)];
        for (let i = 0; i < means.length; i++) {
            const num = means[i];
            let pjs = i % 2 == 0 ? (yMax - yMin): (xMax - xMin);
            pjs /= num;

            for (let j = 0; j < num; j++) {
                const val = j * pjs;
                const pos:cc.Vec2 = tmpRects[i].clone();
                if(i == 0) {
                    pos.y = Util.randomNumber(pos.y,pos.y + val);
                    if(state != 1){
                        pos.x = Util.randomNumber(pos.x , pos.x + val)
                    }
                    // pos.x /= fbconf.fresh_site;
                    // if(num > 4) {
                    //     pos.x -= Math.abs(Util.randomNumber(pos.x, pos.x - 100));
                    // }
                }else if(i == 1) {
                    pos.x = Util.randomNumber(pos.x,pos.x + val);
                    if(state != 1)
                    pos.y = Util.randomNumber(pos.y,pos.y + val);
                    // pos.y /= fbconf.fresh_site;
                    // if(num > 4){
                    //     pos.y += Util.randomNumber(pos.y, pos.y + 100);
                    // }
                }else if(i == 2) {
                    pos.y = Util.randomNumber(pos.y,pos.y - val);
                    if(state != 1)
                    pos.x = Util.randomNumber(pos.x,pos.x - val);
                    // pos.x /= fbconf.fresh_site;
                    // if(num > 4){
                    //     pos.x += Util.randomNumber(pos.x, pos.x + 100);
                    // }
                }else{
                    pos.x = Util.randomNumber(pos.x,pos.x - val);
                    if(state != 1)
                    pos.y = Util.randomNumber(pos.y,pos.y - val);
                    // pos.x -= val;
                    // pos.y /= fbconf.fresh_site;
                    // if(num > 4){
                    //     pos.y -= Math.abs(Util.randomNumber(pos.y, pos.y - 100));
                    // }
                }
         
                let obj:IFbMonsterData = Object.create(null);
                obj.pos = pos;
                obj.mid = midArr[m_idx++];
                obj.fid = fbconf.id;
                this._createList.push(obj);            
            }
        }

    }
    /**方形 队列生成怪物 */
    private initEnemy(fbconf:JsonModule.IFbconfig) {

        const mIds = Util.splitNumber(fbconf.monster_id);
        const nums = Util.splitNumber(fbconf.monster_num);
        let midArr:number[] = [];
        for(let i=0;i<nums.length;i++){
            let l = nums[i],mid = mIds[i];
            for(let j =0;j<l;j++){
                midArr.push(mid);
            }
        }
        //计算四边平均怪物数量
        let total = midArr.length;
        let m_idx:number =0;
        const means = [];
        if(total < 4) {
            for (let i = 0; i < total; i++) {
                means.push(1);
            }
        }else{
            const mean = Math.floor(total / 4);
            for (let i = 0; i < 4; i++) {
                total -= mean;
                means.push(mean);
            }
            for (let i = 0; i < total; i++) {
                means[i] += 1;
            }
        }

        const point = this._target.node.getPosition();
        const xMin = point.x - this._wHalf;
        const xMax = point.x + this._wHalf;
        const yMin = point.y - this._hHalf;
        const yMax = point.y + this._hHalf;
        const tmpRects = [
            new cc.Vec2(xMin, yMin), 
            new cc.Vec2(xMin, yMax),
            new cc.Vec2(xMax, yMax), 
            new cc.Vec2(xMax, yMin)];
        for (let i = 0; i < means.length; i++) {
            const num = means[i];
            let pjs = i % 2 == 0 ? (yMax - yMin): (xMax - xMin);
            pjs /= num;

            for (let j = 0; j < num; j++) {
                const val = j * pjs;
                const pos:cc.Vec2 = tmpRects[i].clone();
                if(i == 0) {
                    pos.y += val;
                    if(num > 4) {
                        pos.x -= Math.abs(Util.randomNumber(pos.x, pos.x - 100));
                    }
                }else if(i == 1) {
                    pos.x += val;
                    if(num > 4){
                        pos.y += Util.randomNumber(pos.y, pos.y + 100);
                    }
                }else if(i == 2) {
                    pos.y -= val;
                    if(num > 4){
                        pos.x += Util.randomNumber(pos.x, pos.x + 100);
                    }
                }else{
                    pos.x -= val;
                    if(num > 4){
                        pos.y -= Math.abs(Util.randomNumber(pos.y, pos.y - 100));
                    }
                }
         
                let obj:IFbMonsterData = Object.create(null);
                obj.pos = pos;
                obj.mid = midArr[m_idx++];
                obj.fid =fbconf.id;
                this._createList.push(obj);            
            }
        }

    }
    /**创建一个怪物 */
    private createEnemy() {
        let cmonster:IFbMonsterData = this._createList.shift();
        let mCfg = app.confMgr.conf.monster.getConfById(cmonster.mid);
        
        resLoader.loadRes<cc.Prefab>(BoundNameEnum.subBattle,`monster/${mCfg.model_id}`).then(prefab=>{
            let node:cc.Node = cc.instantiate(prefab);
            this.node.addChild(node);
            node.setPosition(cmonster.pos);
            let enemy:Enemy = node.getComponent(Enemy);

            enemy.initial(this.findTarget(cmonster.pos),cmonster);
            this._enemyList.push(enemy);
        })
    }

    /**找玩家中一个 */
    findTarget(pos:cc.Vec2){
        let p1 = app.gameMgr.player,p2 = app.gameMgr.player2;
        if(!p2)return p1;
        return Math.abs(pos.x - p1.node.x)  < Math.abs(pos.x - p2.node.x)?p1:p2;
    }

    public getEnemyList() {
        return this._enemyList;
    }

    /** 怪物回收*/
    public recycleEnemy(enemy:Enemy) {
        for (let i = this._enemyList.length - 1; i >= 0; i--) {
            const tmpEnemy = this._enemyList[i];
            if(tmpEnemy == enemy) {
                enemy.node.destroy();
                this._enemyList.splice(i, 1);
                break;
            }
        }

        //没有怪物了，但是还未到刷怪时间，强制下一波
        if(this._enemyList.length == 0 && this._fbArr.length >0) {
            this._fbArr.sort((fa,fb)=>{
                return (fa.tm - fa.curTm) - (fb.tm - fa.curTm);
            })
            let fb = this._fbArr[0];
            fb.curTm = fb.tm;
        }
    }
}
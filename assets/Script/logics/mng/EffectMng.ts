
import { app } from "../../app";
import { resLoader } from "../../core/resLoad/ResLoader";
import NodePoolMgr, { PoolName } from "../../core/utils/NodePoolMgr";
import { BoundNameEnum, ColorTypes } from "../../Defines";
import FightHelper from "../FightHelper";
import FloatNum from "../FloatNum";
import RoleSkill from "../skill/RoleSkill";
import SkillBasic from "../skillEntity/SkillBasic";


const {ccclass, property} = cc._decorator;

@ccclass
export default class EffectMng{

    private static _instance:EffectMng = null;
    static get Instance() {
        if(!this._instance) {
            this._instance = new EffectMng();
        }
        return this._instance;
    }

    /**
     * 飘血
     * @param target 目标节点
     * @param val 数值
     * @param isAdd 是否加血
     */
    public playHp(target:cc.Node,val:number, isAdd:boolean=false) {
        
        let t_pos:cc.Vec2 = target.getPosition();
        if(val <0){
            FightHelper.ins.playHitEff(t_pos);
        }
   
        if(val==0){
            return;
        }
        let cb = (item:cc.Node) =>{

            item.setPosition(t_pos);
            app.gameMgr.effectCon.addChild(item);
            
            let prop:FloatNum = item.getComponent(FloatNum);
            prop.setData(val);
        }
        
        let copyItem = NodePoolMgr.ins.getItem(PoolName.FloatNum);
        if(!copyItem){
            resLoader.loadRes<cc.Prefab>(BoundNameEnum.subBattle,'FloatNum').then((pre)=>{
                copyItem = cc.instantiate(pre);
                cb(copyItem)
            })
        }else{
            cb(copyItem)
        } 

    }


    /**受击特效 */
    public playHitEff(pos:cc.Vec2) {

        let cb = (item:cc.Node) =>{

            item.setPosition(pos);
            app.gameMgr.effectCon.addChild(item);                
        }

        let effctNode = NodePoolMgr.ins.getItem(PoolName.HitEff);   
        if(!effctNode){
            resLoader.loadRes<cc.Prefab>(BoundNameEnum.subBattle,'HitEff').then((pre)=>{
                effctNode = cc.instantiate(pre);
                cb(effctNode)
            })
        }else{
            cb(effctNode)
        } 

    }

    public playReviveEff(pos:cc.Vec2) {
        resLoader.loadRes<cc.Prefab>(BoundNameEnum.subBattle,'FhEff').then(prefab=>{
            let effect:cc.Node = cc.instantiate(prefab);
            effect.parent = app.gameMgr.effectCon;
            effect.setPosition(pos);

            let anim = effect.getComponent(cc.Animation);
            anim.play();
            let func = ()=>{
                anim.off('finished', func);
                effect.destroy();
            }
            anim.on('finished', func);
        });
    }

    /**技能 */
    castSkillEff(roleSkill:RoleSkill,param:any){

        let skillConf = roleSkill.skillConf;
        let path:string = skillConf.path;
        let poolPath =  path.replace('/','');
        let effNode:cc.Node = NodePoolMgr.ins.getItem(poolPath);

        let cb = (item:cc.Node) =>{
            item.name = poolPath;
            let sb:SkillBasic = item.getComponent(SkillBasic);
            sb.init(roleSkill,param);
            item.parent = app.gameMgr.effectCon;
            roleSkill._queue.push(sb);                              
        }
     
        if(!effNode){
            resLoader.loadRes<cc.Prefab>(BoundNameEnum.subBattle,path).then((pre)=>{
                effNode = cc.instantiate(pre);
                cb(effNode)
            })
        }else{
            cb(effNode)
        } 
    }

}

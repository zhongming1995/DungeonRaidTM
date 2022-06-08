import { app } from "../app";
import ItemHelper from "../common/ItemHelper";
import { resLoader } from "../core/resLoad/ResLoader";
import NodePoolMgr, { PoolName } from "../core/utils/NodePoolMgr";
import { BattleModeType, BoundNameEnum, EventName, Item_type, PopupName, SoundName } from "../Defines";
import DropItem from "./DropItem";

export default class DropMgr  {

    static _ins:DropMgr = null;
    static get ins(){
        if(!this._ins) this._ins = new DropMgr();
        return this._ins;
    }

    /**拾取掉落物品 */
    meetDropItem(pid:number,itemId:number,isSound:boolean = true){
        let itemConf = app.confMgr.conf.item.getConfById(itemId);
        if(!itemConf){
            console.log('no exit item----------',itemId);
            return;
        }

        let tp = itemConf.item_type,funNum = itemConf.fucntion_num;
        let battleRole = app.dataMgr.battleData.getRoleData(pid);

        let sound = '';
        switch(tp){
            case Item_type.gold: //获得金币
                battleRole.addGold(funNum);
                sound = SoundName.fpx_sfx_coin_double4;
                break;

            case Item_type.exp:  //获得经验金币
                battleRole.addExp(funNum);
                sound = SoundName.fpx_ding;
                           
                break;
            case Item_type.hp: //增加血量
                battleRole.addHp(funNum);
                sound = SoundName.fpx_sfx_coin_double4;
                app.eventMgr.emit(EventName.update_state,itemConf)
                break;
            case Item_type.luckGrass: //增加幸运值
                battleRole.addLuckValue(funNum);
                sound = SoundName.fpx_sfx_coin_double4;
                break;

            case Item_type.skill:
                battleRole.addUltSkill(itemId);
                sound = SoundName.fpx_sfx_coin_double4;
                break;
            case Item_type.main_weapon:   //获得主武器技能
            case Item_type.super_weapon:
            case Item_type.sub_weapon:           
                battleRole.itemFreshSkill(itemConf);
                sound = SoundName.fpx_sfx_coin_double4;
                break;
            case  Item_type.shipin:
                battleRole.itemFreshBuffSkill(itemConf);
                sound = SoundName.fpx_sfx_coin_double4;
                break
            case Item_type.goodBox:
                if(ItemHelper.isDoubleMode()){
                    app.layerMgr.open(PopupName.DoubleOpenBoxDlg);
                }else{
                    app.layerMgr.open(PopupName.OpenBoxDlg);
                }
                sound = SoundName.fpx_sfx_coin_double4;
                break; 
        }

        if(isSound && sound){
            app.audioMgr.playEffect(sound); 
        }
        
    }

    /**
     * 
     * @param target 掉落物品
     * @param dId 掉落id
     */
    dropItem(target:cc.Node, dId:number){  
  
        let pos = target.getPosition();
        let arr = app.confMgr.conf.drop.getDropItems(dId);
        

        let cb = (item:cc.Node,i:number) =>{

            pos = pos.add(cc.v2(i*20,i*20));
            item.setPosition(pos);
            app.gameMgr.dropCon.addChild(item);
         
            let prop = item.getComponent(DropItem)
            prop.initial(arr[i].id);
        }

        for(let i=0;i<arr.length;i++){

            let copyItem = NodePoolMgr.ins.getItem(PoolName.DropItem);
            if(!copyItem){
                resLoader.loadRes<cc.Prefab>(BoundNameEnum.subBattle,'DropItem').then((pre)=>{
                    copyItem = cc.instantiate(pre);
                    cb(copyItem,i)
                })
            }else{
                cb(copyItem,i)
            }    
        }
    }

    // update (dt) {}
}

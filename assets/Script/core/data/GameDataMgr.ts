// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import { BattleModeType } from "../../Defines";
import BattleData from "../../logics/BattleData";
import BattleRoleData from "../../logics/BattleRoleData";
import AchieveProxy from "./AchieveProxy";
import PictureProxy from "./PictureProxy";
import RoleProxy from "./RoleProxy";
import SysProxy from "./SysProxy";


export default class GameDataMgr{

    roleProxy:RoleProxy = new RoleProxy('role');
    picture:PictureProxy = new PictureProxy('picture');
    achieve:AchieveProxy = new AchieveProxy('achieve');
    sys:SysProxy = new SysProxy('sys');

    //游戏中战斗需要数据

    selectRid:number = -1;
    selectMode:BattleModeType = 0;  //选择模式  
    
    battleRoleData:BattleRoleData = null;  //单人模式角色数据
    battleData:BattleData = null;
    /**本地数据初始化 */
    init(){
        
        this.sys.initRead();
        this.roleProxy.initRead();
        this.picture.initRead();
        this.achieve.initRead();
        
    }

    enterBattle(id:number,id2?:number){
        
        this.battleData = new BattleData();
        this.battleData.player1 = new BattleRoleData(id,1);

        if(id2 >0){
            this.battleData.player2  = new BattleRoleData(id2,2)
        }else{
            this.battleData.player2 = null;
        }          
        this.battleRoleData = this.battleData.player1;
        
    }
    // update (dt) {}
}
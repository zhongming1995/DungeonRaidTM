import { BoundNameEnum } from "../../Defines";
import { resLoader } from "../resLoad/ResLoader";

export enum PoolName {
    PictureItem = 'PictureItem',
    StrenthItem = 'StrenthItem',
    SkillLvItem = 'SkillLvItem',

    AchieveItem = 'AchieveItem',
    DropItem = 'DropItem',  //掉落
    FloatNum = 'FloatNum',   //飘字
    ArrowsItem = 'ArrowsItem', //宝箱箭头

    HitEff = 'HitEff',  //受击特效

    FloatTips = 'FloatTips' //飘字提示
}

/**对象池 预制件配置 */
let poolConf = {
  
}


export default class NodePoolMgr {

    private static  _ins:NodePoolMgr = null;
    _poolMap:{[k:string]:cc.NodePool} = Object.create(null);
    private prefabMap:Map<string,cc.Prefab> = new Map();
    static get ins() {    
        if(!this._ins){
            this._ins = new NodePoolMgr();
        }
        return this._ins;
    }

    /**预加载 预制件 */
    preLoadPre(cb:Function){ 
        let keys = [PoolName.HitEff,PoolName.DropItem,PoolName.FloatNum];
        let num =0;

        keys.forEach(k =>{
            let path = k;        
            resLoader.loadRes<cc.Prefab>(BoundNameEnum.subBattle,path).then((res)=>{
                if(res){
                    for(let i=0;i<20;i++){
                        this.putItem(k,cc.instantiate(res))
                    }
                }            
                num ++;
                if(num == keys.length){
                     cb&& cb();
                }
            })
        })
        
    }


    getItem(tp:string){

        let pool = this.getPool(tp);
        let item =  pool.get();
        if(item){
            return item;
        }
        let pre:cc.Prefab = this.prefabMap.get(tp);
        return pre? cc.instantiate(pre):null;
    }

    /**回收 */
    putItem(tp:string,item:cc.Node | cc.Node[]){
        if(!item){
            return console.warn('pool recycle item is null');
        }
        let pool = this.getPool(tp);
        if(!(item instanceof Array)){
            pool.put(item);
        }else{
            for(let i =item.length -1;i>=0;i--){
                pool.put(item[i]);
            }
        }       
    }

    private getPool(name:string){
        let pool = this._poolMap[name];
        if(!pool){
            pool = new cc.NodePool(name);
            this._poolMap[name] = pool;
        }
        return pool;
    }
    // update (dt) {}
}

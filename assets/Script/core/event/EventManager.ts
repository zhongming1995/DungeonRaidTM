import ArrayUtil from "../utils/ArrayUtil";

interface EventInfo {
    func:Function;
    target:any;
}

class EventInfoList {
    infos:EventInfo[] = null;
    constructor(){
        this.infos = [];
    }

    has(cb:Function,target:any){
        if(this.infos.length <=0){
            return false;
        }
        for(let i =0;i<this.infos.length;i++){
            if(this.infos[i].func === cb && this.infos[i].target === target){
                return true;
            }
        }
        return false;
    }
    /**
     * 添加事件
     * @param cb  回调
     * @param target 目标
     */
    add(cb:Function,target:any){
        if(this.has(cb,target)){
            console.log('event repeat--------')
            return;
        }
        let info = Object.create(null);
        info.func = cb;
        info.target = target;

        this.infos.push(info);
    }

    /**移除指定 */
    remove(cb:Function,target:any){

        if(this.infos.length <=0){
            return;
        }
        for(let i =0;i<this.infos.length;i++){
            if(this.infos[i].func === cb && this.infos[i].target === target){
                ArrayUtil.fastRemoveAt(this.infos,i);
                break;
            }
        }
    }
    /**移除目标所有 */
    removeByTarget(target:any){
        if(this.infos.length <=0){
            return;
        }

        for(let i =0;i<this.infos.length;i++){
            if(this.infos[i].target === target){
                ArrayUtil.fastRemoveAt(this.infos,i);
                i--;
            }
        }  
    }

     /**移除所有 */
    removeAll(){
        this.infos.forEach(info =>{
            info.func = null;
            info.target = null;
        })
        this.infos = [];
    }

}

export class EventManager {
   private _evtMap:{[k:string]:EventInfoList} = Object.create(null);
   on(evtType:string,cb:Function,target?:any){
       let list =  this._evtMap[evtType];
       if(!list){
           list = new EventInfoList();
           this._evtMap[evtType] = list;
       }
       list.add(cb,target);
   }

   emit(evtType:string,...params:any){
        let list = this._evtMap[evtType];
        if(!list || list.infos.length <=0){
            return;
        }
        for(let i=0;i<list.infos.length;i++){
            let info = list.infos[i];
            if(info.func){
                info.func.apply(info.target,params);
            }
        }
    }

    /**移除 指定*/
    off(evtType:string,cb:Function,target?:any){
        let list =  this._evtMap[evtType];
        if(!list)return;
        list.remove(cb,target);
    }

    /**事件名或目标移除 */
    offByKeyOrTarget(key:string | Object){
        let list:EventInfoList = null;
        if(typeof key == 'string'){
            list = this._evtMap[key];
            if(list){
               list.removeAll();            
            }
        }else{

            for(let k in this._evtMap){
                list = this._evtMap[k];
                list.removeByTarget(key);
            }
        }
    }

}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */

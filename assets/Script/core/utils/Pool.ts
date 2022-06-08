
export default class Pool {

    private _count:number =0;
    private _cleanFun:Function =null;
    private _items:any[];
    /**
     * 
     * @param size   -1 不限制个数
     * @param cleanFun 
     */
    constructor(size:number,cleanFun:Function = null){
        
        this._items = new Array(size);
        this._count =0;
        this._cleanFun = cleanFun;
       
    }

    count(){
        return this._count;
    }

    putItem(item):boolean{   
        if(this._count == this._items.length ){
            return false;
        }  
        this._items[this._count]= item;
        ++ this._count;
        this._cleanFun && this._cleanFun(item);
    }

    getItem(){
        if(this._count >0){
            --this._count;
            let item = this._items[this._count];
            this._items[this._count] = null;
            return item;
        }
        return null;
    }
    /**
     * 
     * @param len 重新更改大小
     * @returns 
     */
    resize(len:number){
        if(len<0) return;
        this._items.length = len;
        if(this._count > len){
            this._count = len;
        }  
    }

}

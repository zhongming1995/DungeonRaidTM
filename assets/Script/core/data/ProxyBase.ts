import LocalStorage from "../utils/LocalStorage";

export default class ProxyBase<K>{

    _k:string = '';  //默认保存 key;
    private _data:K = Object.create(null); //数据
    constructor(key:string){
        this._k = key;
    }

    /**读取本地数据 */
    initRead(){
        let rd = this.read();
        console.log('rd--------------',rd)
        if(rd){
            this._data = rd;
        }else{
           this.initData(); 
        }
        this.onInit();
    }
    /**初始数据 */
    initData(){

    }

    onInit(){

    }
    get data():K{
        return this._data;
    }
    
    /**读取 */
    read(k?:string){
        k = k || this._k;
        return LocalStorage.get(k);
    }
    /**保存 */
    keep(k:string,v:any){
        k = k || this._k;
        LocalStorage.set(k,v);
    }

    autoKeep(){
        LocalStorage.set(this._k,this._data);
    }
    // update (dt) {}
}

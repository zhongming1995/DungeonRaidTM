// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EncryptUtil } from "../libs/encrypt/EncryptUtil";
import { md5 } from "../libs/encrypt/Md5";


export default class LocalStorage {

    static _key:string = null; 
    static _iv:string = null;
    static init(key:string,iv:string){
        this._key = md5(key);
        this._iv = md5(iv);
    }

    static set(key:string,value:any){

       // key = md5(key);
        if (typeof value === 'object') {
            try {
                value = JSON.stringify(value);
            }
            catch (e) {
                console.error(`解析失败，str = ${value}`);
                value = Object.create(null);
            }
        }
        else if (typeof value === 'number') {
            value = value + "";
        }

        if(this._key && this._iv){
            try {
                value = EncryptUtil.aesEncrypt(value, this._key, this._iv);      
            }
            catch (e) {
                value = null;
            }
        }
        cc.sys.localStorage.setItem(key, value);
       
    }


    static get(key:string){
      //  key = md5(key);
        let str: string = cc.sys.localStorage.getItem(key) || '';
        if ( '' !== str && this._key && this._iv) {
            try {
                str = EncryptUtil.aesDecrypt(str, this._key, this._iv);
            }
            catch (e) {
                str = '';
            }
        }
        if(str){
            return JSON.parse(str);
        }
        return null;
    }
}

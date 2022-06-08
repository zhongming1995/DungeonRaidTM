// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


export default class Util {


    /**
     * return min  - max  之间的数，包括min和max
     * @param min 
     * @param max 
     */
    static randomNumber(min: number, max: number) {
        if (min == max) {
            return min
        }
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    static findArrNullIdx(arr:any[]){     
        if(arr.length ==0)return 0;
        for(let i=0;i<arr.length;i++){
            if(!arr[i]){
                return i;
            }
        }
        return -1;
    }

       //分割number字符串 返回number 数组
    public static splitNumber(str:number | string,Separator:string = ','){
        if(!str)return [];
        if(typeof str == 'number'){
            return [str];
        }
        
        return str.split(Separator).map((s_num,idx) =>{
            return Number(s_num);
        })
    }

    /**
     * @param weights 权重数组 随机一个
     * @returns 
     */
     static weightRandomIdx(weights:number[]){
        if(weights.length <=1){
            return 0;
        }

        let tw:number =0;
        for(let i=0;i<weights.length;i++){
            tw +=weights[i];
        }
        let rw = Math.random() * tw;
        let sw:number =0,ew:number =0;

        for(let i=0;i<weights.length;i++){
            ew = sw + weights[i];
            if(sw < rw && rw<= ew){
                return i;
            }
            sw = ew;
        }
        return 0;
    }

       /**小数去0 */
    public static numMoveZoro(num:string){
        if(num.indexOf('.') < 0){
            return num;
        }
        num = num.replace(/0+?$/g,'')
        if(num[num.length-1] == '.'){
            num =  num.replace(/[.$]/,'');
        }     
        return num;
    }

    /**
     * 
     * @param num 秒 格式化  h:f:s
     */
     public static secondFormat(num:number){
        let str = '';
        let h:number = Math.floor(num/3600)
        num-= h * 3600;
        let f:number = Math.floor(num/60)
        num-= f * 60;
        num =  Math.floor(num)
        
        // str += (h<10?'0' + h:h);
        
        // str += ':';
        str += (f<10?'0' + f:f);

        str += ':';
        str += (num<10?'0' + num:num);
        
        return str;
    }

    /**日期展示 */
    public static getDateStr(time:number,format:number=1){

        let date = new Date(time);
        let y = date.getFullYear(),m = date.getMonth() +1,
        d = date.getDate(), h = date.getHours(), mn = date.getMinutes();

        let mnStr = '' + mn;
        if(mn <10) mnStr = '0' +  mn;
        if(format ==1){
            return `${y}/${m}/${d}  ${h}:${mnStr}`;
        }else {
            return `${y}年${m}月${d}日  ${h}:${mnStr}`;
        }
        
    }


    static generatorCallBack(len:number,callBack:Function,...params: any){
        function *gen(){
            for (let i = 0; i < len; i++) {
                yield callBack(i, ...params)
            }
        }
        return this.exeGenerator(gen(),10);
    }

    static exeGenerator(generator: Generator, duration: number) {
        return new Promise((resolve, reject) => {
            let gen = generator
            let execute = () => {
                let startTime = new Date().getTime()
                for (let iter = gen.next(); ; iter = gen.next()) {
                    if (iter == null || iter.done) {
                        resolve(null)
                        return
                    }
                    if (new Date().getTime() - startTime > duration) {
                        setTimeout(() => {
                            execute()
                        }, duration)
                        return
                    }
                }
            }
            execute()
        })
    }

    /**
     * 拷贝对象
     * @param src_obj 源对象
     * @param dst_obj 目标对象
     */
     static copyObj (src_obj:any, dst_obj:any){
        if (typeof dst_obj === "object") {
            for (var key in dst_obj) {
                if (typeof dst_obj[key] === "object") {
                    src_obj[key] != null && Util.copyObj(src_obj[key], dst_obj[key]);
                } else if (typeof dst_obj[key] != "function") {
                    src_obj[key] != null && (dst_obj[key] = src_obj[key]);
                }
            }
        } else {
            cc.log("can not copy the value type");
        }
    }

    /**
     * 克隆对象
     * @param obj 源对象
     * @returns 新的对象
     */
    static cloneObj(obj:any){
        var new_obj;
        if (obj != null && (obj.constructor === Object || obj.constructor === Array)) {
            new_obj = new obj.constructor();
            for (var key in obj) {
                new_obj[key] = Util.cloneObj(obj[key]);
            }
        } else {
            new_obj = obj;
        }
        return new_obj;
    }
}
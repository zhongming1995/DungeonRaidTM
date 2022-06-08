import Pool from "./Pool";

export default class AsyncQueue {
    queues:Task[] = null;
    invoking:boolean =false; //是否启动

    constructor(){
        this.queues = [];
        this.invoking = false;
    }

    push(fun:Function,params?:any){
        let task = Task.get(fun,params);
        this.queues.push(task);      
    }

    run(){
        if(this.queues.length == 0){
            this.invoking = false;
            return;
        }
        let task = this.queues.shift();
        if(task.excutor){
            task.excutor(task.params);
            this.invoking = true;
        }
        Task.put(task);     
    }

    clear(){
        this.queues = [];
        this.invoking = false;
    }

}

class Task {
    static _pool:Pool = new Pool(10,function(item){
        item.reset(null,null);
    });

    excutor:Function = null;
    params:any = null;

    reset(excutor:Function,args:any){
        this.excutor = excutor;
        this.params = args
    }

    static get(fun:Function,params:any){
        let t:Task = Task._pool.getItem();
        if(!t){
            t = new Task();
        }
        t.reset(fun,params);
        return t;
    }

    static put(t:Task){
        this._pool.putItem(t);
    }
}

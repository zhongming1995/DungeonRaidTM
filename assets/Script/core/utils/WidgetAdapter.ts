

const { ccclass, property } = cc._decorator;

enum LayOutType{
    Horizontal,
    vertical
}
@ccclass()
export class WidgetAdapter extends cc.Component {

    @property({displayName: "适配方向",type:cc.Enum(LayOutType)})
    layoutTp:LayOutType = LayOutType.vertical;

    @property({visible:function(this:WidgetAdapter){ return this.isV()}})
    isTop:boolean = true;

    @property({visible:function(this:WidgetAdapter){ return this.isV()}})
    isBottom:boolean = false;

    @property({visible:function(this:WidgetAdapter){ return this.isH()}})
    isLeft:boolean = true;

    @property({visible:function(this:WidgetAdapter){ return this.isH()}})
    isRight:boolean = false;

    widget:cc.Widget = null;
    onLoad(){
        this.widget =  this.node.getComponent(cc.Widget);
        if(this.widget){
            this.applyFit();   
        }
    }
    start(){
       
    }

    applyFit(){
        let top:number =0,bottom:number =0,left:number=0,right:number =0;
        let isV:boolean = this.isV();

        let visibleSize = cc.view.getVisibleSize();
        let ratio:number = isV?visibleSize.height/visibleSize.width:visibleSize.width/visibleSize.height;
        
        if(this.isFitSafe()){
            let area = cc.sys.getSafeAreaRect();
            if(isV){
                top = visibleSize.height - area.height - area.y;
                bottom =0;
            }else{
                left = area.x;
                right =visibleSize.width -area.width- area.x;
            }
                     
        }else if(ratio >2){
            if(isV){
                top = 80;
                bottom =0;
            }else{
                left = 80;
                right = 0;
            }   
        }

        if(isV){               
            this.widget.isAlignLeft = this.widget.isAlignRight = false;
            this.widget.isAlignTop =this.isTop
            this.widget.isAlignBottom = this.isBottom;
            this.widget.top = top;
            this.widget.bottom = bottom;
         
        }else{

            this.widget.isAlignTop = this.widget.isAlignBottom = false;
            this.widget.isAlignLeft = this.isLeft;
            this.widget.isAlignRight = this.isRight;
            this.widget.left = left;
            this.widget.right = right;
        }  
        console.log('top ,bottom ,left ,right ',top,bottom,left,right)
    }
    updateAnignment(){
        this.widget.updateAlignment(); 
    }   

    isH(){
        return this.layoutTp == LayOutType.Horizontal;
    }
    isV(){
        return this.layoutTp == LayOutType.vertical;
    }

    /**
     * 
     * @returns 满足获取安全区域
     */
    isFitSafe(){

        if(cc.sys.isNative){
            return true;
        }
        if(this.isWx() || this.istt()){
            return true;
        }
        return false;       
    }
    isWx(){
        return cc.sys.platform == cc.sys.WECHAT_GAME;
    }
    istt(){
        return cc.sys.platform == cc.sys.BYTEDANCE_GAME;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */

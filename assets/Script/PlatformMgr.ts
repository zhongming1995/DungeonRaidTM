// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


export default class PlatformMgr  {

  
    static isTt(){
        return cc.sys.platform == cc.sys.BYTEDANCE_GAME;
    }


    static isDouYin(){
        if(typeof tt == 'undefined'){ 
            return false;
        }
        let sysInfo = tt.getSystemInfoSync();
        return sysInfo && sysInfo.appName == 'Douyin';
    }


    /** 是否抖音桌面进入*/
    static isTTShortcutEnter() {
        if(this.isTt()) {
            const options = tt.getLaunchOptionsSync();
            const scenes = ['021020', '181020', '141020',
                        '011020','021020','061020','101020'];
            console.log('options.scene === ', options.scene);
            return scenes.indexOf(options.scene) > -1;
        }
        return false;
    }


    /**是否添加到桌面 */
    static checkShortcut(cb:Function) {
        if(!this.isTt()){
            return cb(false);
        }
        if(!tt.checkShortcut)return cb(false);

        tt.checkShortcut({
            success(res){
                cb && cb(res.status.exist);
            },
            fail(e) {
                cb && cb(false);
            }
        });
    }

    /**添加到桌面 */
    static addShortCut(cb?:Function) {
        if(!this.isTt()){
            return;
        }

        if(!tt.addShortcut){
            tt.showModal({
                title: "提示",
                content:
                  "当前客户端版本过低，无法使用该功能，请升级客户端或关闭后重启更新。",
              });
        }
        tt.addShortcut({
            success(res){
                cb && cb(true);
            },
            fail(e) {
                console.log("addShortcut 失败", e);
                //添加失败
                cb && cb(false);
            }
        });
    }





    // update (dt) {}
}

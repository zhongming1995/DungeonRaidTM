

type onProgress = (finish: number, total: number, item: cc.AssetManager.RequestItem) => void;
type onComplete = (error: Error, assets: cc.Asset) =>void;
export default class ResLoader {
    /**
     * 加载资源包
     * @param url       资源地址
     * @param complete  完成事件
     * @param v         资源MD5版本号
     */
    public loadBundle(url: string, v?: string):Promise<cc.AssetManager.Bundle>{
        return new Promise((resolve, reject) => {
            cc.assetManager.loadBundle(url, { version: v }, (err, bundle:cc.AssetManager.Bundle) => {
                if (err) {
                    return reject(err);
                }
                resolve(bundle);
            });
        });
    }

    /**
     * bundle内资源加载
     * @param bundle 
     * @param path 
     * @param onProgress 
     * @returns 
     */
    public bundleLoadRes< T extends cc.Asset >(bundle: cc.AssetManager.Bundle, path: string,onProgress?:onProgress):Promise < T >{
        return new Promise((resolve, reject) => {
            bundle.load(path,onProgress,(err, res: any) => {
                if (err) {
                    console.error("bundle load res err ", err);
                    reject(null);
                } else {
                    resolve(res);              
                }
            })
        })
    }
    /**bundle内资源加载目录 */
    public bundleLoadDir< T extends cc.Asset >(bundle: cc.AssetManager.Bundle, dir: string,onProgress?:onProgress):Promise < Array<T> >{
        return new Promise((resolve, reject) => {
            bundle.loadDir(dir,onProgress,(err, res: any) => {
                if (err) {
                    console.error("bundle load res err ", err);
                    reject(null);
                } else {
                    resolve(res);
                }
            })
        })
    }

    /**
     * 加载资源
     * @param bundleName  bundle 名
     * @param path    资源路径
     * @param onProgress  进度回调
     * @returns 
     */
    public async loadRes <T extends cc.Asset>(bundleName:string,path: string,onProgress?:onProgress):Promise <T>{
        let bundle = cc.assetManager.getBundle(bundleName);
        if(!bundle){
            bundle = await  this.loadBundle(bundleName);
        }
        return this.bundleLoadRes<T>(bundle,path,onProgress); 
    }

    public  preLoadRes (bundleName:string,path: string,onComplete?:Function):void{
        let bundle = cc.assetManager.getBundle(bundleName);
        if(!bundle){
            this.loadBundle(bundleName).then((bd) =>{
                bd.preload(path);
            })    
        }else{
            bundle.preload(path);
        }      
    }
}

export let resLoader = new ResLoader();
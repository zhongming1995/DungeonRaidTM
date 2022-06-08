const { ccclass, property, menu } = cc._decorator;

@ccclass('Img')
class Img {
    @property({
        type: cc.Sprite,
        displayName: "需要替换的节点"
    })
    public sprite: cc.Sprite = null;
    @property({
        type: cc.SpriteFrame,
        displayName: "图片",
    })
    public texture: cc.SpriteFrame[] = [];
    @property({
        displayName: "缩放"
    })
    public scale = 1;
}

//精灵节点
//语言-图片 {语言,图片}[]

@ccclass
@menu('多语言图片替换类')
export default class ReplaceImg extends cc.Component {

    @property({
        type: Img,
    })
    Img: Img[] = [];

    protected onLoad(): void {
        let language = '_' + (window["Language"] && window["Language"].LanguageMgr.languageType);
        //当前语言
        for (let i = 0; i < this.Img.length; i++) {
            var img = this.Img[i];
            if (!img.sprite) continue;
            let imgName = img.sprite.spriteFrame.name + language;
            for (let j = 0; j < img.texture.length; j++) {
                const element = img.texture[j];
                if (!element) {
                    continue;
                }
                if (imgName == element.name) {
                    // console.error("imgName : ", imgName);
                    if (img.sprite) {
                        img.sprite.spriteFrame = element;
                        img.sprite.node.scale = img.scale;
                    }
                    break;
                }
            }
        }
    }
}
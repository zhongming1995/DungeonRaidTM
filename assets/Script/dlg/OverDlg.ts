/*
* @ Author: yangcheng
* @ Data: 2022-03-31 17:16
*/

import BasePopup from "../core/gui/BasePopup";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OverDlg extends BasePopup {

    @property([cc.SpriteFrame])
    title: cc.SpriteFrame[] = [];
    @property([cc.SpriteFrame])
    title_en: cc.SpriteFrame[] = [];
    @property(cc.Sprite)
    icon: cc.Sprite = null;

    onLoad(): void {

    }

    initData(params: any): void {
        // console.error("params : ", params)

        let func = params && params[0];

        let idx = Math.floor(Math.random() * this.title.length);
        let title = this.title;
        try {
            if (window["Language"].LanguageMgr.languageType == 'en') {
                title = this.title_en;
            }
        } catch (error) {
            console.error(error);
            title = this.title;
        }
        this.icon.spriteFrame = title[idx];
        this.icon.node.active = false;

        let call = () => {
            this.scheduleOnce(() => {
                this.icon.node.active = true;
                if (Math.random() > 0.5) {
                    this.icon.fillRange = -1
                    let scale = this.icon.node.scale;
                    this.icon.node.scale = 0;
                    cc.tween(this.icon.node).to(0.2, { scale: scale * 1.2 }).to(0.2, { scale: scale }).call(
                        () => {
                            this.scheduleOnce(() => {
                                this.closeUi();
                                if (typeof func == "function") {
                                    func(idx)
                                }
                            }, 1.5)
                        }
                    ).start();
                } else {
                    this.icon.fillRange = 0;
                    cc.tween(this.icon).to(0.5, { fillRange: -1 }).call(() => {
                        this.scheduleOnce(() => {
                            this.closeUi();
                            if (typeof func == "function") {
                                func(idx)
                            }
                        }, 1.5)
                    }).start();
                }
            }, 0.2);
        }
        this.openAni(call);
    }


}
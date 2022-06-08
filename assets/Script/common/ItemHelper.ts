import { app } from "../app";
import Util from "../core/utils/Util";
import { BattleModeType, Item_type, att_val_type, PopupName, enum_item_ids } from "../Defines";

export default class ItemHelper {

    /**
     * 金币不足补充
     */
    static supplyGoldAlert(data?) {

        app.layerMgr.open(PopupName.SupplyGoldDlg, null, data);
    }


    static checkEnemyDie(mid: number) {
        if (mid == enum_item_ids.medusha) {
            if (!app.dataMgr.roleProxy.hasRole(5)) {
                app.layerMgr.open(PopupName.SkinUnlockDlg)
            }
        }
    }

    /**
     * 
     * @param id 获取属性名
     * @returns 
     */
    static get_attr_name(id: number) {
        let attConf = app.confMgr.conf.attribute.getConfById(id);
        return attConf ? attConf.attribute_param : '';
    }


    static attr_add_attr(source: any, target: any) {
        if (!source || !target) return;
        for (let k in target) {
            if (!source[k]) {
                source[k] = 0;
            }
            source[k] += target[k];
        }
    }

    /**属性 字符串 转换 */
    static idxAttrStrsTranser(idxStr: string, valStr: string) {
        let idxs = Util.splitNumber(idxStr);
        let vals = Util.splitNumber(valStr);

        return idxs.map((idx, i) => {
            return this.idxAttrToObj(idx, vals[i]);
        })
    }


    /**idx属性     转换*/
    static idxAttrToObj(idx: number, val: number): att_val_type {
        let attConf = app.confMgr.conf.attribute.getConfById(idx);
        let obj: att_val_type = Object.create(null);

        obj.attName = attConf.attribute_param;
        obj.val = val;
        obj.own = attConf.attribute_weapon;
        return obj
    }

    static objAddVal(obj: Object, k: string, v: number) {

        if (!obj) return;
        if (!obj[k]) obj[k] = 0;
        obj[k] += v;
    }

    /**拷贝属性 */
    static copyObjVal(self: any, other: any) {
        if (!self || !other) return;
        for (let k in other) {
            self[k] = other[k];
        }
    }

    /**是开放的关卡模式 */
    static isOpenMode(m: BattleModeType) {

        return m == BattleModeType.dazhao || m == BattleModeType.douleLive || m == BattleModeType.tangping;
    }


    /**选择的双人模式 */
    static isDoubleMode() {
        return app.dataMgr.selectMode == BattleModeType.douleLive;
    }
    /**大招模式 */
    static isDaZhaoMode() {
        return app.dataMgr.selectMode == BattleModeType.dazhao;
    }

    /**武器 */
    static isWeapon(tp: Item_type) {

        return tp == Item_type.sub_weapon || tp == Item_type.main_weapon
            || tp == Item_type.super_weapon;
    }
    /**饰品 */
    static isShiPin(tp: Item_type) {
        return tp == Item_type.shipin
    }


}

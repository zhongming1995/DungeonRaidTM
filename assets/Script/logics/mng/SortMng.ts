const {ccclass, property} = cc._decorator;

/**
 * 场景人物排序
 */
@ccclass
export default class SortMng extends cc.Component {

    private _frameCount:number = 0;

    gameUpdate(dt) {
        if (++this._frameCount % 6 === 0) {
            this.sortChildrenByY();
        }
    }

    private sortChildrenByY() {
        let listToSort = this.node.children.slice();
        listToSort.sort(function (a, b){
            return b.y - a.y;
        });

        for (let i = 0; i < listToSort.length; ++i) {
            let node = listToSort[i];
            if (node.active) {
                node.setSiblingIndex(i + 1);
            }
        }
    }
}



export default class QuadTree  {

    nodes = [];
    objects = [];  //該容器的物體集合
    max_levels:number;  // 最大深度
    max_objects:number;  // 該容器最大容量
    level:number;   //當前深度
    bounds:cc.Rect = null; // 容器範圍(Rect)

    constructor(boundary,level) {
        this.max_objects = 4;
        this.max_levels = 4;
    
        this.level = level || 0;
        this.bounds = boundary;
    
        this.objects = [];
        this.nodes = [];
    }

    insert(pRect) {
        var i = 0,indexes;

        //if we have subnodes, call insert on matching subnodes
        if (this.nodes.length) {
            indexes = this.getIndex(pRect);

            for (i = 0; i < indexes.length; i++) {
                this.nodes[indexes[i]].insert(pRect);
            }
            return;
        }

        //otherwise, store object here
        this.objects.push(pRect);

        //max_objects reached
        if (this.objects.length > this.max_objects && this.level < this.max_levels) {

            //split if we don't already have subnodes
            if (!this.nodes.length) {
                this.split();
            }

            //add all objects to their corresponding subnode
            for (i = 0; i < this.objects.length; i++) {
                indexes = this.getIndex(this.objects[i]);
                for (var k = 0; k < indexes.length; k++) {
                    this.nodes[indexes[k]].insert(this.objects[i]);
                }
            }

            //clean up this node
            this.objects = [];
        }
    }

    split() {
        var nextLevel = this.level + 1,
        subWidth = this.bounds.width / 2,
        subHeight = this.bounds.height / 2,
        x = this.bounds.x,
        y = this.bounds.y;

        //top right node
        this.nodes[0] = new QuadTree({
            x: x + subWidth,
            y: y,
            width: subWidth,
            height: subHeight
        },  nextLevel);

        //top left node
        this.nodes[1] = new QuadTree({
            x: x,
            y: y,
            width: subWidth,
            height: subHeight
        },  nextLevel);

        //bottom left node
        this.nodes[2] = new QuadTree({
            x: x,
            y: y + subHeight,
            width: subWidth,
            height: subHeight
        },  nextLevel);

        //bottom right node
        this.nodes[3] = new QuadTree({
            x: x + subWidth,
            y: y + subHeight,
            width: subWidth,
            height: subHeight
        },  nextLevel);
    }


    getIndex(pRect){
        var indexes = [],
        verticalMidpoint = this.bounds.x + (this.bounds.width / 2),
        horizontalMidpoint = this.bounds.y + (this.bounds.height / 2);

        var startIsNorth = pRect.y < horizontalMidpoint,
        startIsWest = pRect.x < verticalMidpoint,
        endIsEast = pRect.x + pRect.width > verticalMidpoint,
        endIsSouth = pRect.y + pRect.height > horizontalMidpoint;

        //top-right quad
        if (startIsNorth && endIsEast) {
            indexes.push(0);
        }

        //top-left quad
        if (startIsWest && startIsNorth) {
            indexes.push(1);
        }

        //bottom-left quad
        if (startIsWest && endIsSouth) {
            indexes.push(2);
        }

        //bottom-right quad
        if (endIsEast && endIsSouth) {
            indexes.push(3);
        }

        return indexes;
    }



    retrieve(pRect){
        
        var indexes = this.getIndex(pRect),
        returnObjects = this.objects;

        //if we have subnodes, retrieve their objects
        if (this.nodes.length) {
            for (var i = 0; i < indexes.length; i++) {
                returnObjects = returnObjects.concat(this.nodes[indexes[i]].retrieve(pRect));
            }
        }

        //remove duplicates
        returnObjects = returnObjects.filter(function (item, index) {
            return returnObjects.indexOf(item) >= index;
        });

        return returnObjects;
    }

    objLen(){  

        if(this.nodes.length >0){
            let len = 0;
            for(let node of this.nodes){
                len += node.objLen();
            }
            return len;
        }else{
            //console.log('this.objects.length------',this.objects.length)
            return this.objects.length;
        } 
    }
    
}

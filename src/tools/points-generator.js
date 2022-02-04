import Vector from "../structs/vector";

class PointsGenerator {
    constructor() {
        this.xFrom = null;
        this.xTo = null;
        this.step = null;
        this.points = null;
    }

    initByInterval(xFrom, xTo, step) {
        this.xFrom = xFrom;
        this.xTo = xTo;
        this.step = step;
        return this;
    }

    initByPoints(points) {
        this.points = points;
        return this;
    }

    generate(func) {
        const result = [];

        if(this.points !== null) {
            for(let point of this.points) {
                result.push(new Vector(point, func(point)));
            }
        } else {
            for(let x=this.xFrom; x<=this.xTo; x+=this.step) {
                result.push(new Vector(x, func(x)));
            }
        }

        return result;
    }
}

export default PointsGenerator;
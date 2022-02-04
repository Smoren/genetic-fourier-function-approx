import Genome from "../structs/genome";

class GenomeFactory {
    constructor(len, min, max) {
        this.len = len;
        this.min = min;
        this.max = max;
    }

    generate() {
        const data = [];

        for(let i=0; i<this.len; ++i) {
            data.push(this.min + Math.random()*(this.max-this.min));
        }

        return new Genome(data);
    }
}

export default GenomeFactory;
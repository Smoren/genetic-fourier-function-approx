import Fourier from "./fourier";

class Genome {
    constructor(data) {
        this.data = data;
    }

    toFourier() {
        const a0 = this.data[0];
        let a = [];
        let b = [];
        let c = [];

        for(let i=1; i<this.data.length; i+=3) {
            a.push(this.data[i]);
            b.push(this.data[i+1]);
            c.push(this.data[i+2]);
        }

        return new Fourier(a0, a, b, c);
    }

    mutate(mutationProbability) {
        if(mutationProbability === 0) {
            return this;
        }

        mutationProbability /= this.data.length;

        for(let i=0; i<this.data.length; ++i) {
            if(Math.random() < mutationProbability) {
                let rand = Math.random();
                if(rand > 0.8) {
                    this.data[i] *= 2;
                } else if(rand > 0.6) {
                    this.data[i] /= 2;
                } else if(rand > 0.4) {
                    this.data[i] = -this.data[i];
                } else if(rand > 0.2) {
                    this.data[i] += 1;
                } else {
                    this.data[i] -= 1;
                }
            }
        }

        return this;
    }

    clone(mutationProbability) {
        const data = [...this.data];
        return (new Genome(data)).mutate(mutationProbability);
    }

    cross(partner, mutationProbability) {
        const child = this.clone(0);

        for(let i=0; i<child.data.length; ++i) {
            if(Math.random() > 0.5) {
                child.data[i] = partner.data[i];
            }
        }

        child.mutate(mutationProbability);

        return child;
    }
}

export default Genome;
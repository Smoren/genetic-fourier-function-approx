class Fourier {
    constructor(a0, a, b, c) {
        this.a0 = a0;
        this.a = a;
        this.b = b;
        this.c = c;
    }

    getValue(x) {
        let result = this.a0;
        for(let i=0; i<this.a.length; ++i) {
            result += this.a[i]*Math.sin(this.b[i]*x + this.c[i]);
        }
        return result;
    }
}

export default Fourier;
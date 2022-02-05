import GenomeFactory from "./genome-factory";
import PointsGenerator from "./points-generator";

class GeneticAlgorithm {
    constructor(
        reference, populationCount, surviveFraction, crossFraction, mutationProbability,
        genomeLength, genValueAmplitude
    ) {
        this.reference = reference;
        this.populationCount = populationCount;
        this.surviveCount = Math.round(populationCount * surviveFraction);
        this.crossCount = Math.round(this.surviveCount * crossFraction);
        this.mutationProbability = mutationProbability;
        this.population = [];
        this.genomeFactory = new GenomeFactory(genomeLength, -genValueAmplitude, genValueAmplitude);
        this.pointsGenerator = new PointsGenerator();
        this.pointsGenerator.initByPoints(this.reference.map((point) => point.x));
        this.initStartPopulation();
        this.ticker = null;
    }

    start(viewCallback, interval = 30) {
        this.ticker = setInterval(() => {
            this.population = this.makeNextPopulation((bestCreature, diff) => {
                const fourier = bestCreature.toFourier();
                viewCallback(
                    this.pointsGenerator.generate((x) => fourier.getValue(x)),
                    diff
                );
            });
        }, interval);

        return this;
    }

    stop() {
        clearInterval(this.ticker);
        this.ticker = null;

        return this;
    }

    makeNextPopulation(bestCreatureCallback) {
        const buf = [];
        for(let creature of this.population) {
            buf.push([
                creature,
                this.compare(this.pointsGenerator.generate((x) => creature.toFourier().getValue(x)), this.reference),
            ]);
        }

        buf.sort((lhs, rhs) => {
            if(lhs[1] < rhs[1]) {
                return -1;
            }
            if(lhs[1] > rhs[1]) {
                return 1;
            }
            return 0;
        });

        bestCreatureCallback(buf[0][0], buf[0][1]);

        const nextPopulation = [];

        for(let i=0; i<this.surviveCount; ++i) {
            nextPopulation.push(buf[i][0]);
        }

        for(let i=0; i<this.crossCount; ++i) {
            let leftCreature = buf[i][0];

            for(let j=0; j<this.crossCount; ++j) {
                if(i === j) {
                    continue;
                }

                let rightCreature = buf[j][0];

                nextPopulation.push(leftCreature.cross(rightCreature, this.mutationProbability));

                if(nextPopulation.length >= this.surviveCount + this.crossCount) {
                    break;
                }
            }

            if(nextPopulation.length >= this.surviveCount + this.crossCount) {
                break;
            }
        }

        let i=0;
        while(nextPopulation.length < this.populationCount) {
            nextPopulation.push(buf[i][0].clone(this.mutationProbability));
            ++i;
        }

        return nextPopulation;
    }

    compare(applicant, reference) {
        let diff = 0;

        for(let i=0; i<reference.length; ++i) {
            diff += Math.abs(reference[i].y - applicant[i].y);
        }

        return diff;
    }

    initStartPopulation() {
        this.population = [];

        for(let i=0; i<this.populationCount; ++i) {
            this.population.push(this.genomeFactory.generate());
        }

        return this;
    }
}

export default GeneticAlgorithm;
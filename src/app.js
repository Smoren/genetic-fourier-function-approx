import Chart from "./tools/chart";
import GeneticAlgorithm from "./tools/genetic-algorithm";
import PointsGenerator from "./tools/points-generator";

const chart = new Chart('#chart svg');

const pGen = (new PointsGenerator()).initByInterval(1, 100, 5);
const ref = pGen.generate((x) => x*x + Math.log(x) + 1/x + 10000*Math.sin(Math.pow(2, x)));

chart.addFunctionGraph('reference', 'Reference', '#00ff00', ref);
chart.addFunctionGraph('applicant', 'Applicant', '#0000ff', []);
chart.init();

const genAlgo = new GeneticAlgorithm(
    ref, 2000, 0.3, 0.3,
    0.2, 2, 1+3*100, 1000
);

const deviationDomElement = document.getElementById('deviation');

genAlgo.start((applicant, diff) => {
    deviationDomElement.innerHTML = String(Math.round(diff*100)/100);
    chart.updateFunctionGraph('applicant', applicant);
});

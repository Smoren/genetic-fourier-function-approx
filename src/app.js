import Chart from "./tools/chart";
import GeneticAlgorithm from "./tools/genetic-algorithm";
import PointsGenerator from "./tools/points-generator";

const chart = new Chart('#chart svg');

const pGen = (new PointsGenerator()).initByInterval(1, 50, 1);
const ref = pGen.generate((x) => (x+3)*(Math.sqrt(Math.abs(5*Math.sin(Math.log(x*x)*x/50)))-5)-10*Math.sin(Math.sqrt(x)));

chart.addFunctionGraph('reference', 'Reference', '#00ff00', ref);
chart.addFunctionGraph('applicant', 'Applicant', '#0000ff', []);
chart.init();

const genAlgo = new GeneticAlgorithm(
    ref, 1000, 0.5, 0.2, 2, 1+3*50, 1
);

const deviationDomElement = document.getElementById('deviation');

genAlgo.start((applicant, diff) => {
    deviationDomElement.innerHTML = String(Math.round(diff*100)/100);
    chart.updateFunctionGraph('applicant', applicant);
});

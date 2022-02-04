import nv from 'nvd3';
import d3 from 'd3';

class Chart {
    constructor(selector) {
        this.functionGraphs = {};
        this.selector = selector;
        this.chart = null;
    }

    init() {
        this.chart = this.makeChart();
        return this;
    }

    addFunctionGraph(key, name, color, data = []) {
        this.functionGraphs[key] = {
            values: data,
            key: name,
            color: color,
        };

        return this.update();
    }

    updateFunctionGraph(key, data) {
        this.functionGraphs[key].values = data;
        return this.update();
    }

    deleteFunctionGraph(key) {
        delete this.functionGraphs[key];
        return this.update();
    }

    makeChart() {
        const chart = nv.models.lineChart()
            .useInteractiveGuideline(true)
            //.duration(100)
            .showLegend(true)
            .showYAxis(true)
            .showXAxis(true);

        chart.xAxis
            .axisLabel('X')
            .tickFormat(d3.format(',r'));

        chart.yAxis
            .axisLabel('Y')
            .tickFormat(d3.format('.02f'));

        d3.select(this.selector)
            .datum(this.getData())
            .call(chart);

        nv.utils.windowResize(function() { chart.update() });
        return chart;
    }

    update() {
        if(this.chart === null) {
            return this;
        }

        d3.select(this.selector)
            .datum(this.getData())
            .call(this.chart);

        return this;
    }

    getData() {
        return Object.values(this.functionGraphs);
    }
}

export default Chart;
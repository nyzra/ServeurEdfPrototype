import { printGlobalCharts } from './GlobalCharts.js';
import { printMetierCharts } from './MetierCharts.js';

function printGraph(data){
	const ctx1 = document.getElementById('chart1');
	const ctx2 = document.getElementById('chart2');
	const ctx3 = document.getElementById('chart3');
	const ctx4 = document.getElementById('chart4');
	const ctx5 = document.getElementById('chart5');
	const ctx6 = document.getElementById('chart6');
	const charts = [ctx1,ctx2,ctx3,ctx4,ctx5,ctx6]
	const hiddengraphs = document.getElementsByClassName("hiddenGraph");

	charts.forEach(function(chart){
		if(Chart.getChart(chart)!= undefined) Chart.getChart(chart).destroy()
	});

	if (data == "Global"){
		for (var i = 0, max = hiddengraphs.length; i < max; i++) {
    		hiddengraphs[i].style.display = 'flex';
		}
		printGlobalCharts();
	} else {
		for (var i = 0, max = hiddengraphs.length; i < max; i++) {
    		hiddengraphs[i].style.display = 'none';
		}
		printMetierCharts(data);
	}

}

export { printGraph }
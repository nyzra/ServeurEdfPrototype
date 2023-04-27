function stackedBarChart(id, labels, datasets, title, yLabel, xLabel) {
	let chartID = document.getElementById(id);
	new Chart(chartID, {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [
			{
				label: 'Fiches valides',
				data: datasets[0],
				backgroundColor: '#4BBFC0',
			},
			{
				label: 'Fiches non-valides',
				data: datasets[1],
				backgroundColor: '#FE6384',
			},
		]
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: title
				},
			},
			responsive: true,
			scales: {	
				x: {
					stacked: true,
					grid: { display: false },
					title: {
						display: true,
						text: xLabel
					}
				},
				y: {
					stacked: true,
					beginAtZero: true,
					title: {
						display: true,
						text: yLabel
					}
				}
			}
		}
	});
}


function lineChart(id, labels, dataset, dataLabel ,title, yLabel, xLabel){
	let chartID = document.getElementById(id);
	new Chart(chartID, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
			    label: dataLabel,
			    data: dataset,
			    fill: false,
			    borderColor: 'rgb(75, 192, 192)',
			    tension: 0.1
			  }]
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: title
				},
			},
			responsive: true,
			scales: {
				x: {
					grid: { display: false },
					title: {
						display: true,
						text: xLabel
					}
				},
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: yLabel
					}
				}
			}
		}
	});
}


function doughnutChart(id, labels, dataset, title){
	let chartID = document.getElementById(id);
	new Chart(chartID, {
		type: 'doughnut',
		data: {
			labels: labels,
			datasets: [{
			    label: 'DCC',
			    data: dataset,
			  }]
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: title
				},
			},
			responsive: true,
		}
	});
}


function stackedLinesChart(id, labels, datasets ,dataLabels ,title, yLabel, xLabel) {
	let chartID = document.getElementById(id);
	new Chart(chartID, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
			{
				label: dataLabels[0],
				data: datasets[0],
				backgroundColor: '#4BBFC0',
				fill: false,
				borderColor: '#4BBFC0',
				tension: 0.1
			},
			{
				label: dataLabels[1],
				data: datasets[1],
				backgroundColor: '#FE6384',
				fill: false,
				borderColor: '#FE6384',
				tension: 0.1
			},
		]
		},
		options: {
			plugins: {
				title: {
					display: true,
					text: title
				},
			},
			responsive: true,
			scales: {
				x: {
					grid: { display: false },
					title: {
						display: true,
						text: xLabel
					}
				},
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: yLabel
					}
				}
			}
		}
	});
}


// function threestackedBarChart(id, labels, datasets, datalabels ,title, yLabel, xLabel) {
// 	chartID = document.getElementById(id);
// 	new Chart(chartID, {
// 		type: 'bar',
// 		data: {
// 			labels: labels,
// 			datasets: [
// 			{
// 				label: datalabels[0],
// 				data: datasets[0],
// 				backgroundColor: '#4BBFC0',
// 			},
// 			{
// 				label: datalabels[1],
// 				data: datasets[1],
// 				backgroundColor: '#FFAB42',
// 			},
// 			{
// 				label: datalabels[2],
// 				data: datasets[2],
// 				backgroundColor: '#FE6384',
// 			},
// 		]
// 		},
// 		options: {
// 			plugins: {
// 				title: {
// 					display: true,
// 					text: title
// 				},
// 			},
// 			responsive: true,
// 			scales: {
// 				x: {
// 					stacked: true,
// 					grid: { display: false },
// 					title: {
// 						display: true,
// 						text: xLabel
// 					}
// 				},
// 				y: {
// 					stacked: true,
// 					beginAtZero: true,
// 					title: {
// 						display: true,
// 						text: yLabel
// 					}
// 				}
// 			}
// 		}
// 	});
// }

export { stackedBarChart , lineChart , stackedLinesChart , doughnutChart}
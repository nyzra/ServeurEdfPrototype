// cette fonction est utilisé dans affichageAcceuil.js 
//a chaque fois que le filtre sur les graphique cette fonction est rappelé et les donnée sont transmit a traver l'argment data

//* IMPORTANT je viens de me rendre compte que c'étais pas très utile de faire ça sur cs graphiques vu que déja tout est trié par métier dans les graphiques
// peut être qu'on a d'autre graphiques a tracer qui seraient pertinent?

// idée de graphe : raison de la non conformité
function printGraph(data){
	
	const ctx1 = document.getElementById('chart1');
	const ctx2 = document.getElementById('chart2');
	const ctx3 = document.getElementById('chart3');
	const ctx4 = document.getElementById('chart4');
	const ctx5 = document.getElementById('chart5');
	const ctx6 = document.getElementById('chart6');
	// si les graphiques ont déja été crée on les effaces afin de pouvoir les recréer
	if(Chart.getChart(ctx1)!= undefined) Chart.getChart(ctx1).destroy() 
		if(Chart.getChart(ctx2)!= undefined) Chart.getChart(ctx2).destroy() 
			if(Chart.getChart(ctx3)!= undefined) Chart.getChart(ctx3).destroy() 

	var dictMetiers = {};
	
	for (var i = data.length - 1; i >= 0; i--) {
		let m = data[i]["Metier"][0];
		if (m in dictMetiers) {
			dictMetiers[m][0] += 1;
		} else {
			dictMetiers[m] = [1 ,0];
		}
	
		if (data[i]["Conformite"] == "Non"){
			dictMetiers[m][1] += 1;
		}
	}
	
	var labels = ["Autres"];
	var conformes = [0];
	var nonConformes = [0];
	
	
	for (var m in dictMetiers) {
		if (dictMetiers[m][0] >= 5) {
			labels.unshift(m)
			conformes.unshift(dictMetiers[m][0] - dictMetiers[m][1])
			nonConformes.unshift(dictMetiers[m][1])
		} else {
			conformes[conformes.length - 1] += dictMetiers[m][0] - dictMetiers[m][1];
			nonConformes[nonConformes.length - 1] += dictMetiers[m][1];
		}
	}
	
	// A changer:
	var nonControleDCC = [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0];
	var nonControleTotaleDCC = 0;
	
	for (var i = data.length - 1; i >= 0; i--) {
		if (data[i]["Conformite"] == "Non"){
	
	
			let m = data[i]["Metier"][0];
			nonControleTotaleDCC += Math.ceil(data[i]["DCC"]);
			// console.log(m ,data[i]["NumDemande"] ,Math.ceil(data[i]["DCC"]))
	
			if (labels.includes(m)) {
	
				var index = labels.indexOf(m);
				nonControleDCC[index] += Math.ceil(data[i]["DCC"]);
			} else {
				nonControleDCC[nonControleDCC.length - 1] += Math.ceil(data[i]["DCC"]);
			}
	
		}
	}
	
	// console.log(nonControleDCC);
	
	// console.log(labels)
	// console.log(conformes)
	// console.log(nonConformes)
	
	new Chart(ctx1, {
		type: 'bar',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'Fiches valides',
					data: conformes,
					backgroundColor: '#4BBFC0',
				},
				{
					label: 'Fiches non-valides',
					data: nonConformes,
					backgroundColor: '#FE6384',
				},
			]
		},
		options: {
			onClick: graphClickEvent,
			plugins: {
				title: {
					display: true,
					text: 'Fiches FE de la semaine'
				},
			},
			responsive: true,
			scales: {
				x: {
					stacked: true,
					grid: { display: false }
				},
				y: {
					stacked: true,
					beginAtZero: true,
				}
			}
		}
	});
	
	
	function graphClickEvent(event, array){
		var chartID = event["chart"]["id"]; // Chart id
		var iData = array[0]["datasetIndex"]; // Index of dataset
		var iBar = array[0]["element"]["$context"]["parsed"]["x"]; // Bar index
		var val = array[0]["element"]["$context"]["parsed"]["y"]; // Bar value
		alert("Bar index: " + iBar + ", Value: " + val + ", Dataset: " + iData);
	}
	
	
	
	
	
	new Chart(ctx2, {
		type: 'doughnut',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'DCC non controlé (Mj)',
					data: nonControleDCC,
					// backgroundColor: 'rgb(125, 252, 122)',
				},
			]
		},
		options: {
			onClick: graphClickEvent,
			plugins: {
				title: {
					display: true,
					text: 'SCC non controlé (Total: ' + nonControleTotaleDCC + 'Mj)'
				},
			},
			responsive: true,
			// scales: {
			// 	x: {
			// 		stacked: true,
			// 		grid: { display: false }
			// 	},
			// 	y: {
			// 		stacked: true,
			// 		beginAtZero: true,
			// 	}
			// }
		}
	});
	
	
	const weeks = ["S1" ,"S2" ,"S3" ,"S4" ,"S5" ,"S6" ,"S7" ,"S8"]
	const taux = [65, 59, 80, 81, 56, 55, 40 ,68]
	
	new Chart(ctx3, {
		type: 'line',
	
		data: {
			labels: weeks,
			datasets: [
				{
					data: taux,
					fill: true,
					borderColor: 'rgb(75, 192, 192)',
					tension: 0.3,
				},
			]
		},
		
	
		options: {
			onClick: graphClickEvent,
			
			plugins: {
				title: {
					display: true,
					text: 'Taux conformité'
				},
				legend: {
					display: false
				},
			},
			responsive: true,
			scales: {
				x: {
					grid: { display: true },
				},
				y: {
					beginAtZero: true,
				}
			}
		}
	});	
}

export { printGraph }
import { stackedBarChart , lineChart , stackedLinesChart , doughnutChart} from "./ChartsLibrary.js"
import { getAllWeks ,loadData } from './getFiches.js'


function printMetierCharts(metier) {
	var [data1 , data2 ,data3 , data4 , data5 , data6 , data7 ,data8] = getAllWeks()


	var dataTotal = [data1 ,data2 ,data3 ,data4 ,data5 ,data6 ,data7 ,data8]
	var Semaines = ["S1" ,"S2" ,"S3" ,"S4" ,"S5" ,"S6" ,"S7" ,"S8"]



	// Fiche de la semaine c / nc /  DCC
	var fichesSemaine = {
		"Conformes": 0,
		"Non-Conformes": 0,
		"Critique": 0
	}

	for (var i = 0; i < data1.length; i++) {
		var fiche = data1[i];
		if (fiche["Metier"] == metier) {
			if (fiche["Conformite"] == "Non") {
				if (fiche["Motif"] == "Signature métier > 400 Mj/m²") {
					fichesSemaine["Critique"] += 1
				} else {
					fichesSemaine["Non-Conformes"] += 1
				}

			} else {
				fichesSemaine["Conformes"] += 1
			}
		}

	}
	//console.log(fichesSemaine);
	doughnutChart("chart1", Object.keys(fichesSemaine), Object.values(fichesSemaine), "Etat des fiches de la semaine")




	// Evolution fiches non valides sur nombres de fiches
	var nbrFiches = []
	var nbrFichesNC = []
	//console.log(dataTotal)
	for (var i = 0; i < dataTotal.length; i++) {
		var data = dataTotal[i];
		var Fe = 0;
		var FeNC = 0;

		for (var j = 0; j < data.length; j++) {
			var fiche = data[j];
			if (fiche["Metier"] == metier) {
				Fe += 1;
				if (fiche["Conformite"] == "Non") {
					FeNC += 1;
				}
			}
		}
		nbrFiches.push(Fe);
		nbrFichesNC.push(FeNC);

	}
	//console.log(nbrFiches, nbrFichesNC);
	stackedLinesChart("chart2", Semaines ,[nbrFiches, nbrFichesNC] ,["Fiches totales" ,"Fiches non conformes"] ,"Evolution du nombre de fiches", "Nombre de fiches", "Semaines")





	// Evolution DCC non controlée
	var NonControleeDCC = []
	for (var i = 0; i < dataTotal.length; i++) {
		var data = dataTotal[i];
		var DCC = 0;

		for (var j = 0; j < data.length; j++) {
			var fiche = data[j];
			if (fiche["Metier"] == metier) {
				if (fiche["Conformite"] == "Non") {
					DCC += Math.ceil(fiche["DCC"]); ;
				}
			}
		}
		NonControleeDCC.push(DCC);

	}
	//console.log(NonControleeDCC);
	lineChart("chart3" ,Semaines ,NonControleeDCC ,"DCC (Mj)" ,"Evolution de la DCC non controlée par semaine (" + metier + ")" ,"DCC non controlée en Mj" ,"Semaines")
}


export {printMetierCharts}







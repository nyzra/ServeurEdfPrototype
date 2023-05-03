import { stackedBarChart , lineChart , doughnutChart} from "./ChartsLibrary.js"
import { getAllWeks , loadData} from './getFiches.js'
await loadData()
var Metiers = ["A2P" ,"C2E" ,"Conduite" ,"Equipe Commune" ,"MMCR" ,"SAE" ,"SLT" ,"SPR"]
var Semaines = ["S1" ,"S2" ,"S3" ,"S4" ,"S5" ,"S6" ,"S7" ,"S8"]

var [data1 , data2 ,data3 , data4 , data5 , data6 , data7 ,data8] =await getAllWeks()

var dataTotal = [data1 ,data2 ,data3 ,data4 ,data5 ,data6 ,data7 ,data8]

//console.log(dataTotal)
// Fiches conformes - non conformes de la semaine (bars)
var dictMetiers = {"A2P": {"Conforme": 0, "NonConforme": 0 ,"Total": 0},
					"C2E": {"Conforme": 0, "NonConforme": 0 ,"Total": 0},
					"Conduite": {"Conforme": 0, "NonConforme": 0 ,"Total": 0},
					"Equipe Commune": {"Conforme": 0, "NonConforme": 0 ,"Total": 0},
					"MMCR": {"Conforme": 0, "NonConforme": 0 ,"Total": 0},
					"SAE": {"Conforme": 0, "NonConforme": 0 ,"Total": 0},
					"SLT": {"Conforme": 0, "NonConforme": 0 ,"Total": 0},
					"SPR": {"Conforme": 0, "NonConforme": 0 ,"Total": 0}};

for (var i = 0; i < data1.length; i++) {
	var m = data1[i]["Metier"]
	if (Metiers.includes(m)) {
		if (data1[i]["Conformite"] == "Non"){
			dictMetiers[m]["NonConforme"] += 1; 
		} else {
			dictMetiers[m]["Conforme"] += 1; 
		}
		dictMetiers[m]["Total"] += 1; 
	}
}
// console.log(dictMetiers)
stackedBarChart("chart1" ,Metiers ,[Object.values(dictMetiers).map(metier => metier.Conforme) ,Object.values(dictMetiers).map(metier => metier.NonConforme)] ,"Fiches de la semaine" ,"Nombre de fiche" ,"Métier")



// Taux conformité (évolution)
var listeTaux = []

for (var i = 0; i < dataTotal.length; i++) {
	var data = dataTotal[i]
	let taux = {"Conforme": 0, "NonConforme": 0}
	for (var j = 0; j < data.length; j++) {
		var fiche = data[j]
		if (fiche["Conformite"] == "Non"){
			taux["NonConforme"] += 1
		} else {
			taux["Conforme"] += 1
		}
	}
	listeTaux.push(Math.round(100.0 * taux["Conforme"] / (taux["NonConforme"] + taux["Conforme"])))
}
//console.log(listeTaux)
lineChart("chart2" ,Semaines ,listeTaux ,"Taux" ,"Evolution taux de conformité" ,"Pourcentage de conformitée" ,"Semaines")


// DCC non controllée par métier avec sous titre global (pie chart)
var dictMetiersDCC = {"A2P": 0,
					"C2E": 0,
					"Conduite": 0,
					"Equipe Commune": 0,
					"MMCR": 0,
					"SAE": 0,
					"SLT": 0,
					"SPR": 0};
var DCCTotal = 0;

for (var i = 0; i < data1.length; i++) {
	var m = data1[i]["Metier"]
	if (Metiers.includes(m)) {
		if (data1[i]["Conformite"] == "Non"){
			dictMetiersDCC[m] += Math.ceil(data1[i]["DCC"]); 
		}
	}
}
//console.log(dictMetiersDCC ,DCCTotal)
doughnutChart("chart3", Metiers, Object.values(dictMetiersDCC), "DCC non controlée par métier")


// DCC non controlléé par semaine (evolution)
var listeDCC = []

for (var i = 0; i < dataTotal.length; i++) {
	var data = dataTotal[i];
	let total = 0;
	for (var j = 0; j < data.length; j++) {
		var fiche = data[j];
		if (fiche["Conformite"] == "Non"){
			total += Math.ceil(fiche["DCC"]); 
		}
	}
	listeDCC.push(total);
}
//console.log(listeDCC);
lineChart("chart4" ,Semaines ,listeDCC ,"DCC (Mj)" ,"Evolution de la DCC non controlée par semaine" ,"DCC non controlée en Mj" ,"Semaines")



// DCC non controlée par zone
var listeZones = {};

for (var i = 0; i < data1.length; i++) {
	var fiche = data1[i];
	if (fiche["Conformite"] == "Non") {
		if (! Object.keys(listeZones).includes(fiche["Tranche"])){
			listeZones[fiche["Tranche"]] = 0;
		}
		listeZones[fiche["Tranche"]] += Math.ceil(fiche["DCC"]);
		
	}
}
//console.log(listeZones);
doughnutChart("chart5", Object.keys(listeZones), Object.values(listeZones), "DCC non controlée par zone")

 
// Raisons de non conformité
var motifs = {}

for (var i = 0; i < data1.length; i++) {
	var fiche = data1[i];
	if (fiche["Conformite"] == "Non") {
		if (fiche["Motif"] != ""){
			if (! Object.keys(motifs).includes(fiche["Motif"])){
				motifs[fiche["Motif"]] = 0;
			}
			motifs[fiche["Motif"]] += 1;
		}
		
	}
}
//console.log(motifs);
doughnutChart("chart6", Object.keys(motifs), Object.values(motifs), "Motifs de non conformité")














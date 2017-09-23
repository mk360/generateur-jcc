﻿/*
* Générateur de cartes JCC Pokémon
* Là où tout se fait
*/
var Text = "";
var nomAnglais = "";
var extension = ""; 
var isEX;
function Generate(){
	var nom = document.getElementById("Nom").value;
	var nom_précédent = document.getElementById("Nom_Précédent").value;
	var nom_suivant = document.getElementById("Nom_Suivant").value;
	extension = document.getElementById("Extension").value;
	var type = document.getElementById("Type").value;
	nomAnglais = document.getElementById("Nom_Eng").value;
	var nomJap = document.getElementById("Nom_Jap").value;
	isEX = $("#EX").prop("checked");
	var numéroCarte = Number(document.getElementById("Numéro_carte").value);
	var numéroCarteMax = MaxSetCarte[extension];
	var type = document.getElementById("Type").value;
	var pv = document.getElementById("PV").value;
	var faiblesse = document.getElementById("Faiblesse").value.toLowerCase();
	var faib_val = $("#Faiblesse_Défaut").prop("checked")?undefined:document.getElementById("Faiblesse_Val").value;
	var résistance = document.getElementById("Résistance").value.toLowerCase();
	var resist_val = $("#Résistance_Défaut").prop("checked")?undefined:document.getElementById("Résistance_Val").value;
	var stade = document.getElementById("Evo").value;
	var retraite = document.getElementById("Retraite").value;
	var rareté = isEX?"ultra rare":document.getElementById("Rareté").value.toLowerCase();
	var illustrateur = document.getElementById("Illustrateur").value;
	var is2ndAtk = $("#secondSpot").prop("checked");
	
	var isEvo = (stade >= 1);
	var isSecret = numéroCarte > numéroCarteMax;
	
	if($("#Middle").css("visibility","")){
		var isMiddle = $("#middle_confirm").prop("checked");
		var preEvoName = document.getElementById("preEvoName").value.split(" ")[0];
		var preEvoNumber = document.getElementById("preEvoName").value.split(" ")[1];
	}
	typeCap1 = document.getElementById("firstCap").value;
	if(document.getElementById("Result") === null){
		var TEXTAREA = document.createElement("textarea");
		TEXTAREA.id = "Result";
		$(TEXTAREA).prop("readonly","readonly");
	}
	else {
		var TEXTAREA = document.getElementById("Result");
		TEXTAREA.value = "";
	}
	
	Text = "{{Ruban Carte JCC\n| extension = "+extension + "\n| carteprécédente = "+nom_précédent+"\n| pageprécédente = " +nom_précédent+ " ("+extension+" " + (numéroCarte-1) + ")\n| cartesuivante = " +nom_suivant + "\n| pagesuivante = " + nom_suivant + " ("+extension+" " + (numéroCarte+1) + ")\n}} \n{{Infobox Carte \n| nom = "+nom+(isEX?"[[Fichier:JCC-EX.png|30px|-EX]]":"")+ "\n| nomen = "+nomAnglais+(isEX?"[[Fichier:JCC-EX.png|30px|-EX]]":"")+" \n| nomja = "+nomJap+(isEX?"EX":"")+" \n| catégorie = Pokémon\n" + (isEX?"| nomréel = " + nom+"\n| sous-catégorie = EX\n":"") + "| extension = "+extension+" \n| numerocarte = "+numéroCarte+" \n| maxsetcarte = "+numéroCarteMax+ "\n| type = " + type.toLowerCase() + "\n| pv = " + pv + (faiblesse!=""?"\n| faiblesse = " + faiblesse + (faib_val !=undefined?"\n| faiblesse-val = "+faib_val:""):"") +(résistance?"\n| resist = " + résistance + "\n" + (resist_val !=undefined?"| resist-val = "+resist_val:"| resist-val = -20"):"") + "\n" + (stade >= 1?"| stade = " + stade+"\n":"") + "| retraite = " + retraite + "\n| rareté = " + (isEX?"ultra rare":rareté) + "\n| illus = " + illustrateur + "\n}}\n"; // Ruban + Infobox
	
	Text += "'''"+nom+(isEX?"[[Fichier:JCC-EX.png|-EX|30px]]":"")+"''' est une "+(isEX?"[[Carte Pokémon|carte]] [[Pokémon-EX]] ":"[[carte Pokémon]] ")+ "de l'[[extension]] [["+extension+"]], à l'effigie du Pokémon ''homonyme'' [[" +nom+"]]."+(stade !="Base" && stade !="" && document.getElementById("preEvoName").style != "visibility:hidden"?" Elle doit être posée sur un [[:Catégorie:Carte Pokémon représentant "+preEvoName+"|"+preEvoName+"]] pour pouvoir être jouée.":"")+"\n\n"; //Introduction
	
	Text += "== Facultés ==\n\n=== " + (typeCap1!=="Attaque" && typeCap1 !== ""?"[["+typeCap1+"]] ===\n\n{{Infobox Faculté (JCC)\n| nom = " + document.getElementById("Nom1").value +" \n| description = " + document.getElementById("Description1").value + "\n}}"+(is2ndAtk?"\n\n=== [[Attaque (JCC)|Attaque]] === \n\n{{Infobox Faculté (JCC)\n| type = " + adjustFinalText(document.getElementById("Type2")) +" \n| nom = " + document.getElementById("Nom2").value + " \n| description = " + document.getElementById("Desc2").value + " \n| dégâts = " + replaceX(document.getElementById("Dégâts2").value) + "\n}}":""):"[[Attaque (JCC)|Attaque"+(is2ndAtk?"s":"")+"]] ===\n\n{{Infobox Faculté (JCC)\n| type = "+adjustFinalText(document.getElementById("Type1"))+"\n| nom = "+document.getElementById("Nom1").value +"\n| description = "+document.getElementById("Description1").value + "\n| dégâts = " + replaceX(document.getElementById("Dégâts1").value) +(is2ndAtk?"\n| type2 = " + adjustFinalText(document.getElementById("Type2")) + "\n| nom2 = " +document.getElementById("Nom2").value+"\n| description2 = " + document.getElementById("Desc2").value + "\n| dégâts2 = " + replaceX(document.getElementById("Dégâts2").value):"")+"\n}}"); //Gestion des attaque(s)
	
	if(isEX){
		Text += "\n\n=== Règle pour les [[Pokémon-EX]] ===\n\n:Lorsqu'un Pokémon-EX est mis [[K.O.|K.O]], l'adversaire récupère 2 [[Carte Récompense|cartes Récompense]].";
	}
	else {
		Text += "\n\n\n== Description du Pokémon ==\n\n:''"+document.getElementById("pkmn_desc").value +"''\n\nCette description est identique à celle de {{Jeu|"+document.getElementById("version").value+"}}.";
	}
	
	var canSpot1 = $("#Spot1Obtainable").prop("checked");
	var canSpot2 = $("#Spot2Obtainable").prop("checked");
	if(canSpot1 || canSpot2){
		Text += "\n\n\n";
		Text += "== Remarque"+(canSpot1?(["Talent","Cap.Spé."].indexOf(typeCap1) !== -1 && canSpot2?"s":""):"")+" ==\n\n";
		if(canSpot1){
			switch(typeCap1){
				case "Attaque" :
					Text += "* [[" + document.getElementById("Nom1").value + "]] " +(canSpot2?"et [[" + document.getElementById("Nom2").value + "]] sont des [[Capacité|attaques]] ":"est une [[Capacité|attaque]] ") + "des jeux vidéo que [["+nom+"]] peut apprendre.\n";
					break;
					case "Talent" :
					case "Cap.Spé." : Text += "* [[" + document.getElementById("Nom1").value + "]] est un" + (typeCap1==="Talent"?" [[Talent]]":"e [[capacité spéciale]]") + " des jeux vidéo que [[" + nom + "]] peut avoir.\n";
					break;
					default : "";
			}
		}
		if(canSpot2){
		Text +="* [["+document.getElementById("Nom2").value + "]] est une [[Capacité|attaque]] des jeux vidéo que " + nom + " peut apprendre."; 
		}
	}
	
	Text += "\n\n\n== Voir aussi ==\n\n* Pour plus d'informations sur le Pokémon : [["+nom+"]].\n* Pour plus d'informations sur l'[[extension]] : [["+extension+"]]."+
	(isEvo||isEX?"\n"+
		(isEX?"* [[Pokémon-EX]].":"* Pour plus d'informations sur s"+
			(stade > 1?"es pré-[[Évolution (JCC)|évolutions]] ":
				(isMiddle?"a lignée [[Évolution (JCC)|évolutive]] ":"a pré-[[Évolution (JCC)|évolution]] ")
			)+"dans la même extension : "+
				(stade==1?"[["+preEvoName+" ("+extension+" "+preEvoNumber+")]].":"(à compléter)"))
		:"")
	+"\n\n{{Bandeau JCC}}\n"+
	(["Talent","Cap.Spé."].indexOf(typeCap1) != -1?"\n[[Catégorie:Carte Pokémon ayant un"+
		(typeCap1=="Talent"?" Talent":"e Cap.Spé.")
	+"]]":"")+(isSecret?"\n[[Catégorie:Carte secrète]]":"");
	var placehold_finalText = "";
	if(document.getElementById("autolinks").checked){
		document.getElementById("ajaxShowStatus").innerHTML = "Veuillez patienter..";
		Text += "\n\n";
		getInterwiki();
	}
	TEXTAREA.value = Text;
	splittedContent = TEXTAREA.value.split("\n");
	TEXTAREA.rows = splittedContent.length-1; //Auto-fit (lignes)
	var columnsMaxSize = 0;
	for(i = 0; i < splittedContent.length; i++){
		if(columnsMaxSize < splittedContent[i].length){
			columnsMaxSize = splittedContent[i].length;
		}
	}
	TEXTAREA.cols = columnsMaxSize/1.75; //Auto-fit (colonnes) (et surtout rétrécissement, pour ne pas devoir gérer des textareas larges comme les États-Unis)
	if(document.getElementById("Result") === null){
		$("#compileResult td").append(TEXTAREA); // N'est supposé fonctionner que la première fois
	}
	document.getElementById("showNotice").innerHTML = "<font style='color:red; font-weight:bold;'>/!\\ ATTENTION /!\\ :</font> Il se peut que vous deviez toujours rajouter/retirer des informations, en fonction de la carte que vous créez.";
}
var yr = (1900+new Date().getYear()); // 1900 + 117 = 2017 *je le jure*

document.getElementById("currentyear").innerHTML = yr; // Au cas où si ça survit au-delà du 31 décembre 2017
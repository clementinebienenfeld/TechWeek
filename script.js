// recuperer les réponses

const form = document.getElementById("formulaire");
const activite = form.elements["selectionActivite"];
const arrondissement = form.elements["arrondissement"];

// API
async function associationListe() {
  let activiteSelect = activite.value;
  let arrondissementSelect = arrondissement.value;
  let response = await fetch(
    "https://opendata.paris.fr/api/records/1.0/search/?dataset=liste_des_associations_parisiennes&q=&facet=pr_nom_statutaire&facet=cp_adresse_code_postal&facet=sa_secteur_d_activit_1&facet=sg_secteur_gographique%E2%80%8B"
  );
  let data = await response.json();
  let tab = [];
  let base = data.records
  base.forEach((element) => {
    console.log(element)
    if (
      arrondissementSelect ===
        element.fields.cp_adresse_code_postal.toString() &&
      activiteSelect === element.fields.sa_secteur_d_activit_1
    ) {
      console.log(1);
      tab.push(element.fields.pr_nom_statutaire);
      console.log(tab)
    } else {
      console.log(2);
    }
  });
  /* 
forEach (let i = 0; i <= 70993; i++) {
    if (
      data.records[i].fields.cp_adresse_code_postal === arrondissementSelect &&
      data.records[i].fields.sa_secteur_d_activit_1 === activiteSelect
    ) {
      tab.push(data.records[i].fields.pr_nom_statutaire);
    }
  }*/
  console.log(tab);
  document.getElementById("tableauResultat").textContent = tab;
}

//afficher la liste
document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault();
  associationListe();
});

/*
async function associationListe() {
  let activiteSelect = activite.value;
  let arrondissementSelect = arrondissement.value;
  let response = await fetch(
    "https://opendata.paris.fr/api/records/1.0/search/?dataset=liste_des_associations_parisiennes&q=&facet=pr_nom_statutaire&facet=cp_adresse_code_postal&facet=sa_secteur_d_activit_1&facet=sg_secteur_gographique%E2%80%8B"
  );
  let data = await response.json();
  let tab = [];
  for (let i = 0; i <= 70993; i++) {
    console.log( data.records[i].fields.cp_adresse_code_postal)
    if (
      data.records[i].fields.cp_adresse_code_postal === arrondissementSelect  &&
      data.records[i].fields.sa_secteur_d_activit_1 === activiteSelect
    ) {
      tab.push(data.records[i].fields.pr_nom_statutaire);
    }
  }
  document.getElementById("tableauResultat").textContent = tab;
} */

const url = "https://dptinfo.iutmetz.univ-lorraine.fr/applis/stages/stages_historique.php";
const id = "mbellal75";
const mdp = "tT#&kX%b";
const resultsUrl = "https://devweb.iutmetz.univ-lorraine.fr/~bellal13u/cypress/results.php";

const tableSelector = "table.table-bordered.table-striped.table-condensed";

Cypress.Commands.add('collectAndSendTableData', (tableSelector, targetUrl, searchDescription) => {
  cy.get(tableSelector).then($table => {
    const data = [];
    $table.find('tr').each((index, row) => {
      const rowData = [];
      Cypress.$(row).find('td').each((index, cell) => {
        rowData.push(Cypress.$(cell).text().trim());
      });
      data.push(rowData);
    });

    cy.request({
      method: 'POST',
      url: targetUrl,
      body: {
        searchDescription: searchDescription,
        data: JSON.stringify(data)
      },
      form: true,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });

  }).then((response) => {
    console.log(response);
    expect(response.status).to.eq(200); // Pour vérifier que les résultats sont bien envoyés (ils sont bien envoyés)
  });
});

describe('template spec', () => {
  it('passes', () => {
    cy.visit(url);
    cy.get("#login").type(id);
    cy.get("#psw").type(mdp);
    cy.get(".btn").click();
    cy.get('a[href*="stages_historique.php"]').click()
    
    // Recherche par mots clés
    cy.get("#MotCleValue").select("INFORMATIQUE");
    cy.get("#MotCle1Value").select("JAVA");
    cy.get("#MotCle2Value").select("FLUTTER");
    // Connecteur
    cy.get("#LogiqueValue").select("Ou");
    // Lancer la recherche par mots clés
    cy.get(".btn.btn-success").click();
    // Get le tableau de résultats
    cy.collectAndSendTableData(tableSelector, resultsUrl, "Recherche par mots-clés");    

    // Nouvelle recherche
    cy.get("#Btn_NlleRecherche1").click();

    // Rechercher par ville
    cy.get("#VilleValue").select("Luxembourg");
    // Connecteur
    cy.get("#LogiqueValue").select("Ou");
    // Lancer la recherche par ville
    cy.get(".btn.btn-success").click();
    // Get le tableau de résultats
    cy.collectAndSendTableData(tableSelector, resultsUrl, "Recherche par ville");    

    // Nouvelle recherche
    cy.get("#Btn_NlleRecherche1").click();

    // Rechercher par entreprise
    cy.get("#EntrepriseValue").select("Banque de Luxembourg");
    // Connecteur
    cy.get("#LogiqueValue").select("Ou");
    // Lancer la recherche par entreprise
    cy.get(".btn.btn-success").click();
    // Get le tableau de résultats
    cy.collectAndSendTableData(tableSelector, resultsUrl, "Recherche par entreprise");    

    // Nouvelle recherche
    cy.get("#Btn_NlleRecherche1").click();

    // Rechercher par pays
    cy.get("#PaysValue").select("Luxembourg");
    // Paramètre de recherche supplémentaire pour affiner la recherche (trop de résultats sinon)
    cy.get("#AnneeValue").select("2024");
    // Connecteur
    cy.get("#LogiqueValue").select("Ou");
    // Lancer la recherche par pays
    cy.get(".btn.btn-success").click();
    // Get le tableau de résultats
    cy.collectAndSendTableData(tableSelector, resultsUrl, "Recherche par pays");    

    // Nouvelle recherche
    cy.get("#Btn_NlleRecherche1").click();

    // Rechercher par année
    cy.get("#AnneeValue").select("2023");
    // Rechercher par section
    cy.get("#SectionValue").select("BUT2RA");
    // Rechercher par département
    cy.get("#CPValue").select("57");
    // Connecteur
    cy.get("#LogiqueValue").select("Ou");
    // Lancer la recherche par section, année, et département
    cy.get(".btn.btn-success").click();
    // Get le tableau de résultats
    cy.collectAndSendTableData(tableSelector, resultsUrl, "Recherche par section/année/département");

    cy.visit(resultsUrl);
  })
})
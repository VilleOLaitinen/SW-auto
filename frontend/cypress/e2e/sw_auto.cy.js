describe("User", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  it("home page can be visited", function () {
    cy.contains("Tiedätkö autosi arvon?");
    cy.contains(
      "Uusi ja luotettava tapa saada kolmannen osapuolen arvio autostasi!"
    );
  });

  it("register page can be visited", function () {
    cy.contains("Rekisteröidy").click();
    cy.contains("Register!");
  });

  it("login page can be visited", function () {
    cy.contains("Kirjaudu Sisään").click();
    cy.contains("Käyttäjätunnus");
    cy.contains("Salasana");
  });

  it("user can log in (logged State Management works)", function () {
    cy.contains("Kirjaudu Sisään").click();
    cy.get("input:first").type("Erkki999");
    cy.get("input:last").type("password");
    cy.contains("Kirjaudu Sisään").click();
    cy.contains("Hei Erkki Esimerkki!");
  });

  it("search view can be visited", function () {
    cy.contains("Tarkista nyt").click();
    cy.contains("Syötä rekisteritunnuksesi ja me etsimme autosi tiedot!");
  });
});

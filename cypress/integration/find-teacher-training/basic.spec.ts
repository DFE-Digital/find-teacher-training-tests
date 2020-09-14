/// <reference types="Cypress" />

Cypress.Cookies.defaults({
  whitelist: "_find_teacher_training_session"
})

describe("Basic", () => {
  before(() => {
    cy.clearCookies()
    cy.visit(URL);
    cy.contains("Find courses with vacancies").click();
    cy.contains("Continue").click();
  });


  afterEach(() => {
    cy.checkForDefaultTitle();
  });

  it("should have correct title", () => {
    cy.title().should("include", "Find courses by location or by training provider");
  });

  it("should show a validation error if user does not select a location", () => {
    cy.contains("Continue").click();
    cy.get(".govuk-error-summary").should("exist");
  });

  it("should let user search Across England", () => {
    cy.contains("Across England").click();
    cy.contains("Continue").click();
    cy.get(".govuk-error-summary").should("not.exist");
    cy.get("h1").should("contain", "Find courses by subject");
  });

  it("should show a validation error if user does not select a subject", () => {
    cy.contains("Continue").click();
    cy.get(".govuk-error-summary").should("exist");
  });

  it("should let user search for Business Studies", () => {
    cy.contains("Secondary").click();
    cy.contains("Business studies").click();
    cy.contains("Continue").click();
    cy.get(".govuk-error-summary").should("not.exist");
    cy.get("h1").should("contain", "Teacher training courses");
  });

  it("should let users view a course", () => {
    cy.get(".search-result-link:first").click();
    cy.get("h1").should("contain", "Business");
  });

  it("should show an enriched course", () => {
    cy.contains("Apply").should("exist");
  });
});

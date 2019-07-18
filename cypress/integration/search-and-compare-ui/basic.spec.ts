/// <reference types="Cypress" />

describe("Basic", () => {
  before(() => {
    cy.visit(URL);
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
    const courseTitle = "Ashton on Mersey School SCITT";
    cy.contains(courseTitle).click({ force: true }); // Forcing because Cypress erroneously thinks the element can't be interacted with.
    cy.get("h1").should("contain", courseTitle);
  });

  it("should show an enriched course", () => {
    cy.contains("How school placements work").should("exist");
  });
});

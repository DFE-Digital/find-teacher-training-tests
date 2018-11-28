/// <reference types="Cypress" />

describe("Geocoding", () => {
  before(() => {
    cy.visit(URL);
  });

  it("should let user search by location", () => {
    cy.contains("By postcode").click();
    cy.get("#location").type("westmin");
    cy.contains("Westminster, London, UK").click();
    cy.contains("Continue").click();
    cy.get(".govuk-error-summary").should("not.exist");
    cy.get("h1").should("contain", "Find courses by subject");
  });

  it("should let user search for Business Studies", () => {
    cy.contains("Secondary").click();
    cy.contains("Business studies").click();
    cy.contains("Continue").click();
    cy.get(".govuk-error-summary").should("not.exist");
    cy.get("h1").should("contain", "Teacher training courses");
  });

  it("should let users view a course", () => {
    const courseTitle = "Harris Initial Teacher Education";
    cy.contains(courseTitle).click({ force: true }); // Forcing because Cypress erroneously thinks the element can't be interacted with.
    cy.get("h1").should("contain", courseTitle);
  });
});

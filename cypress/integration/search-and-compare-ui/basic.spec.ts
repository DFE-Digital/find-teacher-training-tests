/// <reference types="Cypress" />

const URL = "https://find-postgraduate-teacher-training.education.gov.uk";

describe("Basic", () => {
  before(() => {
    cy.visit(URL);
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
    cy.get("h1").should("contain", "Find courses by suject");
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
    const courseTitle = "Business Studies with Academies Enterprise Trust & Tendring Teaching School Alliance: Eastern";
    cy.contains(courseTitle).click();
    cy.get("h1").should("contain", courseTitle);
  });
});

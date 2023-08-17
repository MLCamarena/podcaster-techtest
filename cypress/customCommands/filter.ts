/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

Cypress.Commands.add('filterText', (text) => {
  cy.findByLabelText('Filter podcasts').should('exist').type(text);
});

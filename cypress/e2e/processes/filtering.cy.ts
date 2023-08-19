/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Podcast list filtering', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('BASE_URL')}`);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('List reduced to one element', () => {
    cy.intercept(Cypress.env('PODCAST_LIST_URL'), { fixture: 'podcastList' }).as('podcastListRequest');
    cy.intercept(
      `${Cypress.env('PODCAST_DETAILS_URL')}${Cypress.env('PODCAST_ID')}${Cypress.env('PODCAST_DETAILS_URL_SUFFIXES')}`,
      { fixture: 'podcastDetails' },
    ).as('podcastDetailsRequest');
    cy.wait('@podcastListRequest');
    // Before the type
    cy.get(`[data-cy="podcastsChip"]`).contains('5');
    cy.get('[data-cy^="podcast-card-"]').should('have.length', 5);
    cy.filterText('Joe');
    //cy.findByLabelText("Filter podcasts").should('exist').type('Joe');
    // After the type
    cy.get(`[data-cy="podcastsChip"]`).contains('1');
    cy.get('[data-cy^="podcast-card-"]').should('have.length', 1);
  });

  it('List empty', () => {
    cy.intercept(Cypress.env('PODCAST_LIST_URL'), { fixture: 'podcastList' }).as('podcastListRequest');
    cy.intercept(
      `${Cypress.env('PODCAST_DETAILS_URL')}${Cypress.env('PODCAST_ID')}${Cypress.env('PODCAST_DETAILS_URL_SUFFIXES')}`,
      { fixture: 'podcastDetails' },
    ).as('podcastDetailsRequest');
    cy.wait('@podcastListRequest');
    // Before the type
    cy.get(`[data-cy="podcastsChip"]`).contains('5');
    cy.get('[data-cy^="podcast-card-"]').should('have.length', 5);
    cy.filterText('Manuel');
    // After the type
    cy.get(`[data-cy="podcastsChip"]`).contains('0');
    cy.get('[data-cy^="podcast-card-"]').should('have.length', 0);
  });
});

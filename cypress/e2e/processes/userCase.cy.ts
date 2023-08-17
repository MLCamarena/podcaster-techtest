/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Application user cases', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('BASE_URL')}`);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('User filters a podcast, click it, notice result alert, click on an episode and play', () => {
    cy.intercept(Cypress.env('PODCAST_LIST_URL'), { fixture: 'podcastList' }).as('podcastListRequest');
    cy.intercept(
      `${Cypress.env('PODCAST_DETAILS_URL')}${Cypress.env('PODCAST_ID')}${Cypress.env('PODCAST_DETAILS_URL_SUFFIXES')}`,
      { fixture: 'podcastDetails' },
    ).as('podcastDetailsRequest');
    cy.wait('@podcastListRequest');
    cy.get(`[data-cy="podcastsChip"]`).contains('5');
    cy.get('[data-cy^="podcast-card-"]').should('have.length', 5);
    cy.filterText('Joe');
    cy.findByText('The Joe Budden Podcast').click();
    cy.wait('@podcastDetailsRequest');
    cy.findByText('Showing only 20 last results.').should('exist');
    cy.findByText('Episode 647 | "Double Rebound"').should('exist').click();
    cy.get('audio').should('exist');
  });

  // More user cases, there are no many posible paths in this app
});

/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('App navigation flow', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('BASE_URL')}`);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Home route', () => {
    cy.intercept(Cypress.env('PODCAST_LIST_URL'), { fixture: 'podcastList' }).as('podcastListRequest');
    cy.wait('@podcastListRequest');
    cy.url().should('eq', `${Cypress.env('BASE_URL')}`);
  });

  it('Podcast detail route', () => {
    cy.intercept(Cypress.env('PODCAST_LIST_URL'), { fixture: 'podcastList' }).as('podcastListRequest');
    cy.intercept(
      `${Cypress.env('PODCAST_DETAILS_URL')}${Cypress.env('PODCAST_ID')}${Cypress.env('PODCAST_DETAILS_URL_SUFFIXES')}`,
      { fixture: 'podcastDetails' },
    ).as('podcastDetailsRequest');
    cy.wait('@podcastListRequest');
    cy.get(`[data-cy="${Cypress.env('PODCAST_ID')}"]`).click();
    cy.wait('@podcastDetailsRequest');
    cy.url().should('eq', `${Cypress.env('BASE_URL')}podcast/${Cypress.env('PODCAST_ID')}`);
  });

  it('Episode detail route', () => {
    cy.intercept(Cypress.env('PODCAST_LIST_URL'), { fixture: 'podcastList' }).as('podcastListRequest');
    cy.intercept(
      `${Cypress.env('PODCAST_DETAILS_URL')}${Cypress.env('PODCAST_ID')}${Cypress.env('PODCAST_DETAILS_URL_SUFFIXES')}`,
      { fixture: 'podcastDetails' },
    ).as('podcastDetailsRequest');
    cy.wait('@podcastListRequest');
    cy.get(`[data-cy="${Cypress.env('PODCAST_ID')}"]`).click();
    cy.wait('@podcastDetailsRequest');
    cy.get(`[data-cy="${Cypress.env('EPISODE_ID')}"]`).click();
    cy.url().should(
      'eq',
      `${Cypress.env('BASE_URL')}podcast/${Cypress.env('PODCAST_ID')}/episode/${Cypress.env('EPISODE_ID')}`,
    );
  });

  it('Return home in header', () => {
    cy.intercept(Cypress.env('PODCAST_LIST_URL'), { fixture: 'podcastList' }).as('podcastListRequest');
    cy.intercept(
      `${Cypress.env('PODCAST_DETAILS_URL')}${Cypress.env('PODCAST_ID')}${Cypress.env('PODCAST_DETAILS_URL_SUFFIXES')}`,
      { fixture: 'podcastDetails' },
    ).as('podcastDetailsRequest');
    cy.wait('@podcastListRequest');
    cy.get('[data-cy="app-title"]').click();
    cy.url().should('eq', `${Cypress.env('BASE_URL')}`);
  });

  it('Return podcast details in sidebar', () => {
    cy.intercept(Cypress.env('PODCAST_LIST_URL'), { fixture: 'podcastList' }).as('podcastListRequest');
    cy.intercept(
      `${Cypress.env('PODCAST_DETAILS_URL')}${Cypress.env('PODCAST_ID')}${Cypress.env('PODCAST_DETAILS_URL_SUFFIXES')}`,
      { fixture: 'podcastDetails' },
    ).as('podcastDetailsRequest');
    cy.wait('@podcastListRequest');
    cy.get(`[data-cy="${Cypress.env('PODCAST_ID')}"]`).click();
    cy.wait('@podcastDetailsRequest');
    cy.get(`[data-cy="${Cypress.env('EPISODE_ID')}"]`).click();
    cy.get('[data-cy="podcast-sidebar-title"]').click();
    cy.url().should('eq', `${Cypress.env('BASE_URL')}podcast/${Cypress.env('PODCAST_ID')}`);
  });
});

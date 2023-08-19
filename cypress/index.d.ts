export {};
declare global {
  namespace Cypress {
    interface Chainable {
      filterText(text: string): Chainable<void>;
    }
  }
}

describe('Blog-app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const user = {
      name: 'Cypress',
      username: 'cypress-user',
      password: 'password'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user);

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('username');
  });

  describe('Login', function() {
    it('succeeds with the correct credentials', function() {
      cy.get('#username').type('cypress-user');
      cy.get('#password').type('password');
      cy.get('#login').click();

      cy.contains('logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('#username').type('cypress-user');
      cy.get('#password').type('wrong');
      cy.get('#login').click();

      cy.contains('Wrong username or password.');
    })
  });
});

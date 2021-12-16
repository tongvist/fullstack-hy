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

    it('fails with wrong credentials and shows an error message', function() {
      cy.get('#username').type('cypress-user');
      cy.get('#password').type('wrong');
      cy.get('#login').click();

      cy.get('.error')
        .should('contain', 'Wrong username or password.')
        .and('have.css', 'border', '2px solid rgb(255, 0, 0)');
    })
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'cypress-user', password: 'password' });
    });

    it('A new blog can be created', function() {
      cy.contains('New Blog').click();
      
      cy.get('#new-blog-title').type('New Blog from Cypress!');
      cy.get('#new-blog-author').type('Author of the Blog');
      cy.get('#new-blog-url').type('does-not.matter/blog');
      
      cy.contains('Save').click();
      
      cy.get('.blog-list').contains('New Blog from Cypress!');
    });

    it('A blog can be liked', function() {
      cy.createBlog({ 
        title: 'A Blog bypassing UI',
        author: 'Blog Author',
        url: 'url-to-the.blog'
       });

      cy.contains('View').click();
      cy.get('.blog').contains('like').click();
    });

    it.only('A blog can be deleted only by the user who added it', function() {
      cy.createBlog({ 
        title: 'A Blog bypassing UI',
        author: 'Blog Author',
        url: 'url-to-the.blog'
       });
      
      cy.get('.blog-list').contains('A Blog bypassing UI').parent().contains('View').click();
      cy.contains('delete').click();

      cy.createBlog({ 
      title: 'A Blog bypassing UI',
      author: 'Blog Author',
      url: 'url-to-the.blog'
      });

      cy.createBlog({ 
      title: 'A Blog 2',
      author: 'Blog Author II',
      url: 'url-to-the.blog/2'
      });

      cy.contains('logout').click();
      
      cy.createUser({
        name: 'Not the Same',
        username: 'should_not_work',
        password: 'password'
      });

      cy.login({ username: 'should_not_work', password: 'password' });

      cy.get('.blog-list').contains('A Blog 2').parent().contains('View').click();
      cy.get('.blog-list').contains('A Blog 2').parent().get('.delete-blog-btn').should('not.exist');
    });
  });
});

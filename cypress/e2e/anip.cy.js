describe('Login ANIP', () => {
  beforeEach(() => {
    // Stub the geolocation API before loading the page
    cy.visit('https://stg-anip.seamfix.com/#/public/login', {
      onBeforeLoad(win) {
        // Stub the geolocation API to return specific coordinates
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
          return cb({ coords: { latitude: 6.5244, longitude: 3.3792 } }); // Mock location for Lagos, Nigeria
        });
        
      }
    });
  });

  it('should log in with valid credentials and handle location permission', () => {
    // Enter valid email address
    cy.get('input[name="username"]').type('sfxadmin@yopmail.com');

    // Enter valid password
    cy.get('input[name="password"]').type('password');

    // Click the sign-in button
    cy.get('.ion-color-warning').click();

    // Verify successful login by checking the URL
    cy.url().should('include', '/dashboard'); // Adjust based on the actual redirect path

    // Ensure post-login element is visible
    cy.xpath("//h2[text()=\"Vue d'approbation\"]").should('be.visible');

    cy.get('span.button-text')
    .should('contain.text', 'French');

    cy.get('label[for="ion-rb-1"]')
      .click();

    cy.get('span.button-text')
      .should('contain.text', 'English');

  });
});

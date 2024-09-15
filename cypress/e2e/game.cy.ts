describe('Star Wars Game', () => {
  beforeEach(() => {
    cy.visit('/', { timeout: 60000 });
  });

  it('should allow selecting resource type and start the game', () => {
    cy.get('mat-select').click();
    cy.get('mat-option').contains('People').click();

    cy.get('button').contains('Play').click();


    cy.get('mat-card').should('have.length', 2);
  });

  it('should play the starship game and display the winner', () => {
    cy.get('mat-select').click();
    cy.get('mat-option').contains('Starships').click();

    cy.get('button').contains('Play').click();


    cy.get('mat-card').should('have.length', 2);


    cy.contains('Winner').should('exist');
  });

  it('should update score after multiple plays', () => {
    cy.get('mat-select').click();
    cy.get('mat-option').contains('People').click();

    cy.get('button').contains('Play').click();


    cy.contains('Left Player')
      .next()
      .invoke('text')
      .then((leftScore1) => {
        cy.contains('Right Player')
          .next()
          .invoke('text')
          .then((rightScore1) => {
            cy.get('button').contains('Play').click(); 

            cy.contains('Left Player')
              .next()
              .invoke('text')
              .should((leftScore2) => {
                cy.contains('Right Player')
                  .next()
                  .invoke('text')
                  .should((rightScore2) => {
                    
                    expect(parseInt(leftScore2)).to.be.oneOf([
                      parseInt(leftScore1),
                      parseInt(leftScore1) + 1,
                    ]);
                    expect(parseInt(rightScore2)).to.be.oneOf([
                      parseInt(rightScore1),
                      parseInt(rightScore1) + 1,
                    ]);
                  });
              });
          });
      });
  });
});

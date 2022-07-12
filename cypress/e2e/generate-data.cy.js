describe('Get reports for the 4 teams', () => {
    let numberOfDatesIndex;

    it('Mon', () => {
        numberOfDatesIndex = 24;
        cy.visit('https://bowlsnet.uk/Leeds/MonComb');

        cy.frameLoaded('#x-Pframe');
        cy.iframe('#x-Pframe')
            .find(
                '#x-Menu > .menuSect:nth-child(2) > .menu-btn[onclick*="MenuPage(\'Info\')"]'
            )
            .click();
        cy.iframe('#x-Pframe')
            .find('#bbar > .bbar-tab[onclick*="ShowSubPage(4)"]')
            .click();
        cy.iframe('#x-Pframe').find('#r1').click();
        cy.iframe('#x-Pframe').find('#oTab1').click();
        cy.iframe('#x-Pframe').find('#oRes').click();
        cy.iframe('#x-Pframe').find('#oResFull').click();
        cy.iframe('#x-Pframe')
            .find('#x-DlgF > .dGrp > select[name=oResF]')
            .select(1);
        cy.iframe('#x-Pframe')
            .find('#x-DlgF > .dGrp > select[name=oResT]')
            .select(numberOfDatesIndex);
        cy.iframe('#x-Pframe').find('#dRBtn').click();
    });

    it('Tues', () => {
        numberOfDatesIndex = 29;
        cy.visit('https://bowlsnet.uk/LeedsParkVets/Tue');

        cy.frameLoaded('#x-Pframe');
        cy.iframe('#x-Pframe')
            .find(
                '#x-Menu > .menuSect:nth-child(2) > .menu-btn[onclick*="MenuPage(\'Info\')"]'
            )
            .click();
        cy.iframe('#x-Pframe')
            .find('#bbar > .bbar-tab[onclick*="ShowSubPage(4)"]')
            .click();
        cy.iframe('#x-Pframe').find('#r1').click();
        cy.iframe('#x-Pframe').find('#oTab1').click();
        cy.iframe('#x-Pframe').find('#oRes').click();
        cy.iframe('#x-Pframe').find('#oResFull').click();
        cy.iframe('#x-Pframe')
            .find('#x-DlgF > .dGrp > select[name=oResF]')
            .select(1);
        cy.iframe('#x-Pframe')
            .find('#x-DlgF > .dGrp > select[name=oResT]')
            .select(numberOfDatesIndex);
        cy.iframe('#x-Pframe').find('#dRBtn').click();
    });

    it('Thurs', () => {
        numberOfDatesIndex = 28;

        cy.visit('https://bowlsnet.uk/LeedsParkVets/Thu');
        cy.frameLoaded('#x-Pframe');
        cy.iframe('#x-Pframe')
            .find(
                '#x-Menu > .menuSect:nth-child(2) > .menu-btn[onclick*="MenuPage(\'Info\')"]'
            )
            .click();
        cy.iframe('#x-Pframe')
            .find('#bbar > .bbar-tab[onclick*="ShowSubPage(4)"]')
            .click();
        cy.iframe('#x-Pframe').find('#r1').click();
        cy.iframe('#x-Pframe').find('#oTab1').click();
        cy.iframe('#x-Pframe').find('#oRes').click();
        cy.iframe('#x-Pframe').find('#oResFull').click();
        cy.iframe('#x-Pframe')
            .find('#x-DlgF > .dGrp > select[name=oResF]')
            .select(1);
        cy.iframe('#x-Pframe')
            .find('#x-DlgF > .dGrp > select[name=oResT]')
            .select(numberOfDatesIndex);
        cy.iframe('#x-Pframe').find('#dRBtn').click();
    });

    it('Sat', () => {
        numberOfDatesIndex = 27;
        cy.visit('https://bowlsnet.uk/Leeds/Sat');

        cy.frameLoaded('#x-Pframe');
        cy.iframe('#x-Pframe')
            .find(
                '#x-Menu > .menuSect:nth-child(2) > .menu-btn[onclick*="MenuPage(\'Info\')"]'
            )
            .click();
        cy.iframe('#x-Pframe')
            .find('#bbar > .bbar-tab[onclick*="ShowSubPage(4)"]')
            .click();
        cy.iframe('#x-Pframe').find('#r1').click();
        cy.iframe('#x-Pframe').find('#oTab1').click();
        cy.iframe('#x-Pframe').find('#oRes').click();
        cy.iframe('#x-Pframe').find('#oResFull').click();
        cy.iframe('#x-Pframe')
            .find('#x-DlgF > .dGrp > select[name=oResF]')
            .select(1);
        cy.iframe('#x-Pframe')
            .find('#x-DlgF > .dGrp > select[name=oResT]')
            .select(numberOfDatesIndex);
        cy.iframe('#x-Pframe').find('#dRBtn').click();
    });
});

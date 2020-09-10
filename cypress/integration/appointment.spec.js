describe('Appointments', () => {
	beforeEach(() => {
		cy.request('GET', '/api/debug/reset');

		cy.visit('/');

		cy.contains('Monday');
	});

	it('should cancel an interview', () => {
		cy.get('[alt=Delete]').click({ force: true });

		cy.contains('Confirm').click();

		cy.contains('Deleting');

		cy.contains('Deleting').not();

		cy.contains('.appointment__card--show', 'Archie Cohen').not();
	});
});

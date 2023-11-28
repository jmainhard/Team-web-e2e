describe("Club", () => {
	it("[SUCCESS C-1] club details", () => {
		cy.login().then((token) => {
			cy.getClubs(token).then((clubes) => {
				cy.visit("/", {
					failOnStatusCode: false,
				});
				cy.get(`div[id=${clubes[0]._id}]`).click();
				cy.get('span[class="text-h3"]').contains(clubes[0].name);
			});
		});
	});
});

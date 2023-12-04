describe("Home", () => {
	it("[Error H-1] Redirect to /login page when token is not provided", () => {
		cy.visit("/");
		cy.url().should(
			"eq",
			"http://pruebas-soft.s3-website.us-east-2.amazonaws.com/login"
		);
	});

	describe("As a logged user", () => {
		var adminToken = null;

		beforeEach(() => {
			// TODO: saveLocalStorage plugin to preserve localStorage between Cypress tests?
			cy.login().then((token) => (adminToken = token));
		});

		it("[SUCCESS H-2] Home correct", () => {
			cy.visit("/");
			cy.window().then((win) => {
				const userName = JSON.parse(win.localStorage.getItem("user")).user.name;
				cy.get("h2").should("contain", `Welcome ${userName}`);
			});
		});

		it("[SUCESS H-3] Get list of clubs", () => {
			cy.visit("/");
			cy.getClubs(adminToken).then((clubs) => {
				clubs.forEach((club) => {
					// Evaluate: What happens if there are a lot of clubs?
					cy.get(`div[id=${club._id}]`).should("exist");
				});
			});
		});

		/**
		 * Add a club given its name and description. Asserts that the club is added to the list of clubs with the matching class.
		 */
		it("[SUCCESS H-4] Add Club", () => {
			cy.visit("/");
			let clubName = "Any Name";
			let clubDescription = "Any Description";
			cy.getClubs(adminToken).then((clubs) => {
				let expectedClubsLength = clubs.length; // the new club doesn't has the same class so it's not counted
				cy.addClub(clubName, clubDescription);
				cy.get(
					// this could be a better html selector e.g. a div container with all the clubs.
					'div[class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable"]'
				).should("have.length", expectedClubsLength);
				cy.get(".text-h3").should("contain", clubName);
				cy.get("div[id=toolbar]").should("contain", clubName);
			});
		});
	});
});

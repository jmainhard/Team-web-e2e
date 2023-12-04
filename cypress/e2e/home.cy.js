describe("Home", () => {
	it("[Error H-1] Redirect to /login page when token is not provided", () => {
		cy.visit("/");
		cy.url().should(
			"eq",
			"http://pruebas-soft.s3-website.us-east-2.amazonaws.com/login"
		);
	});

	describe("As a logged user", () => {
		var token = null;

		beforeEach(() => {
			// FIXME: We should get the token from the login command
			// TODO: saveLocalStorage plugin to preserve localStorage between Cypress tests?
			cy.login();
			token = cy.window().then((win) => {
				token = JSON.parse(win.localStorage.getItem("user")).token;
			});
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
			cy.getClubs(token).then((clubs) => {
				clubs.forEach((club) => {
					// Evaluate: What happens if there are a lot of clubs?
					cy.get(`div[id=${club._id}]`).should("exist");
				});
			});
		});
	});
});

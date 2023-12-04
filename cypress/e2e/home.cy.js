describe("Home", () => {
	it("[Error H-1] Redirect to /login page when token is not provided", () => {
		cy.visit("/");
		cy.url().should(
			"eq",
			"http://pruebas-soft.s3-website.us-east-2.amazonaws.com/login"
		);
	});

	describe("As a logged user", () => {
		beforeEach(() => {
			cy.login();
		});

		it.only("[SUCCESS H-2] Home correct", () => {
			cy.visit("/");

			cy.window().then((win) => {
				const userName = JSON.parse(win.localStorage.getItem("user")).user.name;
				cy.get("h2").should("contain", `Welcome ${userName}`);
			});
		});
	});
});

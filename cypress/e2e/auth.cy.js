describe("Login", () => {
	it("[SUCCESS L-1] Correct login with verified user", () => {
		cy.visit("/login", {
			failOnStatusCode: false,
		});
		cy.get('input[id="login-email"]').type("j.mainhard01@ufromail.cl");
		cy.get('input[name="login-password"]').type("8P7zMbv3");
		cy.get("button").click();

		cy.url().should("include", "/");
	});

	it("[Error L-2] invalid credentials", () => {
		cy.visit("/login", {
			failOnStatusCode: false,
		});
		cy.get('input[id="login-email"').type("correo@incorrecto.cl");
		cy.get('input[id="login-password"').type("correo");
		cy.get("button").click();

		cy.get(".text-negative").should("text", "invalid credentials");
	});
});

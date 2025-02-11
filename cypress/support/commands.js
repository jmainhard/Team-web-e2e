// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * Send login request with email and password
 */
Cypress.Commands.add("login", () => {
	return cy
		.request({
			method: "POST",
			// read from config (public)
			url: `${Cypress.env("api_server")}/auth/login`,
			body: {
				// read from env (private)
				email: Cypress.env("email"),
				password: Cypress.env("password"),
			},
		})
		.then(({ body }) => {
			const { token, user } = body;
			cy.window().then((win) => {
				win.localStorage.setItem("user", JSON.stringify({ token, user }));
				return token;
			});
		});
});

/**
 * Send request to clubs endpoint with the input token and return the user clubs
 */
Cypress.Commands.add("getClubs", (token) => {
	cy.request({
		url: `${Cypress.env("api_server")}/clubs`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then(({ body }) => {
		return body.clubs;
	});
});

/**
 * Add a club given its name and description
 */
Cypress.Commands.add("addClub", (name, description) => {
	cy.get("div[for=add-club]").click();
	const clubDescriptionInput = cy.get('input[aria-label="Club description"]');
	const clubNameInput = cy.get('input[aria-label="Club name"]');
	const submitButton = cy.contains("button", "Add Club");

	if (name) {
		clubNameInput.type(name);
	}
	if (description) {
		clubDescriptionInput.type(description);
	}
	submitButton.click();
});

Cypress.Commands.add("gotoFirstClub", () => {
	cy.login().then((token) => {
		cy.getClubs(token).then((clubes) => {
			cy.visit("/", {
				failOnStatusCode: false,
			});
			cy.get(`div[id=${clubes[0]._id}]`).click();
		});
	});
});

/**
 *  Add a member to the club via UI
 */
Cypress.Commands.add("addMember", (firstName, lastName, email) => {
	cy.contains("button", "New member").click();
	cy.get('input[name="member-name"]').type(firstName);
	cy.get('input[name="member-lastname"]').type(lastName);
	cy.get('input[name="member-email"]').type(email);
	cy.contains("button", "Add Member").click();
});

Cypress.Commands.add("getMembers", (clubId) => {
	cy.login().then((token) => {
		cy.request({
			url: `${Cypress.env("api_server")}/clubs/${clubId}/members`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(({ body }) => {
			return body.members;
		});
	});
});

Cypress.Commands.add("getFirstClub", (token) => {
	cy.getClubs(token).then((clubs) => clubs[0]);
});

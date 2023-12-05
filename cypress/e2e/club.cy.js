import { faker } from "@faker-js/faker";
import { getMemberCount } from "../support/helpers";

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

	it("[Error C-2]: Do not reach the website if token is missing", () => {
		cy.visit("/club", {
			failOnStatusCode: false,
		});
		cy.url().should("include", "/login");
	});

	describe("As a logged user", () => {
		beforeEach(() => {
			// TODO: saveLocalStorage plugin to preserve localStorage between Cypress tests?
			cy.login();
		});

		it("[SUCCESS C-3]: Add member", () => {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();
			const email = faker.internet.email();

			cy.gotoFirstClub();

			cy.get(".q-inner-loading").should("not.exist");

			// TODO: Should follow KISS and DRY
			cy.get(".text-h6")
				.invoke("text")
				.then((text) => {
					// Get the initial count of members
					const initialCount = getMemberCount(text);

					cy.addMember(firstName, lastName, email);

					// Check if the member list has increased by 1
					cy.get("#members-table-container tbody tr").should(
						"have.length",
						initialCount + 1
					);

					// Check if the member counter has increased by 1
					cy.get(".text-h6")
						.invoke("text")
						.then((text) => {
							const newCount = getMemberCount(text);
							expect(newCount).to.eq(initialCount + 1);
						});
				});
		});

		it("[Error C-4]: Should fail to add member due to missing email", () => {
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();
			cy.gotoFirstClub();
			cy.addMember(firstName, lastName, " ");
			cy.contains("email is required and must be a valid email").should(
				"be.visible"
			);
		});
	});
});

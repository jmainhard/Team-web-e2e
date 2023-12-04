const { defineConfig } = require("cypress");

module.exports = defineConfig({
	env: {
		api_server: "http://3.138.52.135:3000",
	},
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		baseUrl: "http://pruebas-soft.s3-website.us-east-2.amazonaws.com",
	},
	screenshotOnRunFailure: true,
	video: false,
});

/**
 * Helper function to get member count
 */
export const getMemberCount = (text) => {
	// get number within parentheses
	const match = text.match(/\((\d+)\)/);
	return match ? parseInt(match[1]) : 0;
};

/**
 * This function retrieves the first club and its member count.
 * @param {string} token - The token used for authentication.
 * @returns {Promise<{clubId: string, initialMembersCount: number}>} - A promise that resolves to an object containing the club ID and the initial member count.
 */
export function getFirstClubAndMembersCount(token) {
	return cy.getFirstClub(token).then((firstClub) => {
		return cy.getMembers(firstClub._id).then((members) => {
			return { clubId: firstClub._id, initialMembersCount: members.length };
		});
	});
}

/**
 * This function retrieves the member count of a specific club.
 * @param {string} clubId - The ID of the club.
 * @returns {Promise<number>} - A promise that resolves to the member count.
 */
export function getClubMemberCount(clubId) {
	return cy.getMembers(clubId).then((members) => {
		return members.length;
	});
}

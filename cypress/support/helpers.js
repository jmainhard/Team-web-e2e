/**
 * Helper function to get member count
 */
export const getMemberCount = (text) => {
	// get number within parentheses
	const match = text.match(/\((\d+)\)/);
	return match ? parseInt(match[1]) : 0;
};

export function getFirstClubAndMembersCount(token) {
	return cy.getFirstClub(token).then((firstClub) => {
		return cy.getMembers(firstClub._id).then((members) => {
			return { clubId: firstClub._id, initialMembersCount: members.length };
		});
	});
}

export function getClubMemberCount(clubId) {
	return cy.getMembers(clubId).then((members) => {
		return members.length;
	});
}

/**
 * Helper function to get member count
 */
export const getMemberCount = (text) => {
	// get number within parentheses
	const match = text.match(/\((\d+)\)/);
	return match ? parseInt(match[1]) : 0;
};
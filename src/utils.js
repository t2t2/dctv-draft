export const ONE_DAY = 24 * 60 * 60 * 1000
export const ONE_WEEK = 7 * ONE_DAY

export function movieIsReleased(movie) {
	const now = Date.now()

	return movie.releaseDate < (now - ONE_DAY)
}
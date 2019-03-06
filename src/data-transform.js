const TITLE_PREFIX = 'Movie Draft - ';
/**
 * Convert data from html to more usable format
 *
 * @param {HTMLDocument} doc
 */
export default function (doc) {
	const sheets = mapSheets(doc)

	let title = doc.getElementById('doc-title').innerText
	if (title.startsWith(TITLE_PREFIX)) {
		title = title.substring(TITLE_PREFIX.length)
	}

	return {
		title,
		movies: getMovies(sheets.get('Movies')),
		teams: getTeams(sheets.get('Teams')),
		status: getStatus(sheets.get('Status'))
	}
}

/**
 * Ease of use: get sheets, map by tab
 *
 * @param {HTMLDocument} doc
 */
function mapSheets(doc) {
	const sheetEls = doc.querySelectorAll('#sheets-viewport > div')
	const sheets = new Map()
	Array.from(sheetEls).forEach(el => {
		const text = doc.getElementById(`sheet-button-${el.id}`).innerText.trim()
		sheets.set(text, el)
	})

	return sheets
}

/**
 * Get heading row to 
 * @param {HTMLElement} rowEl
 * @returns {Map<string, number>}
 */
function getHeadings(rowEl) {
	const headingToCol = new Map()
	Array.from(rowEl.children).forEach((el, i) => {
		if (i === 0) {
			return
		}
		headingToCol.set(el.innerText.trim(), i)
	})
	return headingToCol
}

/**
 * Get heading row to 
 * @param {HTMLElement} rowEl
 * @param {number} index
 * @returns {string}
 */
function getCellValue(rowEl, index) {
	if (index === undefined) {
		return ''
	}
	return rowEl.children[index].innerText.trim()
}

/**
 * Format date from spreadsheet to object
 * @param {string} value
 * @returns {Date}
 */
function formatDate(value) {
	if (value.length === 0) {
		return Object.freeze(new Date(1970, 0, 1, 0, 0, 0))
	}
	return Object.freeze(new Date(value))
}

/**
 * Format money from spreadsheet to object
 * @param {string} value
 * @returns {Float}
 */
function formatDollars(value) {
	return parseFloat(value.replace(/[$, ]/g, '')) || 0
}

/**
 * Format money from spreadsheet to object
 * @param {string} value
 * @returns {Float}
 */
function formatMoney(value) {
	return parseFloat(value.replace(/[₪ .]/g, '')) || 0
}

/**
 * Format money from spreadsheet to object
 * @param {string} value
 * @returns {string|null}
 */
function formatNullable(value) {
	const trimmed = value.trim()
	return trimmed.length > 0 ? trimmed : null
}

/**
 * Get formatted movies
 * @param {HTMLElement} el
 */
function getMovies(el) {
	const movies = {}

	const rows = el.querySelectorAll('table tbody tr')
	const headings = getHeadings(rows[0]) // heading -> col index

	Array.from(rows).slice(1).forEach(rowEl => {
		if (rowEl.children[0].classList.contains('freezebar-cell')) {
			return
		}

		const id = getCellValue(rowEl, headings.get('Movie ID'))
		movies[id] = {
			id,
			name: getCellValue(rowEl, headings.get('Movie Name')),
			releaseDate: formatDate(getCellValue(rowEl, headings.get('Release Date'))),
			bomUrl: getCellValue(rowEl, headings.get('Box Office Mojo Link')),
			gross: formatDollars(getCellValue(rowEl, headings.get('Domestic Gross'))),
			owner: formatNullable(getCellValue(rowEl, headings.get('Owner'))),
			price: formatMoney(getCellValue(rowEl, headings.get('Purchase Price')))
		}
	})

	return movies
}

/**
 * Get formatted status
 * @param {HTMLElement} el
 */
function getStatus(el) {
	const rows = el.querySelectorAll('table tbody tr')
	const headings = getHeadings(rows[0]) // heading -> col index

	const row = Array.from(rows).slice(1).find(rowEl => !rowEl.children[0].classList.contains('freezebar-cell'))

	return {
		lastUpdate: formatDate(getCellValue(row, headings.get('Last Updated'))),
		seasonEnd: formatDate(getCellValue(row, headings.get('Season End Date'))),
		twitter: getCellValue(row, headings.get('Twitter')),
		lastManualUpdate: formatDate(getCellValue(row, headings.get('Last Manual Update'))),
		manualUpdateMessage: getCellValue(row, headings.get('Manual Update Message')),
		chatrealmForm: formatNullable(getCellValue(row, headings.get('Chatrealm Form')))
	}
}

/**
 * Get formatted teams
 * @param {HTMLElement} el
 */
function getTeams(el) {
	const teams = {}

	const rows = el.querySelectorAll('table tbody tr')
	const headings = getHeadings(rows[0]) // heading -> col index

	Array.from(rows).slice(1).forEach(rowEl => {
		if (rowEl.children[0].classList.contains('freezebar-cell')) {
			return
		}

		const name = getCellValue(rowEl, headings.get('Teams'))
		teams[name] = {
			name,
			moneySpent: getCellValue(rowEl, headings.get('Money Spent')),
			earnings: formatDate(getCellValue(rowEl, headings.get('Earnings')))
		}
	})

	return teams
}

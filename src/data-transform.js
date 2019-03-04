const TITLE_PREFIX = 'Movie Draft - ';
/**
 * Convert data from html to more usable format
 *
 * @param {HTMLDocument} doc
 */
export default function (doc) {
	const sheets = mapSheets(doc)
	const movies = getMovies(sheets.get('Movies'))

	let title = doc.getElementById('doc-title').innerText
	if (title.startsWith(TITLE_PREFIX)) {
		title = title.substring(TITLE_PREFIX.length)
	}

	return {
		title,
		movies,
		teams: []
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
	return rowEl.children[index].innerText.trim()
}

/**
 * Format date from spreadsheet to object
 * @param {string} value
 * @returns {Date}
 */
function formatDate(value) {
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



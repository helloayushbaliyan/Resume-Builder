/**
 * Format date from YYYY-MM to "Month Year" format
 * @param {string} dateString - Date in YYYY-MM format (e.g., "2023-10")
 * @returns {string} Formatted date (e.g., "October 2023")
 */
export function formatDate(dateString) {
    if (!dateString) return '';

    // Handle YYYY-MM format
    const [year, month] = dateString.split('-');

    if (!year || !month) return dateString;

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthIndex = parseInt(month, 10) - 1;

    if (monthIndex < 0 || monthIndex > 11) return dateString;

    return `${monthNames[monthIndex]} ${year}`;
}

/**
 * Format date range with "Present" for current positions
 * @param {string} startDate - Start date in YYYY-MM format
 * @param {string} endDate - End date in YYYY-MM format
 * @param {boolean} isCurrent - Whether this is a current position
 * @returns {string} Formatted date range (e.g., "January 2020 – Present")
 */
export function formatDateRange(startDate, endDate, isCurrent = false) {
    const start = formatDate(startDate);
    const end = isCurrent ? 'Present' : formatDate(endDate);

    if (!start && !end) return '';
    if (!start) return end;
    if (!end) return start;

    return `${start} – ${end}`;
}

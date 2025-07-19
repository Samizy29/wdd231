/**
 * Utility functions for member spotlights
 */

/**
 * Cleans a URL for display by removing protocol and www
 * @param {string} url - The URL to clean
 * @returns {string} Cleaned URL
 */
export function cleanUrl(url) {
    return url.replace(/^https?:\/\/(www\.)?/, '');
}

/**
 * Gets a random subset of array elements
 * @param {Array} arr - The input array
 * @param {number} count - Number of elements to return
 * @returns {Array} Random subset
 */
export function getRandomSubset(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
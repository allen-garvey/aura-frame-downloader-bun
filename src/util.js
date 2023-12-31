export const jsonHeaders = (opts = {}) => Object.assign({
    Accept: 'application/json',
    'Content-Type': 'application/json',
}, opts);

// takes array of items and runs a string of promises one after another, one at a time separated by the delay
export const forEachAsyncWithDelay = (items, promiseBuilder, delay=1000) => 
    items.reduce((promise, item, index) => 
        promise.then(() => Bun.sleep(delay))
        .then(() => promiseBuilder(item, index, items)), 
Promise.resolve());

/**
 * @param {string|undefined} name
 * @returns {string}
 */
export const formatUserName = (name) => name.toLowerCase().replace(/[^a-z]/g, '');

/**
 * @param {string} timestamp "2023-10-04T13:10:37.690Z"
 * @returns {string}
 */
export const timestampToDate = (timestamp) => timestamp.replace(/T.+$/g, '');
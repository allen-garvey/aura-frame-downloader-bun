export const jsonHeaders = (opts = {}) => Object.assign({
    Accept: 'application/json',
    'Content-Type': 'application/json',
}, opts);

// takes array of items and runs a string of promises one after another, one at a time separated by the delay
export const forEachAsyncWithDelay = (items, promiseBuilder, delay=1000) => 
    items.map((item, i) => new Promise(resolve => {
        setTimeout(() => promiseBuilder(item, i, items).then(_ => resolve()), delay * i);
    }));

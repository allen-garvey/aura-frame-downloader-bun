import path from 'path';

/**
 * @typedef {Object} ImageItem
 * @property {string} fileName
 * @property {string} userId
 * @property {string} destination
 * @property {string} url
 */

export const DESTINATION_DIR = path.resolve(__dirname, '..', 'images');

/**
 * @param {Array.<Object>} items
 * @returns {Promise<ImageItem>}
 */
export const filterOutExistingImages = (items) => Promise.all(
    items.map(item => {
        const fileName = item.file_name;
        const userId = item.user_id;
        const imageItem = {
            fileName,
            userId,
            destination: path.join(DESTINATION_DIR, `${userId}__${fileName}`),
            url: `https://imgproxy.pushd.com/${userId}/${fileName}`,
        };
        return Bun.file(imageItem.destination).exists()
        .then(res => res ? null : imageItem);
    })
).then(items => items.filter(item => item !== null))
.then(filteredItems => {
    console.log(`Total images: ${items.length}. Images skipped since they already exist: ${items.length - filteredItems.length}. Images to download: ${filteredItems.length}`);
    return filteredItems;
});

/**
 * @param {ImageItem} item
 * @param {number} i
 * @param {Array.<ImageItem>} items
 */
export const downloadAndSaveImages = (item, i, items) => {
    const progressCounter = `${i+1}/${items.length}`;
    console.log(`Downloading image ${progressCounter}`);
    return fetch(item.url)
        .then(res => {
            console.log(`Saving image ${progressCounter}`);
            return Bun.write(item.destination, res);
        });
};
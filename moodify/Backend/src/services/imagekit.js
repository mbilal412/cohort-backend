const ImageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

})
async function uploadFile({ fileBuffer, fileName }) {

    const file = await client.files.upload({
        file: await toFile(Buffer.from(fileBuffer), 'file'),
        fileName: fileName,
        folder: '/moodify/song'
    });

    return file
}

module.exports = { uploadFile }
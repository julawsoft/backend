function getExtensionFromBase64(base64String) {
    const matches = base64String.match(/^data:(.+);base64,/);

    if (matches && matches[1]) {
        const mimeType = matches[1];

        const extension = mimeType.split('/')[1]; 
        return extension;
    } else {
        throw new Error('String base64 não possui um tipo MIME válido.');
    }
}

module.exports =getExtensionFromBase64;
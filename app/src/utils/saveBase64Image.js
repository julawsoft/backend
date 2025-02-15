const fs = require('fs');
const { STORAGE_PATH } = require('../const');
const path = require('path');
const getExtensionFromBase64 = require('./getExtensionFromBase64');

async function saveBase64Image(fileName, base64String){

    if(!base64String.includes("base64")) {
        return new Error("base64Image mal formatado")
    }

    let extention = getExtensionFromBase64(base64String)

    let base64Data;
    if(base64String.includes("data:image")) {
        base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    }

    if(base64String.includes("data:application")) {
        base64Data = base64String.replace(/^data:application\/\w+;base64,/, '');
     }

     console.log("base64Data >>>>>   ", base64Data)

    // const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    if(!fs.existsSync(STORAGE_PATH))
            fs.mkdirSync(STORAGE_PATH)

    let fileNameWithoutExtension = `${fileName}.${extention}`
    
    let pathToSave = path.join(STORAGE_PATH, `${fileNameWithoutExtension}`)

    fs.writeFileSync(pathToSave, buffer, (err) => {
        if (err)
            throw new Error(err)       
    });   

  return {
    status: true,
    data: {
        path: STORAGE_PATH,
        fileName: fileNameWithoutExtension,
    }
}

}

module.exports = saveBase64Image
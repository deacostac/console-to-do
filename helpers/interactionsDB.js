import fs from 'fs'

const path = './db/data.json'

const saveFile = (data) =>{
    fs.writeFileSync(path, JSON.stringify(data))
}

const readDB = () =>{
    if(!fs.existsSync(path)){
        return null
    }

    const info = fs.readFileSync(path, {encoding: 'utf-8'})
    const data = JSON.parse(info);

    return data
}

export{
    saveFile,
    readDB
}
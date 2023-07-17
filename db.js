const fs = require('fs')


const getStudentsList = ()=> {
    return new Promise((resolve, reject)=> {
         fs.readFile('./database/student.json','utf-8', (err, data)=> {
            if(err){
                console.log(err)
                reject(err)
            }else {
                console.log(data)
                resolve(JSON.parse(data))
            }
        })
    })
}



module.exports.getStudentsList = getStudentsList;
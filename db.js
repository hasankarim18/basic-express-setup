const fs = require('fs')


const getStudentsList = ()=> {
    return new Promise((resolve, reject)=> {
         fs.readFile('./database/student.json','utf-8', (err, data)=> {
            if(err){              
                reject(err)
            }else {               
                resolve(JSON.parse(data))
            }
        })
    })
}

const writeStudentData = (students)=> {  
    const studentsString = JSON.stringify(students)
    return new Promise((resolve, reject)=> {
        fs.writeFile("./database/student.json", studentsString, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({ message: "success" });
          }
        });
    })
}



module.exports.getStudentsList = getStudentsList;

module.exports.writeStudentData = writeStudentData;
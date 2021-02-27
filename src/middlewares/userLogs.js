const fs = require("fs");
const path = require("path");
function appendToFile(filePath, data) {
    fs.appendFileSync(filePath, data + "\n");
}
module.exports = (req, res, next)=>{
appendToFile(path.join(__dirname, "logs/userLogs.txt"), 'El ususario ingresó a la ruta: '+ req.originalUrl);
next();
};


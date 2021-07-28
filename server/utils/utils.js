const path = require('path')
const fs = require('fs')

const saveFile = (file, directory = 'files') => {
   if (!file) {
      return null
   } 

   const fileName = new Date() - 1 + file.name
   const uploadDir = path.join(__dirname, '..', directory)
   const saveFiles = path.join('/', directory, fileName)
   const uploadPath = path.join(uploadDir, fileName)

   if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
   }

   try {
      file.mv(uploadPath)
      return saveFiles
   } catch (error) {
      return createError(error.status, error.message)
   }
}

module.exports = { saveFile }
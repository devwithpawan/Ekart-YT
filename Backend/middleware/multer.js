import multer from 'multer'

const storage = multer.memoryStorage();

//single upload
export const singleUpload = multer({storage}).single("file")

//mutiple upload
export const multipleUpload = multer({storage}).array("files",5)
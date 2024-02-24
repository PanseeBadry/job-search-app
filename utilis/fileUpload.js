import multer from "multer";
import path from "path";

export const uploadSingleFile = (fieldName)=>{
    const storage = multer.diskStorage({})
    const upload = multer({ storage: storage,
        fileFilter: function (req, file, cb) {
          const allowedFileTypes = /pdf/; // Allow only PDF files
      
          const mimetype = allowedFileTypes.test(file.mimetype);
          const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
      
          if (mimetype && extname) {
            return cb(null, true);
          }
      
          cb('Error: File upload only supports PDF files!');
        } });
        return upload.single(fieldName)
}

import multer from 'multer'

const storage = multer.memoryStorage();

const fileFilter = (req:any, file:Express.Multer.File, cb:any) => {
  const allowdTypes = ['image/jpeg', 'image/png', 'image/jpg' ];
  if (allowdTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg and .png formats are allowed'), false);
  }
}

export const upload = multer({storage, fileFilter})
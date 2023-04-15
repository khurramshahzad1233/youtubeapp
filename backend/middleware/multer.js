import multer from "multer"

const storage=multer.memoryStorage();
const upload=multer({storage}).fields([
    {name:'image',maxCount:1},
    {name:'video',maxCount:1}
])



export default upload;
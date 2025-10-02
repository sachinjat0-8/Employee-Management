const router = require('express').Router();
const {
    createEmployee,
    fetchAllData,
    getEmployeeById,
    getEmployeeDelete,
    UpdateData
}= require('../controllers/employeeController')
const upload = require("../middlewares/upload");


// router.get('/',(req, res) =>{ 
//     res.send("get all the employe");
// });
//
router.post('/',upload.single("profileImage"),createEmployee)

router.get('/',fetchAllData )

router.get('/:id',getEmployeeById)
router.delete('/:id',getEmployeeDelete)

router.put('/:id',upload.single("profileImage"),UpdateData)

module.exports = router;
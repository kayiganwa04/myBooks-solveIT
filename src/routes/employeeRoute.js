const router=require("express").Router();
const EmployeeController=require('../controller/employeeController')
import ensureAuthenticated from '../middleware/auth'

router.get('/',ensureAuthenticated,EmployeeController.index)
router.get('/show',ensureAuthenticated,EmployeeController.show)
router.post('/store',ensureAuthenticated,EmployeeController.store)
router.put('/update',ensureAuthenticated,EmployeeController.update)
router.delete('/delete',ensureAuthenticated,EmployeeController.destroy)


module.exports=router
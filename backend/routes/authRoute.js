import express from "express"
import {registerController,loginController,testController, getUsersController, checkInController, checkOutController, getUserAttendanceController} from "../controllers/authController.js"
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js"
const router = express.Router()

router.post("/register",registerController)

router.post("/login",loginController)
//test
router.get("/test",requireSignin,isAdmin, testController)

//protected user route
router.get("/user-auth", requireSignin, (req,res)=>{
    res.status(200).send({ok:true})
})

//protected admin route
router.get("/admin-auth", requireSignin,isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
})



router.get("/get-users",requireSignin,isAdmin,getUsersController)

router.post("/add-user", requireSignin, isAdmin, registerController);


router.post("/check-in", requireSignin,checkInController )

router.post("/check-out", requireSignin,checkOutController)

router.get('/user/attendance', requireSignin, getUserAttendanceController);
 
export default router

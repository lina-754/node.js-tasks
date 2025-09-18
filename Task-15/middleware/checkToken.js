const checkToken = async(req ,res ,next)=>{
    try{
        const getToken = req.session.token;
        if(!getToken){
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    catch(error){
        return next();
    }
}

module.exports={checkToken};
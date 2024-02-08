const jwt = require('jsonwebtoken');

const {RoleAccess,Menu} = require('../app/models');
const { errorResponse } = require('../utils/jsonResponse');
const AuthMiddleware = (accesskey=false)=>{

    return async(req,res,next)=>{
        const header = req.header('Authorization');
        if(!header){
            return errorResponse(res,"Unauthorized",403);
        }
        const token = header.replace("Bearer ","");
        if(!token){
            return errorResponse(res,"Unauthorized",403);
        }
        jwt.verify(token, process.env.JWT_KEY, async(err, user) => {
            if (err) return errorResponse(res,err?.message,401,err);

            try {
                if(accesskey){
                    let menu = await Menu.findOne({
                        where:{
                            key:accesskey
                        }
                    });
    
                    if(!menu){
                        return errorResponse(res,`Key '${accesskey}' is not available`,403);
                    }
                    let access =await RoleAccess.findOne({
                        where:{
                            menu_id:menu.id,
                            role_id:user.auth.role_id,
                        }
                    });

                    if(!access){
                        return errorResponse(res,`Access for menu '${menu?.name}' and role '${menu?.user.auth.role.name}' is not available`,403);
                    }

                    if(!access.allow){
                        return errorResponse(res,'Forbidden access',403);
                    }
                }
                req.user = user;
                next();
            } catch (error) {
                return errorResponse(res,err);
            }
        });
    }
}

module.exports = AuthMiddleware
const jwt = require('jsonwebtoken');

const { errorResponse } = require("../utils/jsonResponse");
const {RoleAccess,Menu} = require('../app/models');
const AccessKey = (accesskey)=>{
    
    return async(req,res,next)=>{

        let _menu = await Menu.findOne({
            where:{
                key:accesskey
            }
        });

        if(!_menu){
            return errorResponse(res,`Menu key '${accesskey}' not found`,404);
        }

        let _access = await RoleAccess.findOne({
            where:{
                role_id:req.user.auth.role_id,
                menu_id:_menu.id
            }
        });

        if(!_access){
            return errorResponse(res,`Access key '${accesskey}' not found`,404);
        }

        if(!_access.allow){
            return errorResponse(res,'Forbidden access',403);
        }

        next();
    }
}

module.exports=AccessKey;
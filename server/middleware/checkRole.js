const checkRole = roles => (req, res, next) =>{
    !roles.includes(req.user.role)
        ? res.status(401).json({
            message: "Unauthorised user",
            success: false
        })
        : next();
}

module.exports = checkRole;
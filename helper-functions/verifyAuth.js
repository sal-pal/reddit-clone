module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) { 
        res.status( UNAUTHORIZED )   
        return res.end('Please Login')
    }                                   
    next();
}
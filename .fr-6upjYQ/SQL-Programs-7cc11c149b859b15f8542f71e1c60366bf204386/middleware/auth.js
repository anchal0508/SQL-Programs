const jwt = require('jsonwebtoken');
const User = require('../models/user');

var secretKey = 'my_expense_tracker_app_secret_123!';


const authenticate = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        // अगर हेडर में 'Bearer <token>' है तो सिर्फ टोकन अलग करेगा, नहीं तो पूरा हेडर लेगा
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

        console.log(token);
        const user = jwt.verify(token, secretKey);
        console.log("userID >>>", user.userId);

        User.findByPk(user.userId).then(user => {

            console.log(JSON.stringify(user));
            req.user = user;
            next();
        }).catch(err => { throw new Error(err) })

    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false });
    }

}


module.exports = {
    authenticate,
}
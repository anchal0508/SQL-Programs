const jwt = require('jsonwebtoken');
const User = require('../models/user');

var secretKey = 'my_expense_tracker_app_secret_123!';


const authenticate =  async (req, res, next) => {
     try {
        const token = req.header('Authorization');

        // अगर टोकन है ही नहीं, तो यहीं से मना कर दो
        if (!token) {
            return res.status(401).json({ success: false, message: "टोकन गायब है" });
        }

        // 2. टोकन को खोलें (Decrypt करें)
        const decoded = jwt.verify(token, secretKey);
        console.log("userID >>>", decoded.userId);

        // 3. डेटाबेस से यूजर ढूंढें (बिना .then के, सीधा await लगाकर)
        const dbUser = await User.findByPk(decoded.userId);

        // अगर डेटाबेस में ऐसा कोई यूजर नहीं मिला
        if (!dbUser) {
            return res.status(401).json({ success: false, message: "यूजर नहीं मिला" });
        }

        // 4. यूजर का डेटा req.user में डालकर आगे भेज दें
        req.user = dbUser;
        next();

    } catch (error) {
        console.log("Auth Error:", error.message);
        return res.status(401).json({ success: false });
    }

}


module.exports = {
    authenticate,
}
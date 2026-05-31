const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
// FIX: Import models from your central relationships file to ensure associations are registered
const { User, ForgotPasswordRequest } = require('../models/index'); 

exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const requestId = uuidv4();
        await ForgotPasswordRequest.create({
            id: requestId,
            isActive: true,
            userId: user.id
        });

        const resetUrl = `http://localhost:3000/password/resetpassword/${requestId}`;
        
        // Print to console so you can copy/paste it directly if your mail client is unapproved
        console.log(`Reset Link: ${resetUrl}`); 

        return res.status(200).json({ message: 'Reset link generated successfully.', resetUrl });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.resetPasswordForm = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await ForgotPasswordRequest.findByPk(id);

        if (!request || !request.isActive) {
            return res.status(400).send('<h1>Link expired or invalid</h1>');
        }

        // Returns an interactive form directly to the browser window
        res.status(200).send(`
            <form action="http://localhost:3000/password/updatepassword/${id}" method="POST">
                <label for="newpassword">Enter New Password:</label>
                <input name="newpassword" type="password" required placeholder="New Password"></input>
                <button type="submit">Update Password</button>
            </form>
        `);
    } catch (err) {
        return res.status(500).send('<h1>Internal Server Error</h1>');
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newpassword } = req.body;

        const request = await ForgotPasswordRequest.findByPk(id);
        if (!request || !request.isActive) {
            return res.status(400).json({ message: 'Link expired or invalid' });
        }

        const user = await User.findByPk(request.userId);
        if (!user) {
            return res.status(404).json({ message: 'User no longer exists' });
        }

        // Secure password hashing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newpassword, saltRounds);

        // Update information sequentially
        await user.update({ password: hashedPassword });
        await request.update({ isActive: false });

        return res.status(201).send('<h1>Password updated successfully. You can now login.</h1>');
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

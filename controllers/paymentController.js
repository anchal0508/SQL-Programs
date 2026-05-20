const Payment = require('../models/payment');





const processPayment = async (req, res) => {
    
    const orderId = "ORDER-"+Date.now();  // creating by own....
    const orderAmount = 2000;
    const orderCurrency = "INR";
    const customerID = '1';
    const customerPhone = "9999999999";

    try{
        const paymentSessionId = await createOrder(
            orderId,
            orderAmount,
            orderCurrency,
            customerID,
            customerPhone,
        );

        await Payment.create({
            orderId,
            paymentSessionId,
            orderAmount,
            orderCurrency,
            paymentStatus: 'Pending',
        });
    }
    catch(error){

    }
}

const getPaymentPage = async (req, res) => {
    try {
        // यह आपके 'public/index.html' पेज को यूजर के ब्राउज़र पर लोड कर देगा
        return res.sendFile(path.join(__dirname, '../public/index.html'));
    } catch (error) {
        console.error("Error loading payment page:", error);
        return res.status(500).send("HTML Page not found");
    }
};


const getPaymentStatus = async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        return res.status(400).json({ success: false, message: "orderId is required" });
    }

    try {
        // नवीनतम कैशफ्री अपडेट: केवल एक ही पैरामीटर पास करें (हटाया गया डेट स्ट्रिंग)
        const cfResponse = await cfPaymentGateway.PGOrderFetchPayments(orderId);
        const paymentDetails = cfResponse.data;

        // यदि पेमेंट सफल (SUCCESS) रहा है
        if (paymentDetails && paymentDetails.payment_status === "SUCCESS") {
            
            // 1. डेटाबेस में पेमेंट स्टेटस 'SUCCESSFUL' अपडेट करें
            await Payment.update(
                { paymentStatus: 'SUCCESSFUL' },
                { where: { orderId: orderId } }
            );

            // यहाँ पर आप अपने यूजर टेबल को भी अपडेट करके उसे 'Premium User' बना सकते हैं

            return res.status(200).json({
                success: true,
                status: "SUCCESS",
                message: "Transaction successful"
            });
        } 
        // यदि पेमेंट फेल (FAILED) या किसी अन्य स्टेट में है
        else {
            // डिलीवरेबल्स: ट्रांजेक्शन फेल होने पर PENDING से FAILED में बदलें
            await Payment.update(
                { paymentStatus: 'FAILED' },
                { where: { orderId: orderId } }
            );

            return res.status(200).json({
                success: false,
                status: "FAILED",
                message: "TRANSACTION FAILED"
            });
        }

    } catch (error) {
        console.error("Error verifying Cashfree payment status:", error);

        // किसी भी एरर/क्रैश की स्थिति में भी डेटाबेस को सुरक्षा के लिए FAILED मार्क करें
        await Payment.update(
            { paymentStatus: 'FAILED' },
            { where: { orderId: orderId } }
        );

        return res.status(500).json({
            success: false,
            status: "FAILED",
            message: "TRANSACTION FAILED due to server error",
            error: error.message
        });
    }
};




module.exports = {
    processPayment,
    getPaymentPage,
    getPaymentStatus
}
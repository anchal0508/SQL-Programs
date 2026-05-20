import { Cashfree, CFEnvironment } from "cashfree-pg";

const cashfree = new Cashfree(CFEnvironment.SANDBOX, "TEST430329ae80e0f32e41a393d78b923034", "TESTaf195616268bd6202eeb3bf8dc458956e7192a85");


exports.createOrder = async (
    orderId,
    orderAmount,
    orderCurrency = "IND",
    customerID,
    customerPhone,
) => {
    try {
        const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
        const formattedExpiryDate = expiryDate.toISOString();
        var request = {
            "order_amount": orderAmount,
            "order_currency": orderCurrency,
            "order_id": orderId,

            "customer_details": {
                "customer_id": customerID,
                "customer_phone": customerPhone,
            },
            "order_meta": {
                // "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={order_id}"
                "return_url": `http://localhost:3000/payment-status/${orderId}`,
                payment_methods: "cc, upi, nb"
            },
            "order_expiry_time": formattedExpiryDate,
        };

        const response = await cashfree.PGCreateOrder(request);
        return response.data.payment_session_id;


    } catch (error) {
        console.log('Error creating order: ', error.message);
    }
};



exports.getPaymentStatus = async (orderId) => {
    // try {
    //     const response = await cashfree.PGOrderFetchPayments(orderId);
    //     let getOrderResponse = response.data;
    //     let orderStatus;

    //     if (
    //         getOrderResponse.filter(
    //             (transaction) => transaction.payment_status === "SUCCESS"
    //         ).length > 0
    //     )
    // }catch (error) {

    // }
}

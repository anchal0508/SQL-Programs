const cashfree = Cashfree({
    mode: "sandbox",
});

// बटन पर क्लिक होने पर चलने वाला फंक्शन - यहाँ 'async' जोड़ दिया गया है
document.getElementById("renderBtn").addEventListener("click", async () => {
    
    try {
        // सही URL पाथ लगाया है (/payment/pay)
        const response = await fetch("http://localhost:3000/payment/pay", {
            method: "POST",
        });

        const data = await response.json();
        const paymentSessionId = data.paymentSessionId;
        
        // चेकआउट के विकल्प सेट करना
        let checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_self", // पेमेंट इसी टैब में खुलेगा
        };

        // कैशफ्री पेमेंट गेटवे खोलना
        await cashfree.checkout(checkoutOptions);

    } catch (error) {
        // अगर कोई खराबी आती है तो यहाँ पता चलेगा
        console.log("Error: ", error);
        alert("TRANSACTION FAILED");
    }
});
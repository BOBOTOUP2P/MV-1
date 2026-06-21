module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(200).json({ responseCode: 405, responseMessage: 'Method Not Allowed' });
    }
    
    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYjY0M2FhNzQyYTM5NGNlZSJ9LCJpYXQiOjE3ODE5NjM3NzMsImV4cCI6MTc4OTczOTc3M30.Asg2Ft8BODXsQhOzE8UHB8kN_BG_ZJItBI1N91xHYV0";
    const BAKONG_ACC = "saomona_hort@bkrt";
    
    const { amount, currency } = req.body;
    
    try {
        const response = await fetch("https://api-bakong.nbc.gov.kh/v1/generate_qr", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                qrType: "individual",
                accountId: BAKONG_ACC,
                amount: currency === "KHR" ? Math.round(amount) : parseFloat(amount),
                currency: currency
            })
        });
        
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        // បម្លែងកំហុសពី Server មកជា JSON ធម្មតាដើម្បីបង្ហាញលើអេក្រង់
        return res.status(200).json({ 
            responseCode: 500, 
            responseMessage: "Server Error: " + error.message 
        });
    }
};

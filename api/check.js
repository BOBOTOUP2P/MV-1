export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    
    const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiYjY0M2FhNzQyYTM5NGNlZSJ9LCJpYXQiOjE3ODE5NjM3NzMsImV4cCI6MTc4OTczOTc3M30.Asg2Ft8BODXsQhOzE8UHB8kN_BG_ZJItBI1N91xHYV0";
    const { md5 } = req.body;
    
    try {
        const response = await fetch("https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ md5: md5 })
        });
        
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

global.latestSMS = global.latestSMS || "";
global.lastUpdated = global.lastUpdated || 0;

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    const { amount } = req.body;
    
    if (!amount) {
        return res.status(400).json({ success: false, message: "សូមបញ្ចូលចំនួនទឹកប្រាក់" });
    }

    // ពិនិត្យមើលថាតើសារចុងក្រោយទទួលបានក្នុងរយៈពេល ៦០ វិនាទីចុងក្រោយមែនទេ
    const isRecent = (Date.now() - global.lastUpdated) < 60000;
    const cleanSMS = global.latestSMS.replace(/,/g, ''); // លុបសញ្ញាក្បៀសចេញ
    
    // បើរកឃើញចំនួនទឹកប្រាក់នៅក្នុងសារផ្ញើមកពិតមែន
    if (isRecent && cleanSMS.includes(amount.toString())) {
        // លុបសារចេញវិញដើម្បីកុំឱ្យលោតជាន់គ្នាលើកក្រោយ
        global.latestSMS = "";
        global.lastUpdated = 0;
        return res.status(200).json({ success: true });
    }
    
    return res.status(200).json({ success: false });
};

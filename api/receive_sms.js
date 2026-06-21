// បង្កើតប្រអប់ផ្ទុកសារបណ្តោះអាសន្ននៅលើ Server
global.latestSMS = global.latestSMS || "";
global.lastUpdated = global.lastUpdated || 0;

module.exports = async (req, res) => {
    // អនុញ្ញាតឱ្យទាញទិន្នន័យពីខាងក្រៅដោយគ្មាន CORS block
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    const text = req.query.text || req.body.text;
    
    if (text) {
        global.latestSMS = text;
        global.lastUpdated = Date.now(); // កំណត់ម៉ោងដែលទទួលបានសារ
        return res.status(200).json({ success: true, message: "រក្សាទុកសារជោគជ័យ" });
    }
    
    return res.status(400).json({ success: false, message: "គ្មានអត្ថបទសារឡើយ" });
};

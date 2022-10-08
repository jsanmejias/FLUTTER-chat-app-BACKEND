const Message  = require('../models/message');

const getChat = async ( req, res  ) => {
    console.log(req.uid);
    const myUid = req.uid;
    const messagesFrom = req.params.from;

    const last30 = await Message.find({
        $or: [{ from: myUid, to: messagesFrom}, {from: messagesFrom, to: myUid}]
    })
    .sort({ createdAt: 'desc'})
    .limit(30);

    res.json({
        ok: true,
        // myUid: myUid,
        // messagesFrom: messagesFrom,
        messages: last30
    })
}

module.exports = {
    getChat
}
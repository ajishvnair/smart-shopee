const accountSid = "AC5ac6ef956cc24810d2d3cc5f401a56fc"; // Your Account SID from www.twilio.com/console
const authToken = "4d231d42a432464f4ea6694512eb1664"; // Your Auth Token from www.twilio.com/console

const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

module.exports = { client };

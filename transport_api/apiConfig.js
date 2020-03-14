
const { APP_ID, APP_KEY } = require("./apiKeys");

const api_url = (origin, destination) => {
    return `https://transportapi.com/v3/uk/train/station/${origin}/live.json?app_id=${APP_ID}&app_key=${APP_KEY}&calling_at=${destination}&darwin=false&train_status=passenger`
};

exports.api_url = api_url;
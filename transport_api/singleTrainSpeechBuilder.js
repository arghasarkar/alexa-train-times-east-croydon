
const request = require("sync-request");

const { api_url } = require("./apiConfig");
const { nameToCode, codeToName } = require("./stationCodes");

const generateSpeechText = (ORIGIN_CODE, DESTINATION_CODE) => {

    const URL = api_url(ORIGIN_CODE, DESTINATION_CODE);

    let ORIGIN = codeToName[ORIGIN_CODE];
    let DESTINATION = codeToName[DESTINATION_CODE];

    let response = request("GET", URL).getBody("utf8");
    let body = JSON.parse(response);

    if (body.departures.all.length === 0) {
        return noTrainsAvailableSpeechGenerator(ORIGIN, DESTINATION);
    }

    let nextTrain = body.departures.all[0];
    let platform = nextTrain.platform;
    let departureTime = nextTrain.expected_departure_time;
    let status = nextTrain.status;
    let finalDestination = nextTrain.destination_name;
    let operator = nextTrain.operator_name;

    return nextTrainSpeechGenerator(ORIGIN, DESTINATION, departureTime, platform, status, operator);
};

// Speech generator when there are no trains available
const noTrainsAvailableSpeechGenerator = (ORIGIN, DESTINATION) => {
    return `There are no live trains available between ${ORIGIN} and ${DESTINATION} at this moment.`;
};

// Speech generator for the next train
const nextTrainSpeechGenerator = (ORIGIN, DESTINATION, departureTime, platform, status, operator) => {
    return `The next train from ${ORIGIN} to ${DESTINATION} departs at ${departureTime} from platform number ` +
    `${platform}. The departure status is ${status}. Train operator is ${operator}`;
};


exports.singleTrainSpeechBuilder = generateSpeechText;

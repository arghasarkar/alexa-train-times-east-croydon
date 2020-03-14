
const request = require("sync-request");

const { api_url } = require("./apiConfig");
const { nameToCode, codeToName } = require("./stationCodes");

const generateSpeechText = (ORIGIN_CODE, DESTINATION_CODE) => {

    const URL = api_url(ORIGIN_CODE, DESTINATION_CODE);

    let ORIGIN = codeToName[ORIGIN_CODE];
    let DESTINATION = codeToName[DESTINATION_CODE];

    let response = request("GET", URL).getBody("utf8");
    let body = JSON.parse(response);

    let nextTrain = body.departures.all[0];
    let platform = nextTrain.platform;
    let departureTime = nextTrain.expected_departure_time;
    let status = nextTrain.status;
    let finalDestination = nextTrain.destination_name;
    let operator = nextTrain.operator_name;

    let speechText = `The next train from ${ORIGIN} to ${DESTINATION} departs at ${departureTime} from platform number ${platform}. The departure status is ${status}. Train operator is ${operator}`;

    return speechText;
};

exports.singleTrainSpeechBuilder = generateSpeechText;

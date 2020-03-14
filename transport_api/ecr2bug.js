
const request = require("sync-request");

const { api_url } = require("./apiConfig");
const { nameToCode, codeToName } = require("./stationCodes");

// Station related details
const MY_ORIGIN_CODE = "ECR";
const MY_DESTINATION_CODE = "BUG";
const MY_ORIGIN = codeToName[MY_ORIGIN_CODE];
const MY_DESTINATION = codeToName[MY_DESTINATION_CODE];

const URL = api_url(MY_ORIGIN_CODE, MY_DESTINATION_CODE);

const getSpeechText = () => {
    
    let response = request("GET", URL).getBody("utf8");
    
    let body = JSON.parse(response);

    let nextTrain = body.departures.all[0];
    // console.log(firstTrain);
    let platform = nextTrain.platform;
    let departureTime = nextTrain.expected_departure_time;
    let status = nextTrain.status;
    let finalDestination = nextTrain.destination_name;
    let operator = nextTrain.operator_name;

    let speechText = `The next train from ${MY_ORIGIN} to ${MY_DESTINATION} departs at ${departureTime} from platform number ${platform}. The departure status is ${status}. Train operator is ${operator}`;

    return speechText;
};


exports.speechText = getSpeechText;
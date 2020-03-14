
const { singleTrainSpeechBuilder } = require("./singleTrainSpeechBuilder");

// Station related details
const MY_ORIGIN_CODE = "ECR";
const MY_DESTINATION_CODE = "VIC";

const getSpeechText = () => {

    return singleTrainSpeechBuilder(MY_ORIGIN_CODE, MY_DESTINATION_CODE);

};

exports.speechText = getSpeechText;
const Alexa = require('ask-sdk-core');
const workTrain = require("./transport_api/ecr2bug");
// const request = require("sync-request");

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        let speechText = workTrain.speechText();

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('East Croydon to Burgess Hill', speechText)
            .getResponse();
    }
};

const Ecr2VicIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'Ecr2VicIntent';
    },
    handle(handlerInput) {
        let speechText = workTrain.speechText();

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('East Croydon to London Victoria', speechText)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        let speechText = workTrain.speechText();

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('East Croydon to Burgess Hill', speechText)
            .getResponse();
    }
};

let skill;

exports.handler = async function (event, context) {
    console.log(`REQUEST++++${JSON.stringify(event)}`);
    if (!skill) {
        skill = Alexa.SkillBuilders.custom()
            .addRequestHandlers(
                LaunchRequestHandler,
                Ecr2VicIntentHandler,
                HelloWorldIntentHandler,
            )
            .create();
    }

    const response = await skill.invoke(event, context);
    console.log(`RESPONSE++++${JSON.stringify(response)}`);

    return response;
};
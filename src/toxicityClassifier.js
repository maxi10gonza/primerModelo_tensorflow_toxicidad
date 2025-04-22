// minimum positive prediction confidence
// If this isn't passed, the default is 0.85
import * as toxicity from "@tensorflow-models/toxicity"
const threshold = 0.5;
// Load the model
const classifier = (sentence) =>{
    return toxicity.load(threshold).then((model) => {
        return model.classify(sentence).then((predictions) => predictions)
    });
}

export default classifier
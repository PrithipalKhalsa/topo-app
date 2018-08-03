// aws-sdk set up
// let creds = 'some creds';

// var myConfig = new AWS.Config({
//     credentials: creds,
//     region: 'us-west-2'
// })

// dynamically load amazon sdk
function loadJS(file) {
    // DOM: Create the script element
    var jsElm = document.createElement("script");
    // set the type attribute
    jsElm.type = "application/javascript";
    // make the script element load file
    jsElm.src = file;
    // finally insert the element to the body element in order to load the script
    document.body.appendChild(jsElm);
}
loadJS("https://sdk.amazonaws.com/js/aws-sdk-2.279.1.min.js");

// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-west-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:5b4e8bd4-d7ed-4449-ac30-931321dba9ce',
});
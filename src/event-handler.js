/*
A non-ecommerce event has the following schema:

{
    DeviceId: "a80eea1c-57f5-4f84-815e-06fe971b6ef2",
    EventAttributes: {test: "Error", t: 'stack trace in string form'},
    EventName: "Error",
    MPID: "123123123123",
    UserAttributes: {userAttr1: 'value1', userAttr2: 'value2'},
    UserIdentities: [{Identity: 'email@gmail.com', Type: 7}]
    User Identity Types can be found here:
}

*/

function EventHandler(common) {
    this.common = common || {};
}
EventHandler.prototype.logEvent = function(event) {
    if (!this.common.recordWithoutSending) {
        vidora.push(["send", event.EventName, null, {params: event.EventAttributes}]);
        return true;
    }
    vidora.notify(["send", event.EventName, null, {params: event.EventAttributes}]);
    return false 
};
EventHandler.prototype.logError = function(event) {
    // The schema for a logError event is the same, but noteworthy differences are as follows:
    // {
    //     EventAttributes: {m: 'name of error passed into MP', s: "Error", t: 'stack trace in string form if applicable'},
    //     EventName: "Error"
    // }
};
EventHandler.prototype.logPageView = function(event) {
    /* The schema for a logPagView event is the same, but noteworthy differences are as follows:
        {
            EventAttributes: {hostname: "www.google.com", title: 'Test Page'},  // These are event attributes only if no additional event attributes are explicitly provided to mParticle.logPageView(...)
        }
        */
    if (!this.common.recordWithoutSending) {
        vidora.push(["send", "pageview", null, {params: event.EventAttributes}]);
        return true;
    }
    vidora.notify(["send", "pageview", null, {params: event.EventAttributes}]);
    return false 
};

module.exports = EventHandler;

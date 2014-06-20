/// <reference path="gs.BaseModel.ts"/>
window.onload = function () {
    var el = document.getElementById('content');

    /*$.getJSON("/meeting.json", (data, status, jqXHR) => {
    
    var model = ko.mapping.fromJS(data.d);
    ko.applyBindings(model);
    });*/
    var meetingModel = new gsBaseModel.MeetingModel(gsBaseModel.GsMeetingItem, gsBaseModel.GsIssueItem, 1 /* REST */);
    meetingModel.Load("1", new gsDataMgmnt.Callback(function (data) {
        ko.applyBindings(meetingModel);
    }, function () {
    }));
};
//# sourceMappingURL=app.js.map

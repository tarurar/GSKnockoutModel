/// <reference path="gs.BaseModel.ts"/>

window.onload = () => {

    var el = document.getElementById('content');

    /*$.getJSON("/meeting.json", (data, status, jqXHR) => {

        var model = ko.mapping.fromJS(data.d);
        ko.applyBindings(model);
    });*/

    var meetingModel = new gsBaseModel.MeetingModel(gsBaseModel.GsMeetingItem, gsBaseModel.GsIssueItem, gsBaseModel.SPServerAPI.REST);
    meetingModel.Load("1", new gsDataMgmnt.Callback((data) => {
        ko.applyBindings(meetingModel);
    }, () => {}));
};
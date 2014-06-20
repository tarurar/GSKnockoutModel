/// <reference path="gs.DataManagement.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gsBaseModel;
(function (gsBaseModel) {
    (function (SPServerAPI) {
        SPServerAPI[SPServerAPI["CSOM"] = 0] = "CSOM";
        SPServerAPI[SPServerAPI["REST"] = 1] = "REST";
        SPServerAPI[SPServerAPI["SSOM"] = 2] = "SSOM";
    })(gsBaseModel.SPServerAPI || (gsBaseModel.SPServerAPI = {}));
    var SPServerAPI = gsBaseModel.SPServerAPI;

    var BaseModelItem = (function () {
        function BaseModelItem() {
        }
        return BaseModelItem;
    })();
    gsBaseModel.BaseModelItem = BaseModelItem;

    var SPBaseModelItem = (function (_super) {
        __extends(SPBaseModelItem, _super);
        function SPBaseModelItem() {
            _super.apply(this, arguments);
        }
        return SPBaseModelItem;
    })(BaseModelItem);
    gsBaseModel.SPBaseModelItem = SPBaseModelItem;

    var SPListBaseModelItem = (function (_super) {
        __extends(SPListBaseModelItem, _super);
        function SPListBaseModelItem() {
            _super.apply(this, arguments);
        }
        SPListBaseModelItem.prototype.getListTitle = function () {
            return "undefined";
        };
        return SPListBaseModelItem;
    })(SPBaseModelItem);
    gsBaseModel.SPListBaseModelItem = SPListBaseModelItem;

    var MeetingItem = (function (_super) {
        __extends(MeetingItem, _super);
        function MeetingItem() {
            _super.apply(this, arguments);
        }
        return MeetingItem;
    })(SPListBaseModelItem);
    gsBaseModel.MeetingItem = MeetingItem;

    var IssueItem = (function (_super) {
        __extends(IssueItem, _super);
        function IssueItem() {
            _super.apply(this, arguments);
        }
        return IssueItem;
    })(SPListBaseModelItem);
    gsBaseModel.IssueItem = IssueItem;

    var GsMeetingItem = (function (_super) {
        __extends(GsMeetingItem, _super);
        function GsMeetingItem() {
            _super.apply(this, arguments);
        }
        GsMeetingItem.prototype.getListTitle = function () {
            return "Заседания";
        };
        return GsMeetingItem;
    })(MeetingItem);
    gsBaseModel.GsMeetingItem = GsMeetingItem;

    var GsIssueItem = (function (_super) {
        __extends(GsIssueItem, _super);
        function GsIssueItem() {
            _super.apply(this, arguments);
        }
        GsIssueItem.prototype.getListTitle = function () {
            return "Вопросы повестки заседания";
        };
        return GsIssueItem;
    })(IssueItem);
    gsBaseModel.GsIssueItem = GsIssueItem;

    var MvkMeetingItem = (function (_super) {
        __extends(MvkMeetingItem, _super);
        function MvkMeetingItem() {
            _super.apply(this, arguments);
        }
        MvkMeetingItem.prototype.getListTitle = function () {
            return "Заседания МВК";
        };
        return MvkMeetingItem;
    })(MeetingItem);
    gsBaseModel.MvkMeetingItem = MvkMeetingItem;

    var MvkIssueItem = (function (_super) {
        __extends(MvkIssueItem, _super);
        function MvkIssueItem() {
            _super.apply(this, arguments);
        }
        MvkIssueItem.prototype.getListTitle = function () {
            return "Вопросы повестки заседания МВК";
        };
        return MvkIssueItem;
    })(IssueItem);
    gsBaseModel.MvkIssueItem = MvkIssueItem;

    var MeetingModel = (function () {
        function MeetingModel(MeetingType, IssueType, api) {
            this.MeetingType = MeetingType;
            this.IssueType = IssueType;
            var _api = api ? api : (SP.ClientContext.get_current() ? 0 /* CSOM */ : 1 /* REST */);

            switch (_api) {
                case 0 /* CSOM */:
                    this.DataMgr = new gsDataMgmnt.CSOM();
                    break;
                case 1 /* REST */:
                    this.DataMgr = new gsDataMgmnt.REST();
                    break;
                case 2 /* SSOM */:
                    throw new Error("SSOM API not supported");
                default:
                    throw new Error("API not supported yet");
            }
        }
        MeetingModel.prototype.Load = function (rootItemIdentity, cb) {
            var _this = this;
            if (!rootItemIdentity)
                throw new Error("Model root item id undefined");

            var m = new this.MeetingType();

            this.DataMgr.LoadFromList(rootItemIdentity, new gsDataMgmnt.Callback(function (data) {
                _this.Meeting = ko.mapping.fromJS(data);
                cb.success(_this.Meeting);
            }, function () {
                cb.fail();
            }), m.getListTitle());
        };
        return MeetingModel;
    })();
    gsBaseModel.MeetingModel = MeetingModel;
})(gsBaseModel || (gsBaseModel = {}));
//# sourceMappingURL=gs.BaseModel.js.map

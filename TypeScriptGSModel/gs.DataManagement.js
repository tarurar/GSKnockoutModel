/// <reference path="Scripts/typings/sharepoint/SharePoint.d.ts"/>
/// <reference path="Scripts/typings/camljs/camljs.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var gsDataMgmnt;
(function (gsDataMgmnt) {
    var Callback = (function () {
        function Callback(success, fail) {
            this.success = success;
            this.fail = fail;
        }
        return Callback;
    })();
    gsDataMgmnt.Callback = Callback;

    var BaseDataManagement = (function () {
        function BaseDataManagement() {
        }
        BaseDataManagement.prototype.LoadFromList = function (identity, cb, source) {
            throw new Error("Not implemented");
        };

        BaseDataManagement.prototype.Save = function (success, fail) {
            throw new Error("Not implemented");
        };
        return BaseDataManagement;
    })();
    gsDataMgmnt.BaseDataManagement = BaseDataManagement;

    var SPDataManagement = (function (_super) {
        __extends(SPDataManagement, _super);
        function SPDataManagement() {
            _super.apply(this, arguments);
        }
        return SPDataManagement;
    })(BaseDataManagement);
    gsDataMgmnt.SPDataManagement = SPDataManagement;

    var CSOM = (function (_super) {
        __extends(CSOM, _super);
        function CSOM(context) {
            _super.call(this);
            this.context = context;

            if (!context) {
                this.context = SP.ClientContext.get_current();
            }
        }
        CSOM.prototype.LoadFromList = function (identity, cb, source) {
            if (!this.context)
                throw new Error("SP.ClientContext not defined");

            var list = this.context.get_web().get_lists().getByTitle(source);
            var item = list.getItemById(+identity);
            this.context.load(item);
            this.context.executeQueryAsync(function (sender, args) {
                cb.success(item);
            }, function (sender, args) {
                cb.fail();
            });
        };
        return CSOM;
    })(SPDataManagement);
    gsDataMgmnt.CSOM = CSOM;

    var REST = (function (_super) {
        __extends(REST, _super);
        function REST(endpoint) {
            _super.call(this);
            this.endpoint = endpoint;

            if (!endpoint) {
                var origin = window.location["origin"];
                this.endpoint = origin ? origin : (window.location.protocol + "//" + window.location.host);
            }
        }
        REST.prototype.LoadFromList = function (identity, cb, source) {
            if (!this.endpoint)
                throw new Error("REST endpoint not defined");

            var url = this.endpoint + "/_api/web/lists/getByTitle('" + source + "')/items(" + +identity + ")";

            $.getJSON(url, function (data, textStatus, jqXHR) {
                cb.success(data);
            });
        };
        return REST;
    })(SPDataManagement);
    gsDataMgmnt.REST = REST;
})(gsDataMgmnt || (gsDataMgmnt = {}));
//# sourceMappingURL=gs.DataManagement.js.map

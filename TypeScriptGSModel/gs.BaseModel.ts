/// <reference path="gs.DataManagement.ts"/>

module gsBaseModel {

    export enum SPServerAPI {
        CSOM,
        REST,
        SSOM
    }

    export class BaseModelItem {
    }

    export class SPBaseModelItem extends BaseModelItem {
    }

    export class SPListBaseModelItem extends SPBaseModelItem {
        public getListTitle(): string {
            return "undefined";
        }
    }

    export class MeetingItem extends SPListBaseModelItem {
    }

    export class IssueItem extends SPListBaseModelItem {
    }

    export class GsMeetingItem extends MeetingItem {
        public getListTitle(): string {
            return "Заседания";
        }
    }

    export class GsIssueItem extends IssueItem {
        public getListTitle(): string {
            return "Вопросы повестки заседания";
        }
    }

    export class MvkMeetingItem extends MeetingItem {
        public getListTitle(): string {
            return "Заседания МВК";
        }
    }

    export class MvkIssueItem extends IssueItem {
        public getListTitle(): string {
            return "Вопросы повестки заседания МВК";
        }
    }

    export class MeetingModel {
        public Meeting: any;
        public IssueList: any[];
        private DataMgr: gsDataMgmnt.IDataManagement;

        constructor(private MeetingType, private IssueType, api?: SPServerAPI) {
            var _api = api ? api : (SP.ClientContext.get_current() ? SPServerAPI.CSOM : SPServerAPI.REST);

            switch (_api) {
                case SPServerAPI.CSOM:
                    this.DataMgr = new gsDataMgmnt.CSOM();                  
                    break;
                case SPServerAPI.REST:
                    this.DataMgr = new gsDataMgmnt.REST();
                    break;
                case SPServerAPI.SSOM:
                    throw new Error("SSOM API not supported");
                default:
                    throw new Error("API not supported yet");
            }
        }


        public Load(rootItemIdentity: string, cb: gsDataMgmnt.Callback): void {
            if (!rootItemIdentity) throw new Error("Model root item id undefined");

            var m = <MeetingItem> new this.MeetingType();

            this.DataMgr.LoadFromList(rootItemIdentity,
                new gsDataMgmnt.Callback(
                    (data) => {
                        this.Meeting = ko.mapping.fromJS(data);
                        cb.success(this.Meeting);
                    },
                    () => {
                        cb.fail();
                    }
                    ), m.getListTitle()
            );
        }
    }
}
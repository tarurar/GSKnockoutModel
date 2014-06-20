/// <reference path="Scripts/typings/sharepoint/SharePoint.d.ts"/>
/// <reference path="Scripts/typings/camljs/camljs.d.ts"/>

module gsDataMgmnt {

    export class Callback {
        constructor(public success: (data: any) => void, public fail: () => void) {

        }
    }

    export interface IDataManagement {
        LoadFromList(identity: string, cb: Callback, source?: string): void;
        Save(success: () => void, fail: () => void): boolean;
    }

    export class BaseDataManagement implements IDataManagement {

        public LoadFromList(identity: string, cb: Callback, source?: string): void {
            throw new Error("Not implemented");
        }

        public Save(success: () => void, fail: () => void): boolean {
            throw new Error("Not implemented");
        }
    }

    export class SPDataManagement extends BaseDataManagement {

    }

    export class CSOM extends SPDataManagement {

        constructor(private context?: SP.ClientContext) {
            super();

            if (!context) {
                this.context = SP.ClientContext.get_current();
            }
        }

        public LoadFromList(identity: string, cb: Callback, source?: string): void {
            if (!this.context) throw new Error("SP.ClientContext not defined");
            

            var list = this.context.get_web().get_lists().getByTitle(source);
            var item = list.getItemById(+identity);
            this.context.load(item);
            this.context.executeQueryAsync(
                (sender, args) => {
                    cb.success(item)
                },
                (sender, args) => {
                    cb.fail();
                }
            );
        }

    }

    export class REST extends SPDataManagement {
        constructor(private endpoint?: string) {
            super();

            if (!endpoint) {
                var origin = window.location["origin"];
                this.endpoint = origin ? origin : (window.location.protocol + "//" + window.location.host);
            }
        }

        public LoadFromList(identity: string, cb: Callback, source?: string): void {
            if (!this.endpoint) throw new Error("REST endpoint not defined");
            
            var url = this.endpoint + "/_api/web/lists/getByTitle('" + source + "')/items(" + +identity + ")";
            
            $.getJSON(url, (data, textStatus, jqXHR) => {
                cb.success(data);
            })
        }
    }
}
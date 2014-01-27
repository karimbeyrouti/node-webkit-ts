/// <reference path="../../src/libs/node.d.ts" />
declare module kurst.event {
    class EventDispatcher {
        private listeners;
        private lFncLength;
        public addEventListener(type: string, listener: Function): void;
        public removeEventListener(type: string, listener: Function): void;
        public dispatchEvent(event: Event): void;
    }
    class Event {
        public type: string;
        public target: Object;
        constructor(type: string);
    }
}
declare module kurst.core {
    class UIBase extends kurst.event.EventDispatcher {
        constructor();
        public getId(id: string): HTMLElement;
        public getClass(className: string): NodeList;
        public getElementsByClassNme(theClass: string): Node[];
    }
}
declare var fs: any;
declare class Main extends kurst.core.UIBase {
    private chooser;
    constructor();
    private fileChoosen(event);
    private readDirectoryCallback(err, list);
}

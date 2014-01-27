// https://github.com/mrdoob/eventdispatcher.js/
var kurst;
(function (kurst) {
    (function (event) {
        var EventDispatcher = (function () {
            function EventDispatcher() {
                //--------------------------------------------------------------------------
                this.listeners = new Array();
            }
            //--------------------------------------------------------------------------
            /*
            */
            EventDispatcher.prototype.addEventListener = function (type, listener) {
                if (this.listeners[type] === undefined) {
                    this.listeners[type] = new Array();
                }

                if (this.listeners[type].indexOf(listener) === -1) {
                    this.listeners[type].push(listener);
                }
            };

            /*
            */
            EventDispatcher.prototype.removeEventListener = function (type, listener) {
                var index = this.listeners[type].indexOf(listener);

                if (index !== -1) {
                    this.listeners[type].splice(index, 1);
                }
            };

            /*
            */
            EventDispatcher.prototype.dispatchEvent = function (event) {
                var listenerArray = this.listeners[event.type];

                if (listenerArray !== undefined) {
                    this.lFncLength = listenerArray.length;
                    event.target = this;

                    for (var i = 0, l = this.lFncLength; i < l; i++) {
                        listenerArray[i].call(this, event);
                    }
                }
            };
            return EventDispatcher;
        })();
        event.EventDispatcher = EventDispatcher;

        //--------------------------------------------------------------------------
        var Event = (function () {
            function Event(type) {
                this.type = type;
            }
            return Event;
        })();
        event.Event = Event;
    })(kurst.event || (kurst.event = {}));
    var event = kurst.event;
})(kurst || (kurst = {}));
///<reference path="../events/EventDispatcher.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var kurst;
(function (kurst) {
    (function (core) {
        var UIBase = (function (_super) {
            __extends(UIBase, _super);
            //--------------------------------------------------------------------------
            function UIBase() {
                _super.call(this);
            }
            //--------------------------------------------------------------------------
            /*
            */
            UIBase.prototype.getId = function (id) {
                return document.getElementById(id);
            };

            /*
            */
            UIBase.prototype.getClass = function (className) {
                return document.getElementsByClassName(className);
            };

            /*
            */
            UIBase.prototype.getElementsByClassNme = function (theClass) {
                var classElms = new Array();
                var node = document;

                var i = 0;

                if (node.getElementsByClassName) {
                    var tempEls = node.getElementsByClassName(theClass);

                    for (i = 0; i < tempEls.length; i++) {
                        classElms.push(tempEls[i]);
                    }
                } else {
                    var getclass = new RegExp('\\b' + theClass + '\\b');
                    var elems = node.getElementsByTagName('*');

                    for (i = 0; i < elems.length; i++) {
                        var classes = elems[i]['className'];

                        if (getclass.test(classes)) {
                            classElms.push(elems[i]);
                        }
                    }
                }

                return classElms;
            };
            return UIBase;
        })(kurst.event.EventDispatcher);
        core.UIBase = UIBase;
    })(kurst.core || (kurst.core = {}));
    var core = kurst.core;
})(kurst || (kurst = {}));
///<reference path="kurst/core/UIBase.ts" />
///<reference path="libs/node.d.ts" />
var fs = require('fs');

var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = this;
        _super.call(this);

        this.chooser = this.getId('fileDialog'); //document.querySelector( '#fileDialog' );
        this.chooser.addEventListener("change", function (e) {
            return _this.fileChoosen(e);
        });
    }
    Main.prototype.fileChoosen = function (event) {
        var _this = this;
        var p = document.createElement('p');
        p.innerHTML = this.chooser.value;

        document.documentElement.appendChild(p);
        fs.readdir(this.chooser.value, function (err, list) {
            return _this.readDirectoryCallback(err, list);
        });
    };

    Main.prototype.readDirectoryCallback = function (err, list) {
        if (err) {
            return;
        }

        var ul = document.createElement('ul');

        for (var c = 0; c < list.length; c++) {
            var li = document.createElement('li');
            li.innerHTML = list[c];
            ul.appendChild(li);
        }

        document.documentElement.appendChild(ul);
    };
    return Main;
})(kurst.core.UIBase);

window.onload = function () {
    new Main();
};

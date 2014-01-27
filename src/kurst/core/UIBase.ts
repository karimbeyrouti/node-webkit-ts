///<reference path="../events/EventDispatcher.ts"/>

module kurst.core {

    export class UIBase extends kurst.event.EventDispatcher {

        //--------------------------------------------------------------------------

        constructor( )
        {
            super();
        }

        //--------------------------------------------------------------------------

        /*
         */
        public getId(id : string ) : HTMLElement
        {
            return <HTMLElement> document.getElementById( id );
        }
        /*
         */
        public getClass( className : string ) : NodeList
        {
            return document.getElementsByClassName( className );
        }
        /*
         */
        public getElementsByClassNme( theClass : string ) : Node[]
        {

            var classElms   : Node[] = new Array<Node>();
            var node        : Document = document;

            var i = 0

            if ( node.getElementsByClassName ) { // check if it's available natively

                var tempEls = node.getElementsByClassName(theClass);

                for ( i = 0 ; i < tempEls.length ; i++) {

                    classElms.push(tempEls[i]);

                }

            } else {  // if a native implementation is not available, use a custom one

                var getclass    : RegExp    = new RegExp('\\b'+theClass+'\\b');
                var elems       : NodeList  = node.getElementsByTagName('*');

                for ( i = 0; i < elems.length; i++) {

                    var classes = elems[i]['className'];

                    if ( getclass.test( classes )) {

                        classElms.push(elems[i]);

                    }

                }
            }

            return classElms;

        }

    }

}
// https://github.com/mrdoob/eventdispatcher.js/

module kurst.event {

    export class EventDispatcher{

        //--------------------------------------------------------------------------

        private listeners   : Array<Object> = new Array<Object>();
        private lFncLength  : number;

        //--------------------------------------------------------------------------

        /*
         */
        public addEventListener ( type : string , listener : Function ) {

            if ( this.listeners[ type ] === undefined ) {

                this.listeners[ type ] = new Array<Function>();

            }

            if ( this.listeners[ type ].indexOf( listener ) === - 1 ) {

                this.listeners[ type ].push( listener );

            }

        }
        /*
         */
        public removeEventListener ( type : string , listener : Function ) {

            var index = this.listeners[ type ].indexOf( listener );

            if ( index !== - 1 ) {

                this.listeners[ type ].splice( index, 1 );

            }

        }
        /*
         */
        public dispatchEvent ( event : Event ) {

            var listenerArray : Function[] = <Function[]> this.listeners[ event.type ];

            if ( listenerArray !== undefined ) {

                this.lFncLength     = listenerArray.length;
                event.target        = this;

                for ( var i = 0, l = this.lFncLength; i < l; i ++ ) {

                    listenerArray[ i ].call( this, event );

                }
            }

        }

        //--------------------------------------------------------------------------

    }

    //--------------------------------------------------------------------------

    export class Event{

        public type     : string;
        public target   : Object;

        constructor( type : string ) {

            this.type = type;

        }

    }

}

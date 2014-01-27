///<reference path="kurst/core/UIBase.ts" />
///<reference path="libs/node.d.ts" />

var fs = require('fs');

class Main extends kurst.core.UIBase
{
    private chooser : HTMLInputElement;

    constructor()
    {
        super();

        this.chooser = <HTMLInputElement> this.getId( 'fileDialog' );//document.querySelector( '#fileDialog' );
        this.chooser.addEventListener("change", ( e ) => this.fileChoosen( e ) );
    }

    private fileChoosen( event : any ) : void
    {
        var p : HTMLParagraphElement    = document.createElement( 'p' );
            p.innerHTML                 = this.chooser.value;

        document.documentElement.appendChild( p );
        fs.readdir( this.chooser.value , ( err : ErrnoException , list : Array<string>) => this.readDirectoryCallback( err , list ));
    }

    private readDirectoryCallback( err: ErrnoException , list : Array<string> ) : void
    {
        if ( err )
        {
            return;
        }

        var ul : HTMLUListElement = document.createElement( 'ul');

        for ( var c : number = 0 ; c < list.length ; c++ )
        {
            var li : HTMLLIElement = document.createElement( 'li' );
            li.innerHTML = list[c];
            ul.appendChild( li );

        }

        document.documentElement.appendChild( ul );
    }
}

window.onload = function () : void
{
    new Main();
}
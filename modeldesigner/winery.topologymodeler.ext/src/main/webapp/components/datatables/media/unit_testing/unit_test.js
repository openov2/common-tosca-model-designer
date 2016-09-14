/*
 * Copyright 2016 [ZTE] and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var oTest = {
	/* Block further tests from occuring - might be end of tests or due to async wait */
	bBlock: false,
	
	/* Number of times to try retesting for a blocking test */
	iReTestLimit: 20,
	
	/* Amount of time to wait between trying for an async test */
	iReTestDelay: 150,
	
	/* End tests - external control */
	bEnd: false,
	
	/* Internal variables */
	_aoQueue: [],
	_iReTest: 0,
	_bFinished: false,
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Recommened public functions
	 */
	
	/*
	 * Function: fnTest
	 * Purpose:  Add a test to the queue
	 * Returns:  -
	 * Inputs:   string:sMessage - name of the test
	 *           function:fnTest - function which will be evaludated to get the test result
	 */
	"fnTest": function ( sMessage, fnSetup, fnTest )
	{
		this._aoQueue.push( {
			"sMessage": sMessage,
			"fnSetup": fnSetup,
			"fnTest": fnTest,
			"bPoll": false
		} );
		this._fnNext();
	},
	
	/*
	 * Function: fnWaitTest
	 * Purpose:  Add a test to the queue which has a re-test cycle
	 * Returns:  -
	 * Inputs:   string:sMessage - name of the test
	 *           function:fnTest - function which will be evaludated to get the test result
	 */
	"fnWaitTest": function ( sMessage, fnSetup, fnTest )
	{
		this._aoQueue.push( {
			"sMessage": sMessage,
			"fnSetup": fnSetup,
			"fnTest": fnTest,
			"bPoll": true
		} );
		this._fnNext();
	},
	
	/*
	 * Function: fnStart
	 * Purpose:  Indicate that this is a new unit and what it is testing (message to end user)
	 * Returns:  -
	 * Inputs:   string:sMessage - message to give to the user about this unit
	 */
	"fnStart": function ( sMessage )
	{
		window.parent.controller.fnStartMessage( sMessage );
	},
	
	/*
	 * Function: fnComplete
	 * Purpose:  Tell the controller that we are all done here
	 * Returns:  -
	 * Inputs:   -
	 */
	"fnComplete": function ()
	{
		this._bFinished = true;
		this._fnNext();
	},
	
	/*
	 * Function: fnCookieDestroy
	 * Purpose:  Destroy a cookie of a given name
	 * Returns:  -
	 * Inputs:   -
	 */
	"fnCookieDestroy": function ( oTable )
	{
		var sName = oTable.fnSettings().sCookiePrefix+oTable.fnSettings().sInstance;
		var aParts = window.location.pathname.split('/');
		var sNameFile = sName + '_' + aParts.pop().replace(/[\/:]/g,"").toLowerCase();
		document.cookie = sNameFile+"=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path="+
			aParts.join('/') + "/";
	},
	
	
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Internal functions
	 */
	
	
	"_fnReTest": function ( oTestInfo )
	{
		var bResult = oTestInfo.fnTest( );
		if ( bResult )
		{
			/* Test passed on retry */
			this._fnResult( true );
			this._fnNext();
		}
		else
		{
			if ( this._iReTest < this.iReTestLimit )
			{
				this._iReTest++;
				setTimeout( function() {
					oTest._fnReTest( oTestInfo );
				}, this.iReTestDelay );
			}
			else
			{
				this._fnResult( false );
			}
		}
	},
	
	"_fnNext": function ()
	{
		if ( this.bEnd )
		{
			return;
		}
		
		if ( !this.bBlock && this._aoQueue.length > 0 )
		{
			var oNextTest = this._aoQueue.shift();
			window.parent.controller.fnTestStart( oNextTest.sMessage );
			this.bBlock = true;
			
			if ( typeof oNextTest.fnSetup == 'function' )
			{
				oNextTest.fnSetup( );
			}
			var bResult = oNextTest.fnTest( );
			//bResult = false;
			
			if ( oNextTest.bPoll )
			{
				if ( bResult )
				{
					this._fnResult( true );
					this._fnNext();
				}
				else
				{
					_iReTest = 0;
					setTimeout( function() {
						oTest._fnReTest( oNextTest );
					}, this.iReTestDelay );
				}
			}
			else
			{
				this._fnResult( bResult );
				this._fnNext();
			}
		}
		else if ( !this.bBlock && this._aoQueue.length == 0 && this._bFinished )
		{
			window.parent.controller.fnUnitComplete( );
		}
	},
	
	"_fnResult": function ( b )
	{
		window.parent.controller.fnTestResult( b );
		this.bBlock = false;
		if ( !b )
		{
			this.bEnd = true;
		}
	}
};


var oDispacher = {
	"click": function ( nNode, oSpecial )
	{
		var evt = this.fnCreateEvent( 'click', nNode, oSpecial );
		if ( nNode.dispatchEvent )
			nNode.dispatchEvent(evt);
		else
			nNode.fireEvent('onclick', evt);
	},
	
	"change": function ( nNode )
	{
		var evt = this.fnCreateEvent( 'change', nNode );
		if ( nNode.dispatchEvent )
		nNode.dispatchEvent(evt);
		else
			nNode.fireEvent('onchange', evt);
	},
	
	
	/*
	 * Function: fnCreateEvent
	 * Purpose:  Create an event oject based on the type to trigger an event - x-platform
	 * Returns:  event:evt
	 * Inputs:   string:sType - type of event
	 *           node:nTarget - target node of the event
	 */
	fnCreateEvent: function( sType, nTarget, oSpecial )
	{
		var evt = null;
		var oTargetPos = this._fnGetPos( nTarget );
		var sTypeGroup = this._fnEventTypeGroup( sType );
		if ( typeof oSpecial == 'undefined' )
		{
			oSpecial = {};
		}
		
		var ctrlKey = false;
		var altKey = false;
		var shiftKey = (typeof oSpecial.shift != 'undefined') ? oSpecial.shift : false;
		var metaKey = false;
		var button = false;
		
		if ( document.createEvent )
		{
			switch ( sTypeGroup )
			{
				case 'mouse':
					evt = document.createEvent( "MouseEvents" );
					evt.initMouseEvent( sType, true, true, window, 0, oTargetPos[0], oTargetPos[1], 
						oTargetPos[0], oTargetPos[1], ctrlKey, altKey, shiftKey, 
						metaKey, button, null );
					break;
				
				case 'html':
					evt = document.createEvent( "HTMLEvents" );
					evt.initEvent( sType, true, true );
					break;
					
				case 'ui':
					evt = document.createEvent( "UIEvents" );
					evt.initUIEvent( sType, true, true, window, 0 );
					break;
				
				default:
					break;
			}
		}
		else if ( document.createEventObject )
		{
			switch ( sTypeGroup )
			{
				case 'mouse':
					evt = document.createEventObject();
					evt.screenX = oTargetPos[0];
					evt.screenX = oTargetPos[1];
					evt.clientX = oTargetPos[0];
					evt.clientY = oTargetPos[1];
					evt.ctrlKey = ctrlKey;
					evt.altKey = altKey;
					evt.shiftKey = shiftKey;
					evt.metaKey = metaKey;
					evt.button = button;
					evt.relatedTarget = null;
					break;
				
				case 'html':
					/* fall through to basic event object */
					
				case 'ui':
					evt = document.createEventObject();
					break;
				
				default:
					break;
			}
		}
		
		return evt;
	},
	
	/* 
	 * Function: DesignCore.fnGetPos
	 * Purpose:  Get the position of an element on the page
	 * Returns:  array[ 0-int:left, 1-int:top ]
	 * Inputs:   node:obj - node to analyse
	 */
	_fnGetPos: function ( obj ) 
	{
		var curleft = 0;
		var curtop = 0;
		
		if (obj.offsetParent) 
		{
			curleft = obj.offsetLeft;
			curtop = obj.offsetTop;
			while (obj = obj.offsetParent ) 
			{
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			}
		}
		return [curleft,curtop];
	},
	
	
	/*
	 * Function: _fnEventTypeGroup
	 * Purpose:  Group the event types as per w3c groupings
	 * Returns:  -
	 * Inputs:   string:sType
	 */
	_fnEventTypeGroup: function ( sType )
	{
		switch ( sType )
		{
			case 'click':
			case 'dblclick':
			case 'mousedown':
			case 'mousemove':
			case 'mouseout':
			case 'mouseover':
			case 'mouseup':
				return 'mouse';
			
			case 'change':
			case 'focus':
			case 'blur':
			case 'select':
			case 'submit':
				return 'html';
				
			case 'keydown':
			case 'keypress':
			case 'keyup':
			case 'load':
			case 'unload':
				return 'ui';
			
			default:
				return 'custom';
		}
	}
}


var oSession = {
	nTable: null,
	
	fnCache: function ()
	{
		this.nTable = document.getElementById('demo').cloneNode(true);
	},
	
	fnRestore: function ()
	{
		while( $.fn.dataTableSettings.length > 0 )
		{
			try {
				$.fn.dataTableSettings[0].oInstance.fnDestroy();
			} catch (e) {
				$.fn.dataTableSettings.splice( 0, 1 );
			}
		}
		//$.fn.dataTableSettings.splice( 0, $.fn.dataTableSettings.length );
		var nDemo = document.getElementById('demo');
		nDemo.innerHTML = "";
		for ( var i=0, iLen=this.nTable.childNodes.length ; i<iLen ; i++ )
		{
			nDemo.appendChild( this.nTable.childNodes[0] );
		}
		this.fnCache();
	}
}

$(document).ready( function () {
	oSession.fnCache();
} );

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
// DATA_TEMPLATE: empty_table
oTest.fnStart( "oLanguage.sProcessing" );

$(document).ready( function () {
	/* Check the default */
	var oTable = $('#example').dataTable( {
		"bServerSide": true,
		"sAjaxSource": "../../../examples/server_side/scripts/server_processing.php",
		"bProcessing": true
	} );
	var oSettings = oTable.fnSettings();
	
	oTest.fnWaitTest( 
		"Processing language is 'Processing...' by default",
		null,
		function () { return oSettings.oLanguage.sProcessing == "Processing..."; }
	);
	
	oTest.fnTest( 
		"Processing language default is in the DOM",
		null,
		function () { return document.getElementById('example_processing').innerHTML = "Processing..."; }
	);
	
	
	oTest.fnWaitTest( 
		"Processing language can be defined",
		function () {
			oSession.fnRestore();
			oTable = $('#example').dataTable( {
				"bServerSide": true,
		"sAjaxSource": "../../../examples/server_side/scripts/server_processing.php",
				"bProcessing": true,
				"oLanguage": {
					"sProcessing": "unit test"
				}
			} );
			oSettings = oTable.fnSettings();
		},
		function () { return oSettings.oLanguage.sProcessing == "unit test"; }
	);
	
	oTest.fnTest( 
		"Processing language definition is in the DOM",
		null,
		function () { return document.getElementById('example_processing').innerHTML = "unit test"; }
	);
	
	
	oTest.fnComplete();
} );
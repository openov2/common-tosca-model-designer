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
oTest.fnStart( "bFilter" );

$(document).ready( function () {
	/* Check the default */
	$('#example').dataTable( {
		"bServerSide": true,
		"sAjaxSource": "../../../examples/server_side/scripts/server_processing.php"
	} );
	
	oTest.fnWaitTest( 
		"Filtering div exists by default",
		null,
		function () { return document.getElementById('example_filter') != null; }
	);
	
	/* Check can disable */
	oTest.fnWaitTest( 
		"Fltering can be disabled",
		function () {
			oSession.fnRestore();
			$('#example').dataTable( {
				"bServerSide": true,
		"sAjaxSource": "../../../examples/server_side/scripts/server_processing.php",
				"bFilter": false
			} );
		},
		function () { return document.getElementById('example_filter') == null; }
	);
	
	/* Enable makes no difference */
	oTest.fnWaitTest( 
		"Filtering enabled override",
		function () {
			oSession.fnRestore();
			$('#example').dataTable( {
				"bServerSide": true,
		"sAjaxSource": "../../../examples/server_side/scripts/server_processing.php",
				"bFilter": true
			} );
		},
		function () { return document.getElementById('example_filter') != null; }
	);
	
	
	oTest.fnComplete();
} );
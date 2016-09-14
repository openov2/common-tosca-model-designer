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
// DATA_TEMPLATE: dom_data
oTest.fnStart( "oLanguage.sSearch" );

$(document).ready( function () {
	/* Check the default */
	var oTable = $('#example').dataTable();
	var oSettings = oTable.fnSettings();
	
	oTest.fnTest( 
		"Search language is 'Search:' by default",
		null,
		function () { return oSettings.oLanguage.sSearch == "Search:"; }
	);
	
	oTest.fnTest(
		"A label input is used",
		null,
		function () { return $('label', oSettings.aanFeatures.f[0]).length == 1 }
	);
	
	oTest.fnTest( 
		"Search language default is in the DOM",
		null,
		function () { return $('label', oSettings.aanFeatures.f[0]).text()
		 	== "Search: "; }
	);
	
	
	oTest.fnTest( 
		"Search language can be defined",
		function () {
			oSession.fnRestore();
			oTable = $('#example').dataTable( {
				"oLanguage": {
					"sSearch": "unit test"
				}
			} );
			oSettings = oTable.fnSettings();
		},
		function () { return oSettings.oLanguage.sSearch == "unit test"; }
	);
	
	oTest.fnTest( 
		"Info language definition is in the DOM",
		null,
		function () { return $('label', oSettings.aanFeatures.f[0]).text().indexOf('unit test') !== -1; }
	);
	
	
	oTest.fnTest( 
		"Blank search has a no (separator) inserted",
		function () {
			oSession.fnRestore();
			oTable = $('#example').dataTable( {
				"oLanguage": {
					"sSearch": ""
				}
			} );
			oSettings = oTable.fnSettings();
		},
		function () { return document.getElementById('example_filter').childNodes.length == 1; }
	);
	
	
	oTest.fnComplete();
} );
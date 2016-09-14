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
// DATA_TEMPLATE: dymanic_table
oTest.fnStart( "2530 - Check width's when dealing with empty strings" );


$(document).ready( function () {
	$('#example').dataTable( {
		"aaData": [
			['','Internet Explorer 4.0','Win 95+','4','X'],
			['','Internet Explorer 5.0','Win 95+','5','C']
		],
		"aoColumns": [
			{ "sTitle": "", "sWidth": "40px" },
			{ "sTitle": "Browser" },
			{ "sTitle": "Platform" },
			{ "sTitle": "Version", "sClass": "center" },
			{ "sTitle": "Grade", "sClass": "center" }
		]
	} );
	
	/* Basic checks */
	oTest.fnTest( 
		"Check calculated widths",
		null,
		function () { return $('#example tbody tr td:eq(0)').width() < 100; }
	);
	
	
	oTest.fnComplete();
} );
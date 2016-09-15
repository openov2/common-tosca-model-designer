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
oTest.fnStart( "5508 - Table container width doesn't change when filtering applied to scrolling table" );

$(document).ready( function () {
	$('#example').dataTable( {
		"sScrollY": "300px",
		"bPaginate": false
	} );
	
	oTest.fnTest( 
		"Width of container 800px on init with scroll",
		null,
		function () { return $('div.dataTables_scrollBody').width() == 800; }
	);
	
	oTest.fnTest( 
		"Unaltered when filter applied",
		function () { $('#example').dataTable().fnFilter('123'); },
		function () { return $('div.dataTables_scrollBody').width() == 800; }
	);
	
	oTest.fnComplete();
} );
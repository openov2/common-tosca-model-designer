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
oTest.fnStart( "aoColumns.sWidth" );

/* NOTE - we need to disable the auto width for the majority of these test in order to preform 
 * these tests as the auto width will convert the width to a px value. We can do 'non-exact' tests
 * with auto width enabled however to ensure it scales columns as required
 */

$(document).ready( function () {
	/* Check the default */
	var oTable = $('#example').dataTable( {
		"sAjaxSource": "../../../examples/ajax/sources/objects.txt",
		"bAutoWidth": false,
		"aoColumns": [
			{ "mData": "engine" },
			{ "mData": "browser", "sWidth": '40%' },
			{ "mData": "platform" },
			{ "mData": "version" },
			{ "mData": "grade" }
		]
	} );
	var oSettings = oTable.fnSettings();
	
	oTest.fnWaitTest( 
		"With auto width disabled the width for one column is appled",
		null,
		function () { return $('#example thead th:eq(1)')[0].style.width == "40%"; }
	);
	
	oTest.fnWaitTest( 
		"With auto width disabled the width for one column is appled",
		function () {
			oSession.fnRestore();
			oTable = $('#example').dataTable( {
				"sAjaxSource": "../../../examples/ajax/sources/objects.txt",
				"bAutoWidth": false,
				"aoColumns": [
					{ "mData": "engine" },
					{ "mData": "browser" },
					{ "mData": "platform", "sWidth": '20%' },
					{ "mData": "version", "sWidth": '30%' },
					{ "mData": "grade" }
				]
			} );
		},
		function () {
			var bReturn =
				$('#example thead th:eq(2)')[0].style.width == "20%" &&
				$('#example thead th:eq(3)')[0].style.width == "30%";
			return bReturn;
		}
	);
	
	
	oTest.fnWaitTest( 
		"With auto width, it will make the smallest column the largest with percentage width given",
		function () {
			oSession.fnRestore();
			oTable = $('#example').dataTable( {
				"sAjaxSource": "../../../examples/ajax/sources/objects.txt",
				"aoColumns": [
					{ "mData": "engine" },
					{ "mData": "browser" },
					{ "mData": "platform" },
					{ "mData": "version", "sWidth": '40%' },
					{ "mData": "grade" }
				]
			} );
		},
		function () {
			var anThs = $('#example thead th');
			var a0 = anThs[0].offsetWidth;
			var a1 = anThs[1].offsetWidth;
			var a2 = anThs[2].offsetWidth;
			var a3 = anThs[3].offsetWidth;
			var a4 = anThs[4].offsetWidth;
			
			if ( a3>a0 && a3>a1 && a3>a2 && a3>a4 )
				return true;
			else
				return false;
		}
	);
	
	
	oTest.fnComplete();
} );
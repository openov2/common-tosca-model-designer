<?php
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
error_reporting(0);

$ts = $_REQUEST['ts'];
$etag = md5($ts);

$ifNoneMatch = isset($_SERVER['HTTP_IF_NONE_MATCH']) ? stripslashes($_SERVER['HTTP_IF_NONE_MATCH']) : false;
if ($ifNoneMatch == $etag) {
	header('HTTP/1.0 304 Not Modified');
	die; // stop processing
}

header("Etag: " . $etag);

if ( $ifNoneMatch ) {
	echo "OK: " . $etag;
} else {
	echo "FAIL";
}

?>

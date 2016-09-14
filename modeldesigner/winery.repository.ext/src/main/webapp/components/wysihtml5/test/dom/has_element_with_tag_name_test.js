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
module("wysihtml5.dom.hasElementWithTagName", {
  teardown: function() {
    var iframe;
    while (iframe = document.querySelector("iframe.wysihtml5-sandbox")) {
      iframe.parentNode.removeChild(iframe);
    }
  }
});


asyncTest("Basic test", function() {
  expect(3);
  
  new wysihtml5.dom.Sandbox(function(sandbox) {
    var doc         = sandbox.getDocument(),
        tempElement = doc.createElement("i");
    ok(!wysihtml5.dom.hasElementWithTagName(doc, "I"));
    doc.body.appendChild(tempElement);
    ok(wysihtml5.dom.hasElementWithTagName(doc, "I"));
    tempElement.parentNode.removeChild(tempElement);
    ok(!wysihtml5.dom.hasElementWithTagName(doc, "I"));
    
    start();
  }).insertInto(document.body);
});
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
/*! Tocca.js v0.1.0 || Gianluca Guarini */
!function(a,b){"use strict";if("function"!=typeof a.createEvent)return!1;var c,d,e,f,g,h="undefined"!=typeof jQuery,i=!!navigator.pointerEnabled||navigator.msPointerEnabled,j=!!("ontouchstart"in window)&&navigator.userAgent.indexOf("PhantomJS")<0||i,k=function(a){var b=a.toLowerCase(),c="MS"+a;return navigator.msPointerEnabled?c:b},l={touchstart:k("PointerDown")+" touchstart",touchend:k("PointerUp")+" touchend",touchmove:k("PointerMove")+" touchmove"},m=function(a,b,c){for(var d=b.split(" "),e=d.length;e--;)a.addEventListener(d[e],c,!1)},n=function(a){return a.targetTouches?a.targetTouches[0]:a},o=function(b,e,f,g){var i=a.createEvent("Event");if(g=g||{},g.x=c,g.y=d,g.distance=g.distance,h)jQuery(b).trigger(e,g);else{i.originalEvent=f;for(var j in g)i[j]=g[j];i.initEvent(e,!0,!0),b.dispatchEvent(i)}},p=function(a){var b=n(a);e=c=b.pageX,f=d=b.pageY,s=!0,x++,clearTimeout(g),g=setTimeout(function(){e>=c-v&&c+v>=e&&f>=d-v&&d+v>=f&&!s&&o(a.target,2===x?"dbltap":"tap",a),x=0},u)},q=function(a){var b=[],g=f-d,h=e-c;if(s=!1,-t>=h&&b.push("swiperight"),h>=t&&b.push("swipeleft"),-t>=g&&b.push("swipedown"),g>=t&&b.push("swipeup"),b.length)for(var i=0;i<b.length;i++){var j=b[i];o(a.target,j,a,{distance:{x:Math.abs(h),y:Math.abs(g)}})}},r=function(a){var b=n(a);c=b.pageX,d=b.pageY},s=!1,t=b.SWIPE_TRESHOLD||80,u=b.TAP_TRESHOLD||200,v=b.TAP_PRECISION/2||30,w=b.JUST_ON_TOUCH_DEVICES||j,x=0;m(a,l.touchstart+(w?"":" mousedown"),p),m(a,l.touchend+(w?"":" mouseup"),q),m(a,l.touchmove+(w?"":" mousemove"),r)}(document,window);
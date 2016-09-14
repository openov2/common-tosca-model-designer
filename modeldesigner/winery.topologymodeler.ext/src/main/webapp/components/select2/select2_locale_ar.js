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
/**
 * Select2 Arabic translation.
 * 
 * Author: Your Name <amedhat3@gmail.com>
 */
(function ($) {
    "use strict";

    $.extend($.fn.select2.defaults, {
        formatNoMatches: function () { return "لا توجد نتائج"; },
        formatInputTooShort: function (input, min) { var n = min - input.length; return "من فضلك أدخل " + n + " حروف أكثر"; },
        formatInputTooLong: function (input, max) { var n = input.length - max; return "من فضلك أحذف  " + n + " حروف"; },
        formatSelectionTooBig: function (limit) { return "يمكنك ان تختار " + limit + " أختيارات فقط"; },
        formatLoadMore: function (pageNumber) { return "تحمل المذيد من النتائج ..."; },
        formatSearching: function () { return "جاري البحث ..."; }
    });
})(jQuery);

/*!
 * jQuery serializeObject plugin
 * Original author: Neil K. Villareal
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Neil K. Villareal
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 */
;
(function($, window, document, undefined) {

    var pluginName = "serializeObject";
    var defaults = {
        requiredFormat: {}
    };

    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;
    }

    Plugin.prototype.toJsonObject = function() {
        var _this = this;
        var keyValues = _this.replaceEmptyBracketWithNumericBracket($(_this.element).serializeArray());

        var jsonObject = _this.options.requiredFormat;

        $.each(keyValues, function(key, obj) {
            var keys = obj.name.replace(/]/g, '').split("[");
            var vObject = _this.stringArrayKeyToVariable(keys, obj.value);

            jsonObject = $.extend(true, {}, jsonObject, vObject);
        });

        return jsonObject;
    }

    Plugin.prototype.replaceEmptyBracketWithNumericBracket = function(keyValues) {
        var lastIndexes = {};
        var newKeyValues = keyValues;

        $.each(newKeyValues, function(key, obj) {

            var keyName = obj.name;
            var hasSquareBrackets = keyName.indexOf("[]");

            if (hasSquareBrackets > -1) {
                lastIndexes[keyName] = (typeof lastIndexes[keyName] == "undefined") ? 0 : ++lastIndexes[keyName];
                newKeyValues[key].name = obj.name.replace("[]", "[" + (lastIndexes[keyName]) + "]");
            }
        });

        return newKeyValues;
    }

    Plugin.prototype.stringArrayKeyToVariable = function(stringVars, value) {
        var _this = this;

        var variable;
        if (stringVars.length > 0) {
            var stringVar = stringVars.shift().trim();
            variable = (isNaN(stringVar) && stringVar != "") ? {} : [];
            variable[stringVar] = (stringVars.length > 0) ? _this.stringArrayKeyToVariable(stringVars, value) : value;
        }

        return variable;
    }

    $.fn[pluginName] = function(options) {
        return new Plugin(this, options).toJsonObject();
    }

})(jQuery, window, document);
/*!
 * jQuery serializeArrayToJson plugin
 * Original author: Neil K. Villareal
 * Licensed under the MIT license
 */

;( function ( $, window, document, undefined ) {

	var pluginName = "serializeArrayToJson";
	var defaults = {
		requiredFormat: {}
	};
		
	function Plugin ( element, options ) {
		this.element = element;

		this.options = $.extend ( {}, defaults, options ) ;

        this._defaults = defaults;
        this._name = pluginName;
	}

	Plugin.prototype.toJsonObject = function() {
		var _this = this;
        var keyValues = _this.replaceEmptyBracketWithNumericBracket ( $( _this.element ).serializeArray() );

		var jsonObject = _this.options.requiredFormat;

		$.each(keyValues, function ( key, obj ) {
			var keys = obj.name.replace( /]/g, '' ).split( "[" );
			var vObject = _this.stringArrayKeyToVariable( keys, obj.value );

			jsonObject = $.extend( true, {}, jsonObject, vObject );
		});

		return jsonObject;
	}

	Plugin.prototype.replaceEmptyBracketWithNumericBracket = function ( keyValues ) {
		var lastIndexes = {};
		var newKeyValues = keyValues;

		$.each( newKeyValues, function ( key, obj ) {

			var keyName = obj.name;
			var hasSquareBrackets = keyName.indexOf( "[]" );

			if( hasSquareBrackets > -1 ) {
				lastIndexes [ keyName ] = ( typeof lastIndexes[keyName] == "undefined" )? 0: ++lastIndexes[keyName];
				newKeyValues [ key ].name = obj.name.replace( "[]", "["+(lastIndexes[keyName])+"]" );
			}
		});

		return newKeyValues;
	}

	Plugin.prototype.stringArrayKeyToVariable = function ( stringVars, value ) {
		var _this = this;
		var stringVars = stringVars.reverse();

		var variable;
		if( stringVars.length > 0 ) {
			var stringVar = stringVars.pop().trim();
			variable = ( isNaN( stringVar ) && stringVar != "" )? {}: [];
			variable[ stringVar ] = (stringVars.length > 0)? _this.stringArrayKeyToVariable(stringVars.reverse(), value): value;
		}

		return variable;
	}

	$.fn[ pluginName ] = function ( options ) {
		return new Plugin( this, options ).toJsonObject();
	}

})( jQuery, window, document );
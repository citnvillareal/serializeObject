# serializeArrayToJson
This jquery plugin will map the serialized form data array to JSON format.



##### Dependency
1. [jquery](https://github.com/citnvillareal/serializeArrayToJson/blob/master/js/jquery-1.11.3.min.js) library.



##### To Get Started
1. import the [jquery](https://github.com/citnvillareal/serializeArrayToJson/blob/master/js/jquery-1.11.3.min.js) library.
2. import the [jquery.serializeArrayToJson.js](https://github.com/citnvillareal/serializeArrayToJson/blob/master/js/jquery.serializeArrayToJson.js) plugin. 



##### First Usage 
	$( "form" ).serializeArrayToJson();



##### Second Usage
	var rFormat = {
		id: 0,
		name: "John Doe"
	};

	$( "form" ).serializeArrayToJson( { requiredFormat: rFormat } );



##### Example 01
	<form>
		<input type="text" name="txt01" value="Text 01" />
		<input type="text" name="txt02" value="Text 02" />

		<input type="submit" value="Submit" />
	</form>

	<script>
		( function( $ ){
			$( document ).ready( function(){
				$( "form" ).submit( function( e ) {
					e.preventDefault();

					var jsonObject = $( this ).serializeArrayToJson();
					console.log( jsonObject );
				} );
			} );
		} )( jQuery );
	</script>

##### Example 01: Console Output
	Object {
		txt01: "Text 01",
		txt02: "Text 02"
	}



##### Example 02
	<form>
		<input type="text" name="txt01[]" value="Text 01" />
		<input type="text" name="txt01[]" value="Text 02" />

		<input type="submit" value="Submit" />
	</form>

	<script>
		( function( $ ){
			$( document).ready( function(){
				$( "form" ).submit( function( e ) {
					e.preventDefault();

					var jsonObject = $( this ).serializeArrayToJson();
					console.log( jsonObject );
				} );
			} );
		} )( jQuery );
	</script>

##### Example 02: Console Output
	Object {
		txt01: Array(2) {
			0: "Text 01",
			1: "Text 02"
		}
	}



##### Example 03
	<form>
		<input type="text" name="txt01[name][]" value="Text 01" />
		<input type="text" name="txt01[name][]" value="Text 02" />

		<input type="text" name="txt01[phone][]" value="000001" />
		<input type="text" name="txt01[phone][]" value="000002" />

		<input type="submit" value="Submit" />
	</form>

	<script>
		( function( $ ){
			$( document ).ready( function(){
				$( "form" ).submit( function( e ) {
					e.preventDefault();

					var jsonObject = $( this ).serializeArrayToJson();
					console.log( jsonObject );
				} );
			} );
		} )( jQuery );
	</script>

##### Example 03: Console Output
	Object 
	{
		txt01: Object 
		{
			name: Array()
			{
				0: Text 01
				1: Text 02
			},
			
			phone: Array()
			{
				0: 000001
				1: 000002
			}
		}
	}



##### Example 04
	<form>
		<input type="text" name="txt01[][name]" value="Text 01" />
		<input type="text" name="txt01[][phone]" value="000001" />

		<input type="text" name="txt01[][name]" value="Text 02" />
		<input type="text" name="txt01[][phone]" value="000002" />

		<input type="submit" value="Submit" />
	</form>

	<script>
		( function( $){
			$( document ).ready( function(){
				$( "form" ).submit( function( e ) {
					e.preventDefault();

					var jsonObject = $( this ).serializeArrayToJson();
					console.log( jsonObject );
				} );
			} );
		} )( jQuery );
	</script>

##### Example 04: Console Output
	Object 
	{
		txt01: Array(2) 
		{
			0: Object
			{
				name: Text 01
				phone: 000001
			},
			
			1: Object
			{
				name: Text 02
				phone: 000002
			}
		}
	}



##### Example 05
	<form>
		<input type="text" name="txt01[][name]" value="Text 01" />
		<input type="text" name="txt01[][phone]" value="000001" />

		<input type="text" name="txt01[][name]" value="Text 02" />
		<input type="text" name="txt01[][phone]" value="000002" />

		<input type="submit" value="Submit" />
	</form>

	<script>
		(function( $ ){
			$( document ).ready( function(){
				$( "form" ).submit( function( e ) {
					e.preventDefault();

					var reqFormat = {
						id: 0,
						company: "ACN"
					}; 

					var jsonObject = $( this ).serializeArrayToJson( { requiredFormat: reqFormat } );
					console.log(jsonObject);
				} );
			} );
		})( jQuery );
	</script>

##### Example 05: Console Output
	Object 
	{
		id: 0,
		company: "ACN",
		txt01: Array(2) 
		{
			0: Object
			{
				name: Text 01
				phone: 000001
			},
			
			1: Object
			{
				name: Text 02
				phone: 000002
			}
		}
	}

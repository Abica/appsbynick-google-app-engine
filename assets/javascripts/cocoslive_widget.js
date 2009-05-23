/*
 * cocosLive score widget
 * (c) 2009 Sapus Media
 */
function cocosLiveRequestScores( elementid, options )
{

	$.getJSON( "http://www.cocoslive.net/widget/get-scores?gamename="+options['gameName']+"&limit="+options['limit']+"&flags="+options['flags']+"&offset="+options['offset']+"&category="+options['category']+"&jsoncallback=?", 
	function(data) {
		var newTable = $("<table/>").addClass("ccl-stats");

		if( options['title'] )
				newTable.append( $("<caption/>").html( options['title'] ) );
		var newTR = $("<tr/>");
		$.each( options['columnsNames'], function(i,item) {
				$("<th/>").html( item ).appendTo( newTR );
		} );
		newTR.appendTo( newTable );

		$.each(data.scores, function(i,item){
			var newTR = $("<tr/>");
			if( i % 2 == 1 ) {
					newTR.addClass( 'ccl-row1' );
			} else {
					newTR.addClass( 'ccl-row2' );
			}
			$.each(options['columns'], function(j, jitem) {
				if( jitem == 'cc_country' ) {
						$("<td/>").html( "<img src='http://www.cocoslive.net/static/images/flags/" + item[jitem] + ".png' title='" + item[jitem] + "'>" ).appendTo( newTR );
				} else if( jitem == 'cc_pos') {
						$("<td/>").html( i + 1 + options['offset'] ).appendTo( newTR );
				} else {
						$("<td/>").html( item[jitem] ).appendTo( newTR );
						}
				});
			newTable.append( newTR );
		} );
		$("#" + elementid).empty().append( newTable )

		var bottomTable = $("<table style='width:100%;'/>");
		var bottomTr= $("<tr/>");

		// don't clone the dictionary. this is faster (???)
		options['offset'] -= options['limit'];
		var strPrev = JSON.stringify( options )

		options['offset'] += options['limit'] * 2;
		var strNext = JSON.stringify( options )

		// restore offset var
		options['offset'] -= options['limit'];


		var newOptions = JSON.stringify( options );
		var scriptCodePrev = "cocosLiveRequestScores( \"" + elementid + "\"," + strPrev + ")";
		var scriptCodeNext = "cocosLiveRequestScores( \"" + elementid + "\"," + strNext + ")";
		var nextPrevDiv = $("<td style='font-size:80%' align='left'/>");
		var str = '';
		if( options['offset'] > 0 )
			str += "<a href='#' onClick='"+ scriptCodePrev + ";return false;'> < Prev " + options['limit'] + "</a>";
		else
			str += "< Prev " + options['limit'];
		str += '	<strong>' + (options['offset'] +1 ) + '-' + (options['offset'] + options['limit']) + '</strong>  ';
		str += "<a href='#' onClick='"+ scriptCodeNext + ";return false;'>Next " + options['limit'] + " ></a>";
		nextPrevDiv.html( str );
		bottomTr.append( nextPrevDiv );

		var origCategory = options['category'];
		var cats = $("<td style='font-size:80%;' align='right'/>");
		var str = "";
		$.each( options['categories'], function(i,item) {
			 if( options['categories'][i] == origCategory ) 
					 str += origCategory + " ";
			 else {
					 options['category'] = options['categories'][i];
					 options['offset'] = 0;
					 var strCats = JSON.stringify( options );

					 var requestScript = "cocosLiveRequestScores( \"" + elementid + "\"," + strCats + ")";
					 str +=  "<a href='#' onClick='" + requestScript + ";return false;'>" + item + "</a> ";
			 }
		} );
		cats.html( str );
		bottomTr.append( cats );

		var powered = $("<div style='font-size:70%; text-align:right; font-family:courier new, courier;'/>").html("powered by <a href='http://www.cocoslive.net'>cocosLive</a>");

		$("#" + elementid).append( bottomTable.append( bottomTr) );
		$("#" + elementid).append( powered );
	});
}

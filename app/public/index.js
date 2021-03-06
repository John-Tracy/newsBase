
$(document).ready(function () {

	function contentGenerator(data){

		for(var i = data.length - 1; i >= 0; i--){

			var panel = $('<div>').addClass('panel panel-default');

			var panelHead = $('<div>').addClass('panel-heading');

			var anchorTag = $('<a>').attr('href', data[i].link);
				anchorTag.attr('target', 'new');

			var panelTitle = $('<h3>').addClass('panel-title');
				panelTitle.html(data[i].title);

				anchorTag.append(panelTitle);

			var panelBody = $('<div>').addClass('panel-body');

			var rowDiv = $('<div>').addClass('row');
			var colDiv = $('<div>').addClass('col-md-12');

			var commentForm = $('<form>');
			var formLabel = $('<label>').html('Leave a Comment');
			var formButton = $('<button>').addClass('btn btn-default commentSubmit');
				formButton.attr('type', 'button');
				formButton.attr('data-ref', data[i]._id);
				formButton.html('Submit');
			var inputBox = $('<input>').addClass('form-control');
				inputBox.attr('id', 'input' + data[i]._id);
				commentForm.append(formLabel);
				commentForm.append(inputBox);
				commentForm.append(formButton);

			var wellDiv = $('<div>').addClass('well');
				wellDiv.attr('id', 'comment' + data[i]._id);

			for(var x = data[i].comments.length - 1; x >= 0; x--){
				var dataSig = x.toString();
				var delBut = $('<span>').addClass('glyphicon glyphicon-remove del');
					delBut.attr('data-id', data[i]._id);
					delBut.attr('data-name', data[i]._id + dataSig);
				var com = $('<p>').html(data[i].comments[x] + '   ');
					com.attr('id', data[i]._id + dataSig);
					com.append(delBut);
					wellDiv.append(com);

			} // end of for loop for comment generator

				panelHead.append(anchorTag);

			var	colOne = colDiv.append(commentForm);
			var rowOne = rowDiv.append(colOne)
				

			var	colTwo = colDiv.append(wellDiv);
			var rowTwo = rowDiv.append(colTwo);

				panelBody.append(rowOne);
				panelBody.append(rowTwo);

				panel.append(panelHead);
				panel.append(panelBody);

				$('#content').append(panel);	
		}; // for loop

	}; // end of contentGenerator function 
	var commentCount = 0;
	var currentUrl = window.location.origin;

	$.ajax({url: currentUrl + '/getData', method: 'GET'}).done(function(response){

		contentGenerator(response);

	}); // end of ajax get request

	$('#newScrape').on('click', function(){

		$.ajax({url: currentUrl + '/scrape', method: 'GET'}).done(function(response){
			if(response == "success"){
				location.reload(true); // refreshes page to display new data.
			}
		});
		return false;
	}); // on click function 
	function leaveComment() {
		commentCount++;
		var objectId = $(this).attr('data-ref');
		var theComment = $('#input' + objectId).val().trim();
		$('#input' + objectId).val('');

		$.ajax({
			url: currentUrl + '/comment',
			method: 'POST',
			data: {
				objectId: objectId,
				comment: theComment
			},
			success: function(response){

				if("success"){
					var newPtag = $('<p>');
					newPtag.attr('id', objectId + 'sess-only' + commentCount.toString());
					newPtag.html(theComment + ' ');
					var glyph = $('<span>').addClass('glyphicon glyphicon-remove del');
					glyph.attr('data-name', objectId + 'sess-only' + commentCount.toString());
					glyph.attr('data-id', objectId);
					$('#comment' + objectId).prepend(newPtag);
					newPtag.append(glyph);
				}

			}
		});
	}; // end of leaveComment function

	function deleteComment() {

		var objId = $(this).attr('data-id');
		var pFinder = $(this).attr('data-name');
		var data = $('#' + pFinder).text().trim();
		console.log(data+ "it worked");

		$.ajax({
			url: currentUrl + '/deleteComment',
			method: 'POST',
			data: {
				objectId: objId,
				comment: data
			},
			success: function(response){
				if("success"){
					$('#' + pFinder).remove();
				}
			}
		}); // end of ajax post
	


	}; // end of deleteComment function


	$(document).on('click', '.commentSubmit', leaveComment);

	$(document).on('click', '.del', deleteComment);

});


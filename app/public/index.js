
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
		var objectId = $(this).attr('data-ref');
		var theComment = $('#' + objectId).val().trim();
		$('#input' + objectId).val('');

		$.ajax({
			url: currentUrl + '/comment',
			method: 'POST',
			data: {
				objectId: objectId,
				comment: theComment
			}
			success: function(response){

				if("success"){
					$('#comment' + objectId).prepend('<p>'+ theComment +'</p>');
				}

			}
		});
	}

	$(document).on('click', '.commentSubmit', leaveComment);

});


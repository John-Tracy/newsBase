//var panelDiv = $('div').addClass('panel panel-default');
//var panelTitle = $('h3').addClass('panel-title');
//panelTitle.html(response.title);
//var panelBody = $('div').addClass('panel-body');
//panelBody += $('div').addClass('row');
//panelBody += $('div').addClass('col-md-12');


$(document).ready(function () {
	
	var currentUrl = window.location.origin;

	$.ajax({url: currentUrl + '/getData', method: 'GET'}).done(function(response){

		console.log(response);

	});



});


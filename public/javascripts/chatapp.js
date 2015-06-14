$(document).ready(function(){

	//var socket listens to 7000 port
	var socket = io.connect("http://10.0.1.123:7000");
	
	//Make the ready flag as false
	var readyFlag = false;

	//For enabling form show and hide property, stop the browsers
	//defualt propagation event
	$('#chatForm').submit(function(event){
    	event.preventDefault();
	});
		
	// When the user clicks the submit button after writing the username
	// emit the join event using the listening socket.
	$('#join').on('click',function(){
		
		var username = $('#firstname').val();
		
		if(username.trim() != ""){
			socket.emit('join', username);
			$("#cmApp").slideUp("fast");
        	$("#cmLoginForm").slideUp();
        	$("#enterUserName").slideDown();
			readyFlag = true;
		}
	});

	//on every notify event on socket, the append the message
	socket.on('notify', function(msg){
		if(readyFlag)
			$('#msgs').append('<li class="list-group-item">' +msg +'</li>');
	});

	//on every notify-user event on socket, display the userlist 
	socket.on('notify-user', function(people){
		if(readyFlag){
			$('#people').empty();
			$('#people').append("<li class='list-group-item'>" +"Connected Users List:" +"</li>");
			$.each(people, function(userid,name){
				$('#people').append("<li class='list-group-item'>" +name +"</li>");
			});
		}
	});

	//on every disconnect event the socket listens, append the message server is not available and disable 
	//the chat text box field
	socket.on('disconnect', function(){
		$('#msgs').append('<li class="list-group-item"><strong><span class="text-warning">The server is not available</span></strong></li>')
		$('#msg').attr('disabled', 'disabled');
		$('#send').attr('disabled', 'disabled');
	});

	//when the user, clicks on send button, emit the send event with message
	$('#chatForm').on('click','#send',function(){
		var msg = $('#message').val();
		if(msg.trim() != ""){
			socket.emit('send', msg);
			$('#message').val("");
		}
	});

	//when the user clicks on thumbsup button, send the thumbsup flag
	$('#chatForm').on('click','#thumbsup',function(){
		var thumbsupflg = 'thumbsup';
		socket.emit('send', thumbsupflg);
	});

	//on every chat event the socket listens, checks the msg is thumbup flag or text message,
	//accordingly it appends the message
	socket.on('chat', function(username, msg){
		if(readyFlag){
			if(msg == 'thumbsup')
			{
				$('#msgs').append("<li class='list-group-item'><strong><span class='text-success'>" +username 
					+"</span></strong> says: "+"<span class='glyphicon glyphicon-thumbs-up'></span>" +'</li>');
			}
			else
			{
				$('#msgs').append("<li class='list-group-item'><strong><span class='text-success'>" +username 
					+"</span></strong> says: "+msg +'</li>');
			}
		}
	});




	$('#viewusers').click(function(){
	});

});
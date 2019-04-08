// make connection
let socket = io.connect('http://localhost:4000');


//query dom
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

//Emmit events
btn.addEventListener('click', function(){
    //2 parameters first name of the message and 2nd what is the message
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});


message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

// listen for events
socket.on('chat', function(data){
    feedback.innerHTML="";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    data = data ? data: 'someone';
    feedback.innerHTML = '<p><em>' + data  + ' is typing a message..</em></p>';
})

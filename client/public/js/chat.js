const render = 'https://web-chat-2aw0.onrender.com:443';
const local = 'http://localhost:3000';

var socket = io(render);


socket.on('chat message', function (msg) {
    Push.create("Science Camp Informatik  Chat!", {
        body: msg.message,
        icon: '/cat.png',
        timeout: 4000,
        onClick: function () {
            window.focus();
            this.close();
        }
    });
    console.log(msg)

    var div = $('#muster').clone();
    const time = new Date(msg.timestamp);
    console.log(time);
    div.toggleClass('hidden', false);
    div.find('#messageBody').text(msg.message);
    div.find('#messageUser').text(msg.user);
    div.find('#messageTimestamp').text(`${time.getHours()}:${time.getMinutes()}`);
    $('#messages').append(div);
    window.scrollTo(0, document.body.scrollHeight);
});


function senden() {
    var message = $('#message').val();
    var user = $('#user').val();
    if(message) {
        socket.emit('chat message', {message: message, user: user});
    }
    $('#message').val('');
}

$(document).ready(function (e) {
    $('#message').emojiPicker({
        width: '200px',
        height: '200px'
    });
});

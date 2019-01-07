function attachEvents() {

    $('#refresh').click(loadMessages);
    $('#submit').click(createMessage);

    function createMessage() {
        let messageInfo = getMessageInfo();
        if(messageInfo !== "") {
            let request = {
                method: "POST",
                url: 'https://messanger-2e043.firebaseio.com/messanger.json',
                data: messageInfo,
                success: loadMessages,
                error: handleError
            };

            $.ajax(request);
        }
        $('#author').val("")
        $('#content').val("")
    }
    function getMessageInfo() {
        let info = {"author":$('#author').val(),"content":$('#content').val(), "timestamp":Date.now()};
        if(info.author !== "" && info.content !== "") {
            return JSON.stringify(info);
        }
        return "";
    }

    function loadMessages() {
        let request = {
            url: 'https://messanger-2e043.firebaseio.com/messanger.json',
            success: loadAllMessages,
            error: handleError
        };

        $.ajax(request);
    }

    function loadAllMessages(messages) {
        $('#messages').empty();
        //SORTING??????
        let sortedMessages = {};
        Object.keys(messages).sort((a,b) => messages[a]['timestamp'] - messages[b]['timestamp']).forEach(k => sortedMessages[k] = messages[k]);
        console.log(sortedMessages);
        for (let msg in sortedMessages) {
            let date = new Date(sortedMessages[msg]['timestamp'])
            let content = `${sortedMessages[msg]['author']}: ${sortedMessages[msg]['content']}  ${date.toString().substring(0, 21)}\n`;
            $('#messages').append(content)
        }
    }

    function handleError(error) {
        console.log(error);
    }
}
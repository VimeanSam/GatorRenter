function sendMessage(){
    let to = document.getElementById("person").value;
    let from = document.getElementById("curr_user").value;
    let path = window.location.toString();
    const start = path.lastIndexOf('/');
    const stop = path.length;
    let messageID = path.substring(start+1, stop).replace('%20', ' ');
    let subject = document.getElementById("msgTopic").innerHTML;
    let msgbody = document.getElementById("message-text").value;
    if(msgbody.toString().trim() === ''){
        alert('please type a message');
    }else{
        axios.post('/messaging/reply', {
            from: from,
            subject: subject,
            ID: messageID,
            body: msgbody,
            to: to
        })
        .then(response => {
            console.log('POST successful');
        }).catch(error => {      
            console.log(error);    
        });
        alert('Your message was sent successfully')
    }
}
function viewMessage(name){
    window.location.href= '/messages/'+name.id
}
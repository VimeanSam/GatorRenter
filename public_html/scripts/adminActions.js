let path = window.location.toString();
if(path.includes('dashboard')){
    document.getElementById("dashboardActions").style.display = 'block';
    document.getElementById("adminSection").style.display = 'none';
}else{
    document.getElementById("dashboardActions").style.display = 'none';
    document.getElementById("adminSection").style.display = 'block';
}

function approve(name){
    //alert('approved '+name.id);
    axios.post('/dashboard/approve', {
        ID: name.id
    })
    .then((response) => {
            
    })
    .catch(function (error) {
        console.log(error);
    });   
    window.location.href = '/'
}
async function reject(name){
    //alert('reject '+name.id)
    let rejectTopic = document.getElementById("rejectTopic").value;
    let msgbody = document.getElementById("reject-text").value;
    let postedBy = document.getElementById("postedBy").value;
    if(rejectTopic !== '' && msgbody !== ''){
        console.log('remove '+name.id)
        console.log('send message to '+postedBy)

        axios.post('/messaging/text', {
            from: 'Admin',
            subject: rejectTopic,
            body: msgbody,
            to: postedBy
        })
        .then(response => {
                
        }).catch(error => {      
            console.log(error);    
        });

        axios.post('/dashboard/reject', {
            ID: name.id
        })
        .then((response) => {
               
        })
        .catch(function (error) {
            console.log(error);
        });   
        alert('Message sent successfully');
        window.location.href = '/'
    }else{
        alert('Administrator are required to notify landlords for listing removals.')
    }
    /*
   
    */
}
function OpenModal(){
    $("#remove").modal('show');
}
function archive(name){
    //alert(name.id);
    axios.post('/listings/deletePost', {
        ID: name.id
    })
    .then((response) => {
            
    })
    .catch(function (error) {
        console.log(error);
    });
    window.location.href = '/'
}
function remove(name){
    //alert(name.id);
    let rejectTopic = document.getElementById("rejectTopic").value;
    let msgbody = document.getElementById("reject-text").value;
    let postedBy = document.getElementById("postedBy").value;

    if(rejectTopic !== '' && msgbody !== ''){
        axios.post('/messaging/text', {
            from: 'Admin',
            subject: rejectTopic,
            body: msgbody,
            to: postedBy
        })
        .then(response => {
                
        }).catch(error => {      
            console.log(error);    
        });

        axios.post('/listings/deletePost', {
            ID: name.id
        })
        .then((response) => {
                
        })
        .catch(function (error) {
            console.log(error);
        });
        alert('Message sent successfully');
        window.location.href = '/'
    }else{
        alert('Administrator are required to notify landlords for listing rejections.')
    }
}
function sendMessage(name){
    let subject = document.getElementById("topic").value;
    let msgbody = document.getElementById("message-text").value;
    let postedby = name.id;
    let from = document.getElementById("curr_user").value;
    if(msgbody.toString().trim() === '' || subject.toString().trim() === ''){
        alert('topic and message cannot be empty');
    }else{
        axios.post('/messaging/text', {
            from: from,
            subject: subject,
            body: msgbody,
            to: postedby
        })
        .then(response => {
                
        }).catch(error => {      
            console.log(error);    
        });
        alert('Your message was sent successfully');
        window.location.reload();
        }
}
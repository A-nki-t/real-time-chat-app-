const socket = io()

let userName;

let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')

// ask the name of the user 
do {
    userName = prompt(`Please enter your name:`)
} while (!userName)

//when a new use joins then send a notice to server
socket.emit('new-user-joined', userName)


// new user joined notice from serever
socket.on('user-joined', userName => {

    //create a element to append in the messge area
    let div = document.createElement('p')
    let className = 'notice'
    div.classList.add(className)

    //format of the notice
    let markup = `${userName} joined the chat.`

    div.innerHTML = markup
    messageArea.appendChild(div)
})

//this function adds all new messages to the message Area
function appendMessaage(msg, type) {

    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}



//this is to send the message when the enter key is pressed
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        //     if (e.target.value === '')
        //     alert("please enter a message before sending!")
        // else
        sendMessage(e.target.value)
    }
})


//this function sends the message to the server
function sendMessage(message) {
    let msg = {
        user: userName,
        message: message.trim()
    }

    appendMessaage(msg, 'outgoing')

    textarea.value = ''

    socket.emit('message', msg)
}


const send_button = document.querySelector('.sendButton')

send_button.addEventListener('click', () => {
    var msg = textarea.value
    if (msg === '')
        alert("please enter a message before sending!")
    else
        sendMessage(msg)
})




socket.on('message', (msg) => {
    appendMessaage(msg, 'incomeing')
    scrollToBottom()
})




function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



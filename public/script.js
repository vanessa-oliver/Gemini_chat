const messageInput = document.getElementById('user-input');
const messagesContainer = document.getElementById('messages');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click',    async () => {
    const userMessage = messageInput.value;
    messageInput.value = '';

    messagesContainer.innerHTML += `<div class="user-message">${userMessage}</div>`;

    const response = await fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();   
    const botMessage = data.response;   

    messagesContainer.innerHTML += `<div class="bot-message">${botMessage}</div>`;
});

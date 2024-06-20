var _theframe = document.getElementById("theframe");
_theframe.contentWindow.location.href = _theframe.src;
function toggleMobileMenu(){
	document.getElementById("menu").classList.toggle("active");
}

document.addEventListener('DOMContentLoaded', function () {
	const images = document.querySelectorAll('.hover-image');
	// chatsend
	// const chatform = document.getElementById('chatform');
	// chatform.addEventListener('submit', function () {
	// 	event.preventDefault();
	// 	sendMessage();
	// 	scrollChat();
	// })

	images.forEach(image => {
		image.addEventListener('mouseenter', function () {
			const aliasText = image.getAttribute('data-alias');
			const alias = document.createElement('div');
			alias.className = 'alias';
			alias.innerText = aliasText;
			document.body.appendChild(alias);

			image.addEventListener('mousemove', function (e) {
				alias.style.left = e.pageX + 'px';
				alias.style.top = e.pageY + 'px';
			});

			image.addEventListener('mouseleave', function () {
				document.body.removeChild(alias);
			}, { once: true });
		});
	});

	function scrollChat(){
		console.log('scrolling');
		var chat_area = document.getElementById('chat-area');
		chat_area.scrollTop = chat_area.scrollHeight;
	}
	function writeResponse(response) {
		// Customize your message here
		const botMessage = response;
	
		// Create li element
		const liElement = document.createElement('li');
	
		// Create span element with class "avatar bot"
		const spanElement = document.createElement('span');
		spanElement.className = 'avatar bot';
		spanElement.textContent = 'AI'; // Assuming "AI" is static
	
		// Create div element with class "message"
		const divElement = document.createElement('div');
		divElement.className = 'message';
		divElement.textContent = botMessage;
	
		// Append span and div elements to li element
		liElement.appendChild(spanElement);
		liElement.appendChild(divElement);
	
		// Store the created DOM structure in a variable
		const botMessageElement = liElement;
	
		// Now you can append botMessageElement to your existing DOM structure or manipulate it further
		document.getElementById('chat-log').appendChild(botMessageElement);
	}
	
	function writeMessage(message) {
		// Customize your message here
		const botMessage = message;
	
		// Create li element
		const liElement = document.createElement('li');
	
		// Create span element with class "avatar user"
		const spanElement = document.createElement('span');
		spanElement.className = 'avatar user';
		spanElement.textContent = 'User'; // Assuming "User" is static
	
		// Create div element with class "message"
		const divElement = document.createElement('div');
		divElement.className = 'message';
		divElement.textContent = botMessage;
	
		// Append span and div elements to li element
		liElement.appendChild(spanElement);
		liElement.appendChild(divElement);
	
		// Store the created DOM structure in a variable
		const botMessageElement = liElement;
	
		// Now you can append botMessageElement to your existing DOM structure or manipulate it further
		document.getElementById('chat-log').appendChild(botMessageElement);
	}
	
	function loading(){
		const loadingElement = document.createElement('li');
		loadingElement.id = 'loading';
	
		const imgElement = document.createElement('img');
		imgElement.className = 'loadingGif';
		imgElement.src = 'imgs/loading.gif';
		imgElement.alt = 'Loading...';
	
		loadingElement.appendChild(imgElement);
	
		const loadingLi = loadingElement;
		document.getElementById('chat-log').appendChild(loadingLi);
	}
	
	function hasLoaded(){
		document.getElementById('loading').remove();
	}
	
	function sendMessage() {
		const message = document.getElementById('chatinput').value;
		document.getElementById('chatinput').value = '';
		writeMessage(message);
		loading();
		fetch('https://tofol.pythonanywhere.com/chat', { // Replace with your actual Deta Space URL
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ message: message })
		})
		.then(response => response.json())
		.then(data => {
			hasLoaded();
			writeResponse(data.response);
		})
		.catch(error => console.error('Error:', error));
	}
});


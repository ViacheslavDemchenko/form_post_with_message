window.addEventListener('DOMContentLoaded', () => {

//Форма
let message = new Object();

let form = document.getElementsByClassName('main-form')[0],
	input = form.getElementsByTagName('input'),
	statusMessage = document.createElement('div');

	form.addEventListener('submit', (e) => {
		event.preventDefault();
		form.appendChild(statusMessage);

		// AJAX
		let request = new XMLHttpRequest();
			request.open("POST", 'server.php');
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

			let formData = new FormData(form);
				request.send(formData);

			request.onreadystatechange = () => {
			  	if (request.readyState < 4) {
			    //Добавляем класс с картинкой при ожидании отправки формы
			   		statusMessage.classList.add('form-awaiting');
				  	} else if (request.readyState === 4) {
//Убираем класс с картинкой ожидания после достижения следующего статуса соединения с сервером
				    	statusMessage.classList.remove('form-awaiting');
					    if (request.status == 200) {
					    //Добавляем класс с картинкой при успешной отправке формы
					      	statusMessage.classList.add('form-success');               
					    }
						    else {
						//Добавляем класс с картинкой при неудачной попытке отправки формы
						      	statusMessage.classList.add('form-failure');
						    }
			  		}
			};
			//Очистка инпутов
			for (let i = 0; i < input.length; i++) {
				input[i].value = '';
			}	
	});
});
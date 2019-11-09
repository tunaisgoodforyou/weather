
const weatherForm = document.querySelector('form');
const locationInput= document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    message1.textContent = 'Loading...';
    message2.textContent = '';
    fetch(`/weather?location=${locationInput.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        })
    });

});
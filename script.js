const date_timeElement = document.querySelector('.date_time');

const timeElement = date_timeElement.querySelector('.time');
const hourElement = timeElement.querySelector('.hour');
const minutesElement = timeElement.querySelector('.minutes');

const getCurrentTime = () => {
    const currentTime = new Date();

    const hour = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    hourElement.innerHTML = hour;
    minutesElement.innerHTML = minutes;
}

const btn_mark = document.querySelector('.btn_mark');

btn_mark.addEventListener('click', () => {
    getCurrentTime();
})
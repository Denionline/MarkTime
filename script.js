const date_timeElement = document.querySelector('.date_time');

const hourElement = document.querySelector('.time .hour');
const minutesElement = document.querySelector('.time .minutes');
const secondsElement = document.querySelector('.time .seconds');

const dayElement = document.querySelector('.date .day');
const monthElement = document.querySelector('.date .month');
const yearElement = document.querySelector('.date .year');

let date_time = {};

const period_NameElement = document.querySelector('.period_name');

const periods = {lunch: 'Lunch', dinner: 'Dinner'};
let period_name;

const typesMark = {entry: 'Entry', exit: 'Exit'}

const marksInStorage = JSON.parse(localStorage.getItem('MarkTime_MarkHistory_3.0')) || undefined;

setInterval(() => {
    const current_date_time = new Date();

    date_time = {
        ...date_time,
        time: {
            hour: current_date_time.getHours().toString().padStart(2, '0'),
            minutes: current_date_time.getMinutes().toString().padStart(2, '0'),
            seconds: current_date_time.getSeconds().toString().padStart(2, '0'),
        },
        date: {
            day: current_date_time.getDate().toString().padStart(2, '0'),
            month: (current_date_time.getMonth() + 1).toString().padStart(2, '0'),
            year: current_date_time.getFullYear()
        },
    }

    setCurrentTime();
    setCurrentDate();
}, 1000);

const setCurrentTime = () => {
    const { hour, minutes, seconds } = date_time.time;

    secondsElement.innerHTML = seconds;
    if(minutesElement.innerHTML !== minutes) minutesElement.innerHTML = minutes;
    if(hourElement.innerHTML !== hour) hourElement.innerHTML = hour;

    period_name = hour < 17 ? periods.lunch : periods.dinner;
    
    if(period_NameElement.innerText !== period_name){
        period_NameElement.innerHTML = period_name;
    }
}

function setCurrentDate(){
    const { day, month, year } = date_time.date;
    if(dayElement.innerHTML !== day) dayElement.innerHTML = day;
    if(monthElement.innerHTML !== month) monthElement.innerHTML = month;
    if(yearElement.innerHTML !== year) yearElement.innerHTML = year;
}

const btn_mark = document.querySelector('.btn_mark');
btn_mark.addEventListener('click', () => {
    setNewMark();
})

function setNewMark() {
    const markHistory = marksInStorage ? marksInStorage : [];

    const typeMark = verifyTypeMark(markHistory);

    const newMark = {
        ...date_time,
        period: period_name = date_time.time.hour < 17 ? periods.lunch : periods.dinner,
        typeMark: typeMark
    }

    markHistory.push(newMark);

    updateHistory(markHistory);
    localStorage.setItem('MarkTime_MarkHistory_3.0', JSON.stringify(markHistory));
}

const history_pageElement = document.querySelector('.history_page');
const btn_toHome = document.querySelector('button.home');
const btn_toHistory = document.querySelector('button.history');

btn_toHome.addEventListener('click', () => {
    history_pageElement.classList.remove('opened');
})

btn_toHistory.addEventListener('click', () => {
    history_pageElement.classList.add('opened');
})

const tableHistoryElement = history_pageElement.querySelector('table tbody');

function updateHistory (currentHistory) {
    const history = currentHistory ? currentHistory : marksInStorage;

    tableHistoryElement.innerHTML = '';

    history && history.forEach((mark) => {
        const { hour, minutes, seconds  } = mark.time;
        const { day, month, year } = mark.date;
        
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <tr>
                <td>${mark.typeMark}</tr> 
                <td>${mark.period}</tr> 
                <td>${hour}:${minutes}:${seconds}</td>
                <td>${day}/${month}/${year}</td>
            </tr>
        `
        tableHistoryElement.appendChild(newRow)
    }) 
}



const verifyTypeMark = (history) => {
    let typeMark;

    history.forEach((currentHistory) => {
        const { day, month, year } = currentHistory.date;
        if(
            date_time.date.day == day &&
            date_time.date.month == month &&
            date_time.date.year == year
        ){
            typeMark = typesMark.exit
        }else{
            typeMark = typesMark.entry
        }
    })

    return typeMark ? typeMark : typesMark.entry;
}

updateHistory();
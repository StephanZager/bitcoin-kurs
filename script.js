const API_KEY = 'MLA3EYZ5EYIW2G42';

let month = ['2022-10-31', '2022-11-30', '2022-12-31', '2023-01-31', '2023-02-28', '2023-03-31',
    '2023-04-30', '2023-05-31', '2023-06-30', '2023-07-31', '2023-08-31', '2023-09-30',
    '2023-10-31', '2023-11-30', '2023-12-31', '2024-01-31', '2024-02-29'];


let course = [];

async function init(){
    await loadCourse();
    await loadMonthlyCourse();
    await renderChart();
}


async function loadCourse() {
    let url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=' + API_KEY;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let currentCourse = Math.round(responseAsJson['Realtime Currency Exchange Rate']['5. Exchange Rate']);

    document.getElementById('course').innerHTML = `<b>${currentCourse} €</b>`;
}



async function loadMonthlyCourse(){
    let url = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=USD&apikey=' + API_KEY;
    let response = await fetch(url);
    let responseAsJson = await response.json();

    let monthlyCourse = responseAsJson['Time Series (Digital Currency Monthly)'];

    for (let i = 0; i < month.length; i++) {
        const courseEachMonth = Math.round(monthlyCourse[month[i]]['1b. open (USD)']);
        course.push(courseEachMonth);     
       
   }
}
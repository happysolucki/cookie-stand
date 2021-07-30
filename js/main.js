const businessHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

class Shop {
  constructor( city, minHrPatrons, maxHrPatrons, cookiesPerPatron ) {
    this.city = city;
    this.minHrPatrons = minHrPatrons;
    this.maxHrPatrons = maxHrPatrons;
    this.cookiesPerPatron = cookiesPerPatron;
    this.dailyCookieTotal = 0;
    this.dailyCookieCount = this.calcCookiesPerDay();
  }

  calcCustomersPerHour() {
    // round down a random number within the range of minHourlyPatrons and maxHourlyPatrons
    return Math.floor(Math.random() * (this.maxHrPatrons - this.minHrPatrons + 1) + this.minHrPatrons);
  }
  calcCookiesPerHour() {
    // take result of customersPerHour() and multiply it by average cookies per customer
    return Math.floor(this.calcCustomersPerHour() * this.cookiesPerPatron);
  }
  calcCookiesPerDay() {
    let totalCookies = 0;
    const hourlySales = [];
    // for ( const hr of businessHours ) {
    for (let i = 0; i < businessHours.length; i++) {
      // save cookiesPerHour into variable
      let randCookies = this.calcCookiesPerHour();
      // add value stored in randCookies to end of hourlySales array
      hourlySales.push(randCookies);
      // sum up all instances of randCookies into totalCookies
      totalCookies += randCookies;
    }
    // set ojbect's cookie total to totalCookies
    this.dailyCookieTotal = totalCookies;
    hourlySales.push(this.dailyCookieTotal);
    // this.dailyCookieCount = hourlySales;
    return hourlySales;
  }
  renderList() {
    // assign value of dailyCookieCount to sales
    const sales = this.dailyCookieCount;
    // capture DOM element for heading that corresponds to this object's city property
    const cityHeading = document.querySelector(`.${this.city}-heading`);
    // set what'll display on the screen for cityHeading to city property
    cityHeading.textContent = this.city;
    // capture DOM element for list that corresponds to this object's city property
    const unorderedList = document.querySelector(`.${this.city}-sales`);
    for (let i = 0; i < businessHours.length; i++) {
      // create new li element
      const listItem = document.createElement('li');
      // set what'll display on the screen to string that incorporates current business hour and it's corresponding sales
      listItem.textContent = `${businessHours[i]}: ${sales[i]} cookies`;
      // append listItem element to end of unorderedList
      unorderedList.appendChild(listItem);
    }
    // create element for total cookies sold in a day, set it's text content, then append to unorderedList
    const total = document.createElement('li');
    total.textContent = `Total: ${this.dailyCookieTotal} cookies`;
    unorderedList.appendChild(total);
  }
  renderTable() {
    // assign value of dailyCookieCount to sales
    const sales = this.dailyCookieCount;
    // add this object's daily cookie total to end of sales array
    // sales.push(this.dailyCookieTotal);
    const salesTable = document.querySelector('#sales-table');
    // capture DOM element for list that corresponds to this object's city property
    const cityRow = document.createElement('tr');
    // create th element
    const rowHeader = document.createElement('th');
    // add capitalize class to rowHeader
    rowHeader.classList.add('capitalize');
    // ensure text content shows capitized city property
    rowHeader.textContent = this.city;
    // append rowHeader to end of cityRow
    cityRow.appendChild(rowHeader);
    // for length of sales
    for ( const sale of sales ) {
      // creat td element
      const entry = document.createElement('td');
      // assign this entry's text content to current index in sales array
      entry.textContent = sale;
      // append entry to cityRow
      cityRow.appendChild(entry);
    }
    salesTable.appendChild(cityRow);
  }
}

const tableRowHeader = (arr) => {
  // capture DOM element that matches the selector parameter
  // const tableHeader = document.querySelector(selector);
  const salesTable = document.querySelector('#sales-table');
  const headerRow = document.createElement('tr');
  const rowHeader = document.createElement('th');
  headerRow.appendChild(rowHeader);
  // for item in parameter arr
  for (const item of arr) {
    // create td element
    const entry = document.createElement('td');
    // assign this entry's text content to current index in arr parameter
    entry.textContent = item;
    // append entry to timeRow
    // tableHeader.appendChild(entry);
    headerRow.appendChild(entry);
  }
  // create element that serves as title for daily cookies sold. append to tableHeader
  const entry = document.createElement('td');
  entry.textContent = 'Daily Total';
  // tableHeader.appendChild(entry);
  headerRow.appendChild(entry);
  salesTable.appendChild(headerRow);
}

const tableRowFooter = (arr) => {
  // sum each indice of multi-demensional array then add to array
  const sums = arr[0].map((x, idx) => arr.reduce((sum, curr) => sum + curr[idx], 0));
  const salesTable = document.querySelector('#sales-table');
  const footerRow = document.createElement('tr');
  const footerHeader = document.createElement('th');
  footerHeader.textContent = 'Totals';
  footerRow.appendChild(footerHeader);
  for (const idx of sums) {
    // create td element
    const entry = document.createElement('td');
    // assign this entry's text content to current index in arr parameter
    entry.textContent = idx;
    // append entry to footerRow
    footerRow.appendChild(entry);
  }
  salesTable.appendChild(footerRow);
}

let seattle = new Shop('seattle', 23, 65, 6.3);
let tokyo = new Shop('tokyo', 3, 24, 1.2);
let dubai = new Shop('dubai', 11, 38, 3.7);
let paris = new Shop('paris', 20, 38, 2.3);
let lima = new Shop('lima', 2, 16, 4.6);

const allShops = [seattle, tokyo, dubai, paris, lima];

const allCookieSales = [seattle.dailyCookieCount, tokyo.dailyCookieCount, dubai.dailyCookieCount, paris.dailyCookieCount, lima.dailyCookieCount];

const generateTable = () => {
  tableRowHeader(businessHours);
  for (shop of allShops) {
    shop.renderTable();
  }
  tableRowFooter(allCookieSales);
}

const appendUserShop = (event) => {
  event.preventDefault();
  const city = document.querySelector('#city');
  const minCph = document.querySelector('#minCph');
  const maxCph = document.querySelector('#maxCph');
  const avgCookie = document.querySelector('#avgCookie');

  let messages = [];

  if (parseInt(minCph.value) > parseInt(maxCph.value)) {
    messages.push('Minumum customers per hour cannot be greater than maximum customers per hour')
  }

  console.log(messages);

  if (messages.length > 0) {
    console.log(messages);
    // e.preventDefault();
    // e.stopPropagation();
  } else {
    let userShop = new Shop(city.value, parseInt(minCph.value), parseInt(maxCph.value), parseFloat(avgCookie.value));
    console.log(userShop);
    allShops.push(userShop);
    allCookieSales.push(userShop.dailyCookieCount);
    console.log(allShops);
    console.log(allCookieSales);
    // userShop.renderTable();
    const salesTable = document.querySelector('#sales-table');
    salesTable.innerHTML = '';
    // tableRowHeader(businessHours);
    generateTable();
    // tableRowFooter(allCookieSales);
  }
}
// const city = document.querySelector('#city');
// const minCph = document.querySelector('#minCph');
// const maxCph = document.querySelector('#maxCph');
// const avgCookie = document.querySelector('#avgCookie');
// const form = document.querySelector('#form');

const form = document.querySelector('#form');

form.addEventListener('submit', appendUserShop);

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   let messages = [];
// 
//   if (parseInt(minCph.value) > parseInt(maxCph.value)) {
//     messages.push('Minumum customers per hour cannot be greater than maximum customers per hour')
//   }
// 
//   console.log(messages);
// 
//   if (messages.length > 0) {
//     // e.preventDefault();
//     // e.stopPropagation();
//   } else {
//     let userShop = new Shop(city.value, parseInt(minCph.value), parseInt(maxCph.value), parseFloat(avgCookie.value));
//     console.log(userShop);
//     allShops.push(userShop);
//     allCookieSales.push(userShop.dailyCookieCount);
//     console.log(allShops);
//     console.log(allCookieSales);
//     // userShop.renderTable();
//     const salesTable = document.querySelector('#sales-table');
//     salesTable.innerHTML = '';
//     // tableRowHeader(businessHours);
//     generateTable();
//     // tableRowFooter(allCookieSales);
//   }
// });

generateTable();
// tableRowFooter(allCookieSales);
// const generateTable = () => {
//   tableRowHeader(businessHours, '.time-row');
//   for (shop of allShops) {
//     shop.renderTable();
//   }
//   tableRowFooter(allCookieSales);
// }
// tableRowHeader(businessHours, '.time-row');
// for (shop of allShops) {
//   shop.renderTable();
// }
// // seattle.renderTable();
// // tokyo.renderTable();
// // dubai.renderTable();
// // paris.renderTable();
// // lima.renderTable();
// tableRowFooter(allCookieSales);

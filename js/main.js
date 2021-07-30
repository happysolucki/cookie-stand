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
    // add dailyCookieTotal to end of hourlySales array
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
    // capture table in DOM
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
    // append cityRow to table in DOM
    salesTable.appendChild(cityRow);
  }
}

const tableRowHeader = (arr) => {
  // capture table in DOM
  const salesTable = document.querySelector('#sales-table');
  // create tr and th elements
  const headerRow = document.createElement('tr');
  const rowHeader = document.createElement('th');
  // append rowHeader to headerRow
  headerRow.appendChild(rowHeader);
  // for item in parameter arr
  for (const item of arr) {
    // create td element
    const entry = document.createElement('td');
    // assign this entry's text content to current index in arr parameter
    entry.textContent = item;
    // append entry to headerRow
    headerRow.appendChild(entry);
  }
  // create element that serves as title for daily cookies sold. append to headerRow
  const entry = document.createElement('td');
  entry.textContent = 'Daily Total';
  // append entry to headerRow
  headerRow.appendChild(entry);
  // append header row to table in DOM
  salesTable.appendChild(headerRow);
}

const tableRowFooter = (arr) => {
  // sum each indice of multi-demensional array then add to array
  const sums = arr[0].map((x, idx) => arr.reduce((sum, curr) => sum + curr[idx], 0));
  // capture table in DOM
  const salesTable = document.querySelector('#sales-table');
  // creat tr and th elements
  const footerRow = document.createElement('tr');
  const footerHeader = document.createElement('th');
  footerHeader.textContent = 'Totals';
  // append footerHeader to footerRow
  footerRow.appendChild(footerHeader);
  for (const idx of sums) {
    // create td element
    const entry = document.createElement('td');
    // assign this entry's text content to current index in arr parameter
    entry.textContent = idx;
    // append entry to footerRow
    footerRow.appendChild(entry);
  }
  // append footerRow to table in DOM
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
  // for every shop in allShops array
  for (shop of allShops) {
    shop.renderTable();
  }
  tableRowFooter(allCookieSales);
}

generateTable();

const appendUserShop = (event) => {
  // prevent form submit from refreshing page
  event.preventDefault();
  // capture DOM elements that correspond to inputs in form
  const city = document.querySelector('#city');
  const minCph = document.querySelector('#minCph');
  const maxCph = document.querySelector('#maxCph');
  const avgCookie = document.querySelector('#avgCookie');
  
  let messages = [];
  // if minCph is greater that maxCph, add error message to messages array
  if (parseInt(minCph.value) > parseInt(maxCph.value)) {
    messages.push('Minumum customers per hour cannot be greater than maximum customers per hour')
  }
  // if there's an error I checked for
  if (messages.length > 0) {
    console.log(messages);
  } else {
    // create new shop using data from form
    let userShop = new Shop(city.value, parseInt(minCph.value), parseInt(maxCph.value), parseFloat(avgCookie.value));
    // add new shop to allShops array
    allShops.push(userShop);
    // add dailyCookieCount of new shop to allCookieSales
    allCookieSales.push(userShop.dailyCookieCount);
    // capture table in DOM
    const salesTable = document.querySelector('#sales-table');
    // Clear elements inside of table
    salesTable.innerHTML = '';
    // generate table using updated data
    generateTable();
  }
}

// capture form from DOM
const form = document.querySelector('#form');
// when form is submitted, call appendUserShop function
form.addEventListener('submit', appendUserShop);

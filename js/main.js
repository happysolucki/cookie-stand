const businessHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

function Shop(city, minHrPatrons, maxHrPatrons, cookiesPerPatron) {
  this.city = city;
  this.minHrPatrons = minHrPatrons;
  this.maxHrPatrons = maxHrPatrons;
  this.cookiesPerPatron = cookiesPerPatron;
  this.cookieTotal = 0;
  this.customersPerHour = function() {
    // round down a random number within the range of minHourlyPatrons and maxHourlyPatrons
    return Math.floor(Math.random() * (this.maxHrPatrons - this.minHrPatrons + 1) + this.minHrPatrons);
  }
  this.cookiesPerHour = function() {
    // take result of customersPerHour() and multiply it by average cookies per customer
    return Math.floor(this.customersPerHour() * this.cookiesPerPatron);
  }
  this.cookiesPerDay = function() {
    let totalCookies = 0;
    const hourlySales = [];
    for (hr of businessHours) {
      // save cookiesPerHour into variable
      let randCookies = this.cookiesPerHour();
      // add value stored in randCookies to end of hourlySales array
      hourlySales.push(randCookies);
      // sum up all instances of randCookies into totalCookies
      totalCookies += randCookies;
    }
    // set ojbect's cookie total to totalCookies
    this.cookieTotal = totalCookies;
    return hourlySales;
  },
  this.renderList = function() {
    // store array that's returned from cookiesPerDay into sales
    const sales = this.cookiesPerDay();
    // capture DOM element for heading that corresponds to this object's city property
    const cityHeading = document.querySelector(`.${this.city}-heading`);
    // set what'll display on the screen for cityHeading to capitalized city property
    cityHeading.textContent = this.city[0].toUpperCase() + this.city.substring(1).toLowerCase();
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
    total.textContent = `Total: ${this.cookieTotal} cookies`;
    unorderedList.appendChild(total);
  },
  this.renderTable = function() {
    // store array that's returned from cookiesPerDay into sales
    const sales = this.cookiesPerDay();
    // add this object's daily cookie total to end of sales array
    sales.push(this.cookieTotal);
    console.log(sales);
    // capture DOM element for list that corresponds to this object's city property
    const cityRow = document.querySelector(`.${this.city}-row`);
    // create th element
    const rowHeader = document.createElement('th');
    // ensure text content shows capitized city property
    rowHeader.textContent = this.city[0].toUpperCase() + this.city.substring(1).toLowerCase();
    // append rowHeader to end of cityRow
    cityRow.appendChild(rowHeader);
    // for length of sales
    for (sale of sales) {
      // creat td element
      const entry = document.createElement('td');
      // assign this entry's text content to current index in sales array
      entry.textContent = sale;
      // append entry to cityRow
      cityRow.appendChild(entry);
    }
  }
}

const tableRowHeader = (arr, selector) => {
  // capture DOM element that matches the selector parameter
  const tableHeader = document.querySelector(selector);
  // for item in parameter arr
  for (item of arr) {
    // create td element
    const entry = document.createElement('td');
    // assign this entry's text content to current index in arr parameter
    entry.textContent = item;
    // append entry to timeRow
    tableHeader.appendChild(entry);
  }
  // create element that serves as title for daily cookies sold. append to tableHeader
  const entry = document.createElement('td');
  entry.textContent = 'Daily Total';
  tableHeader.appendChild(entry);
}

let seattle = new Shop('seattle', 23, 65, 6.3);
let tokyo = new Shop('tokyo', 3, 24, 1.2);
let dubai = new Shop('dubai', 11, 38, 3.7);
let paris = new Shop('paris', 20, 38, 2.3);
let lima = new Shop('lima', 2, 16, 4.6);

seattle.renderList();
tokyo.renderList();
dubai.renderList();

tableRowHeader(businessHours, '.time-row');
seattle.renderTable();
tokyo.renderTable();
dubai.renderTable();
paris.renderTable();
lima.renderTable();


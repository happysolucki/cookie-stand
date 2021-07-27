const seattleShop = {
  minHourlyPatrons: 23,
  maxHourlyPatrons: 65,
  cookiesPerPatron: 6.3,
  customersPerHour() {
    // round down a random number within the range of minHourlyPatrons and maxHourlyPatrons
    return Math.floor(Math.random() * (this.maxHourlyPatrons - this.minHourlyPatrons) + this.minHourlyPatrons);
  },
  cookiesPerHour() {
    // take result of customersPerHour() and multiply it by average cookies per customer
    return Math.floor(this.customersPerHour() * this.cookiesPerPatron);
  },
  cookiesPerDay() {
    let totalCookies = 0;
    const hourlySales = [];
    // create array of open hours
    const openHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
    for (hr of openHours) {
      // save cookiesPerHour into variable
      let randCookies = this.cookiesPerHour();
      // create string that incorporates entry from openHours and randCookies. push onto hourlySales
      hourlySales.push(`${hr}: ${randCookies} cookies`);
      // sum up all instances of randCookies into totalCookies
      totalCookies += randCookies;
    }
    // push string incorporating totalCookies onto hourlySales
    hourlySales.push(`Total: ${totalCookies} cookies`);
    return hourlySales;
  },
}


const tokyoShop = {
  minHourlyPatrons: 3,
  maxHourlyPatrons: 24,
  cookiesPerPatron: 1.2,
  customersPerHour() {
    return Math.floor(Math.random() * (this.maxHourlyPatrons - this.minHourlyPatrons) + this.minHourlyPatrons);
  },
  cookiesPerHour() {
    return Math.floor(this.customersPerHour() * this.cookiesPerPatron);
  },
  cookiesPerDay() {
    let totalCookies = 0;
    const hourlySales = [];
    const openHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
    for (hr of openHours) {
      let randCookies = this.cookiesPerHour();
      hourlySales.push(`${hr}: ${randCookies} cookies`);
      totalCookies += randCookies;
    }
    hourlySales.push(`Total: ${totalCookies} cookies`);
    return hourlySales;
  },
}


const dubaiShop = {
  minHourlyPatrons: 11,
  maxHourlyPatrons: 38,
  cookiesPerPatron: 3.7,
  customersPerHour() {
    return Math.floor(Math.random() * (this.maxHourlyPatrons - this.minHourlyPatrons) + this.minHourlyPatrons);
  },
  cookiesPerHour() {
    return Math.floor(this.customersPerHour() * this.cookiesPerPatron);
  },
  cookiesPerDay() {
    let totalCookies = 0;
    const hourlySales = [];
    const openHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
    for (hr of openHours) {
      let randCookies = this.cookiesPerHour();
      hourlySales.push(`${hr}: ${randCookies} cookies`);
      totalCookies += randCookies;
    }
    hourlySales.push(`Total: ${totalCookies} cookies`);
    return hourlySales;
  },
}


const parisShop = {
  minHourlyPatrons: 20,
  maxHourlyPatrons: 38,
  cookiesPerPatron: 2.3,
  customersPerHour() {
    return Math.floor(Math.random() * (this.maxHourlyPatrons - this.minHourlyPatrons) + this.minHourlyPatrons);
  },
  cookiesPerHour() {
    return Math.floor(this.customersPerHour() * this.cookiesPerPatron);
  },
  cookiesPerDay() {
    let totalCookies = 0;
    const hourlySales = [];
    const openHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
    for (hr of openHours) {
      let randCookies = this.cookiesPerHour();
      hourlySales.push(`${hr}: ${randCookies} cookies`);
      totalCookies += randCookies;
    }
    hourlySales.push(`Total: ${totalCookies} cookies`);
    return hourlySales;
  },
}


const limaShop = {
  minHourlyPatrons: 2,
  maxHourlyPatrons: 16,
  cookiesPerPatron: 4.6,
  customersPerHour() {
    return Math.floor(Math.random() * (this.maxHourlyPatrons - this.minHourlyPatrons) + this.minHourlyPatrons);
  },
  cookiesPerHour() {
    return Math.floor(this.customersPerHour() * this.cookiesPerPatron);
  },
  cookiesPerDay() {
    let totalCookies = 0;
    const hourlySales = [];
    const openHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
    for (hr of openHours) {
      let randCookies = this.cookiesPerHour();
      hourlySales.push(`${hr}: ${randCookies} cookies`);
      totalCookies += randCookies;
    }
    hourlySales.push(`Total: ${totalCookies} cookies`);
    return hourlySales;
  },
}

const seattleList = document.querySelector('.seattle-sales');
const seattleDailySales = seattleShop.cookiesPerDay();

for (saleListing of seattleDailySales) {
  // create li element
  let listing = document.createElement('li');
  // set text content of listing to saleListing
  listing.textContent = saleListing;
  // append listing to seattleList
  seattleList.appendChild(listing);
}

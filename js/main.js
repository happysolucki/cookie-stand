const seattleShop = {
  minHourlyPatrons: 23,
  maxHourlyPatrons: 65,
  cookiesPerPatron: 6.3,
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

console.log(seattleShop.cookiesPerDay());

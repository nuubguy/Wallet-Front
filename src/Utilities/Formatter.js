/*
    This class represent formatting function
 */

export default class Formatter {
  static currencyFormatter(balance) {
    const formatter = new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 2,
    });

    return formatter.format(balance);
  }

  static dateFormatter(date) {
    const aDate = Date.parse(date);

    let newDate = new Date(aDate).toDateString();
    newDate = newDate.split(' ').slice(1).join(' ');

    let newTime = new Date(aDate).toLocaleTimeString();
    newTime = newTime.split(':');

    const timeZone = newTime[2].split(' ');

    return `${newDate}, ${newTime[0]}:${newTime[1]} ${timeZone[1]}`;
  }
}

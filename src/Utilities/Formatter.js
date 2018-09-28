/*
    This class represent formatting function
 */

export default class Formatter {

    static currencyFormatter(balance) {
        let formatter = new Intl.NumberFormat('en-ID', {
            minimumFractionDigits: 2,
        });

        return formatter.format(balance);
    }

    static dateFormatter(date) {
        let aDate = Date.parse(date);

        let newDate = new Date(aDate).toDateString();
        newDate = newDate.split(' ').slice(1).join(' ');

        let newTime = new Date(aDate).toLocaleTimeString();
        newTime = newTime.split(":");

        let timeZone = newTime[2].split(" ");

        return newDate + ", " + newTime[0] + ":" + newTime[1] + " " + timeZone[1];
    }

}

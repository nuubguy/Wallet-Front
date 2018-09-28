/*
    This class represent formatting function
 */

export default class Formatter {

    static currencyFormatter(balance) {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2,
        });

        return formatter.format(balance);
    }

    static dateFormatter(date) {
        let aDate = Date.parse(date);

        let newDate = new Date(aDate).toDateString();
        newDate = newDate.split(' ').slice(1).join(' ');

        let newTime = new Date(aDate).toLocaleTimeString();

        return newDate + ", " + newTime;
    }

}

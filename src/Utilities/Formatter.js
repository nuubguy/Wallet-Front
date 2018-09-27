/*
    This class represent formatting function
 */

export default class Formatter {

    static currencyFormatter(balance) {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        });

        return formatter.format(balance);
    }

    static dateFormatter(date) {
        let aDate = Date.parse(date);

        return new Date(aDate).toString();
    }

}

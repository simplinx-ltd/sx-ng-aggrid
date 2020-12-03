import * as moment_ from 'moment';
const moment = moment_;

export const GridValueFormatter = {
    dateFormat: 'YYYY/MM/DD HH:mm:ss',
    date: (params) => {
        if (moment(params.value).isValid()) {
            return moment(params.value).format(GridValueFormatter.dateFormat);
        }

        /**
         * If Date is not valid return --
         */
        return ' -- ';
    },
    noTextIfNull: (params) => {
        if (!params.value || params.value === 'null' || params.value === null) {
            return '';
        } else {
            return params.value;
        }
    }
};

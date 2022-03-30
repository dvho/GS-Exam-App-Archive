export default {

    convertMonth: (input) => {

        switch (input) {
            case 1:
                return 'January';
            case 2:
                return 'February';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            case 12:
                return 'December';
            default:
                return ''
        }
    },

    totalDaysInCurrentMonth(month, year) {

        let leapStatus
        if (year % 4 === 0) {
            leapStatus = 29
        } else {
            leapStatus = 28
        }
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                leapStatus = 29
            } else {
                leapStatus = 28
            }
        }

        switch (month) {
            case 1:
                return 31
            case 2:
                return leapStatus
            case 3:
                return 31
            case 4:
                return 30
            case 5:
                return 31
            case 6:
                return 30
            case 7:
                return 31
            case 8:
                return 31
            case 9:
                return 30
            case 10:
                return 31
            case 11:
                return 30
            case 12:
                return 31
            default:
                return 0
        }
        return year
    }

}

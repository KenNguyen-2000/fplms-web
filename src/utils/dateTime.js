const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
};

const getFullBoardDays = (date) => {
    const currentDate = date || new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const days = getDaysInMonth(currentMonth, currentYear) || [];

    let back = 0;

    while (new Date(currentYear, currentMonth, back).getDay() != 0) {
        days.unshift(new Date(currentYear, currentMonth, back));
        back--;
    }

    back = 1;

    while (days.length < 42) {
        days.push(new Date(currentYear, currentMonth + 1, back));
        back++;
    }

    return days;
};

const getMonthString = (month) => {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    return monthNames[month];
};

export { getDaysInMonth, getFullBoardDays, getMonthString };

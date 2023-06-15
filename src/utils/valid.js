const isNumber = (n) => {
    return typeof n === 'number';
};

const isEmptyString = (n) => {
    return n.trim().length > 0;
};

const longerThan = (n, l) => {
    return n.trim().length > l;
};

const isBoolean = (v) => typeof v == 'boolean';

export { isNumber, isEmptyString, longerThan, isBoolean };

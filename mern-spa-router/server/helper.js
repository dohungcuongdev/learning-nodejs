
const checkIsNull = value => {
    return typeof value === 'undefined' || value == null;
}

const checkIsNotBlank = value => {
    return !checkIsNull(value) && value !== '';
}

module.exports = { checkIsNull, checkIsNotBlank }
import moment from 'moment';

const fieldsValidation = (value, type, valuesToCompare = '') => {
  if (type === 'email') {
    if (value.length >= 1) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Not an email format.';
      }
      return true;
    }
  }
  if (type === 'name') {
    if (!value || !value.name) {
      return 'Name be empty!';
    }
  }
  if (type === 'percentage') {
    if (value.length >= 1) {
      if (parseInt(value, 10) > 100) {
        return 'Percentage cannot be more than 100%';
      }
      if (!/^\d+(?:\.\d{1,2})?$/i.test(value)) {
        return 'Percentage can only accept numbers!';
      }
      return true;
    }
    return 'Percentage canot be empty!';
  }
  if (type === 'effectiveDate') {
    if (
      !/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(
        value,
      )
    ) {
      return 'Not a valid Date.';
    }
    const today = moment();
    if (moment(value).isBefore(today, 'day')) {
      return 'Date cannot be retroactive.';
    }
    if (moment(value).isAfter(valuesToCompare.values.expiryDate, 'day')) {
      return 'Effective date cannot be less than expiring date.';
    }
    return true;
  }
  if (type === 'expiryDate') {
    if (
      !/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(
        value,
      )
    ) {
      return 'not a valid Date';
    }
    const today = moment();
    if (moment(value).isSameOrBefore(today, 'day')) {
      return 'Date cannot be retroactive.';
    }
    const { effectiveDate } = valuesToCompare.values;
    if (moment(value).isSameOrBefore(effectiveDate, 'day')) {
      return 'Must be more than the effective date.';
    }
    return true;
  }
  if (type === 'onSaleDate') {
    if (
      !/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(
        value,
      )
    ) {
      return 'Not a valid Date.';
    }
    const today = moment();
    if (moment(value).isBefore(today, 'day')) {
      return 'Date cannot be retroactive.';
    }
    if (moment(value).isAfter(valuesToCompare.values.expiryDate, 'day')) {
      return 'On-Sale date cannot be more than expiring date.';
    }
    const { effectiveDate } = valuesToCompare.values;
    if (moment(value).isBefore(effectiveDate, 'day')) {
      return 'On-Sale date cannot be less than effective date.';
    }
    return true;
  }
  if (type === 'price') {
    if (value.length < 1 || value.length > 10) {
      return value.length < 1 ? 'Price cannot be empty!' : 'Price too long!';
    }
    if (!/^\d+(?:\.\d{1,2})?$/i.test(value)) {
      return 'Price can only accept numbers!';
    }
    return true;
  }
  if (type === 'distributionOption') {
    return true;
  }
  return true;
};

export default fieldsValidation;

function validationAuth(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title is Required';
  }
  if (!values.datePublished) {
    errors.datePublished = 'Date Published is Required';
  }
  if (!values.copyrightYear) {
    errors.copyrightYear = 'Copyright Year is Required';
  }
  if (!values.publisher) {
    errors.publisher = 'Publisher is Required';
  }
  if (!values.language) {
    errors.language = 'Please Select';
  }
  if (!values.country) {
    errors.country = 'Country is Required';
  }
  if (!values.description) {
    errors.description = 'Description is Required';
  }
  return errors;
}

export default validationAuth;

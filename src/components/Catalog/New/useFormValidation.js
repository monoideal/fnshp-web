import React from 'react';

function useFormValidation(initialState, validate) {
  const [values, setValues] = React.useState(initialState);
  const [errors, setError] = React.useState({});
  const [isSubmit, setSubmit] = React.useState(false);

  React.useEffect(() => {
    const noError = Object.keys(errors).length === 0;
    if (noError) {
      setSubmit(false);
    } else {
      setSubmit(true);
    }
  }, [errors]);

  const handleFormChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleDatePublishedChange = date => {
    setValues({
      ...values,
      datePublished: date,
    });
  };

  const handleBlur = () => {
    const validaitonErrors = validate(values);
    setError(validaitonErrors);
  };
  const handleFormSubmit = () => {
    const validaitonErrors = validate(values);
    setError(validaitonErrors);
    setSubmit(true);
  };
  return {
    handleFormSubmit,
    handleBlur,
    handleFormChange,
    handleDatePublishedChange,
    values,
    errors,
    isSubmit,
    setSubmit,
  };
}

export default useFormValidation;

import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

function TextMaskUrl(props) {
  const { inputRef, urlPrefix, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['h', 't', /\d/]}
      placeholderChar={'\u2000'}
      showMask
      guide={false}
    />
  );
}

TextMaskUrl.propTypes = {
  inputRef: PropTypes.func.isRequired,
  urlPrefix: PropTypes.string.isRequired,
};

function TextMaskISNI(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /[0-9]/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /[A-Za-z0-9]/,
      ]}
      showMask
      guide
    />
  );
}

TextMaskISNI.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function TextMaskPhone(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[0-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskPhone.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export { TextMaskUrl, TextMaskISNI, TextMaskPhone };

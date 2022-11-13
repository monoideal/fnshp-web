import React from 'react';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { Grid, Chip, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import selectStyle from 'components/Catalog/New/subjectChipStyle';
import PropTypes from 'prop-types';
import { subjectOptions as subjects } from 'components/models/subjectOptions';
import { isEmpty } from 'lodash';

const theme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      input: {
        padding: '18px 18px 18px 38px',
        border: '1px solid #dddddd',
        borderRadius: '5px',

        '&:hover': {
          textDecoration: 'none',
        },
      },
    },
    MuiInput: {
      root: {
        position: 'inherit',
      },
    },
    MuiFormControl: {
      root: {
        position: 'inherit',
      },
    },
    MuiIconButton: {
      root: {
        position: 'absolute',
      },
    },
  },
});

function renderInput(inputProps) {
  const { InputProps, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSubject(subjectProps) {
  const { majorSubjects, index, itemProps, highlightedIndex } = subjectProps;
  const isHighlighted = highlightedIndex === index;

  return (
    <MenuItem
      {...itemProps}
      key={majorSubjects.subject}
      selected={isHighlighted}
      component="div"
    >
      {majorSubjects.subject}
    </MenuItem>
  );
}

function getSubjects(value, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0 && !showEmpty
    ? []
    : subjects.filter(sub => {
        const keep =
          count < 5 &&
          sub.subject.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }
        return keep;
      });
}

function SelectSubject(props) {
  const classes = selectStyle();
  let counter = 0;
  const { callback, initialValues } = props;
  const [isSubBranch, setShowSubBranch] = React.useState(false);
  const [subjectText, setSubjectText] = React.useState('');
  const [selectedSubject, setSelectedSubject] = React.useState('');
  const [majorSubject, setMajorSubject] = React.useState({
    subject: '',
    subBranches: [],
  });
  const [subject, setSubject] = React.useState({
    subject: '',
    subBranches: [],
  });
  const [chipVal, setChipVal] = React.useState(
    initialValues
      ? { items: initialValues, value: '' }
      : { items: [], value: '' },
  );
  const [ischip, setShowChip] = React.useState(!!initialValues);

  const onSubjectChange = e => {
    setSubjectText(e.target.value);
  };

  const setFinalSubjectValue = (chipData, selectedData) => {
    setChipVal({
      items: [...chipVal.items, chipData],
      value: selectedData || chipData,
    });
    counter += 1;
    setShowChip(true);
    setShowSubBranch(false);
    setSubject({
      subject: '',
      subBranches: [],
    });
    setMajorSubject({
      subject: '',
      subBranches: [],
    });
    setSelectedSubject('');
    setSubjectText('');
  };

  const selectSubject = selectionSubject => {
    setSubjectText(selectionSubject);
    const findsubjects = subjects.find(m => m.subject === selectionSubject);
    if (findsubjects && !isEmpty(findsubjects.subBranches)) {
      setShowSubBranch(true);
      return;
    }
    setFinalSubjectValue(selectionSubject);
  };

  const selectSubBranch = prop => event => {
    setSubject({ ...subject, [prop]: event.target.value });
    setFinalSubjectValue(
      `${majorSubject} / ${event.target.value}`,
      event.target.value,
    );
  };

  if (counter < chipVal.items.length) {
    callback(chipVal.items);
  } else if (chipVal.items.length === 0) {
    callback('');
  }
  const handleDelete = chipToDelete => () => {
    chipVal.items.filter(chip => chip.value !== chipToDelete);
    setChipVal({
      items: chipVal.items.filter(chip => chip !== chipToDelete),
      value: '',
    });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        {ischip === true && (
          <Grid container spacing={3}>
            <Grid item>
              {chipVal.items.map((data, index) => (
                <Chip
                  className={classes.chipStyle}
                  label={data}
                  key={index}
                  onDelete={handleDelete(data)}
                />
              ))}
            </Grid>
          </Grid>
        )}
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <IconButton>
              <SearchIcon className={classes.icon} />
            </IconButton>
            <Downshift
              id="downshift-simple"
              onSelect={selection => selectSubject(selection)}
            >
              {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                highlightedIndex,
                inputValue,
                isOpen,
                selectedItem,
              }) => {
                const { onBlur, onFocus, ...inputProps } = getInputProps({
                  placeholder: 'Major subject',
                  value: subjectText,
                  onChange: onSubjectChange,
                });

                setMajorSubject(selectedItem);
                setSelectedSubject(selectedItem);
                return (
                  <div className={classes.textField}>
                    {renderInput({
                      fullWidth: true,
                      InputLabelProps: getLabelProps({ shrink: true }),
                      InputProps: { onBlur, onFocus },
                      inputProps,
                    })}
                    <div {...getMenuProps()}>
                      {isOpen ? (
                        <Paper square>
                          {getSubjects(inputValue).map((majorSubjects, index) =>
                            renderSubject({
                              majorSubjects,
                              index,
                              itemProps: getItemProps({
                                item: majorSubjects.subject,
                              }),
                              highlightedIndex,
                            }),
                          )}
                        </Paper>
                      ) : null}
                    </div>
                  </div>
                );
              }}
            </Downshift>
          </Grid>
          {isSubBranch === true && (
            <Grid item xs={6}>
              <TextField
                select
                className={classes.textField}
                id="subBranch"
                type="text"
                label="Sub Branch"
                value={subject.subBranches}
                onChange={selectSubBranch('subBranches')}
                variant="outlined"
              >
                {subjects
                  .filter(m => m.subject === selectedSubject)
                  .map(option =>
                    option.subBranches.map(val => (
                      <MenuItem key={val.key} value={val.value}>
                        {val.value}
                      </MenuItem>
                    )),
                  )}
              </TextField>
            </Grid>
          )}
        </Grid>
      </div>
    </MuiThemeProvider>
  );
}
SelectSubject.propTypes = {
  callback: PropTypes.func.isRequired,
  initialValues: PropTypes.arrayOf(PropTypes.any),
};
SelectSubject.defaultProps = {
  initialValues: undefined,
};
export default SelectSubject;

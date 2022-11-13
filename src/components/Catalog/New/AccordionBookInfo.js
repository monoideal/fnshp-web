import React, { useState, useReducer, useEffect, useCallback } from 'react';
import { createDebouncedStore } from 'util/helpers';
import { useApi } from 'api/';
import isEqual from 'lodash/isEqual';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import Button from 'components/shared/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import useFormValidation from 'components/Catalog/New/useFormValidation';
import validationAuth from 'components/Catalog/New/validationAuth';
import AccoridionBookInfoReducer from 'reducers/AccordionBookInfoReducer';
import SelectSubject from 'components/Catalog/New/SelectSubject';
import ArrayTextField from 'components/Catalog/New/ArrayTextField';
import CopyrightHolders from 'components/Catalog/New/CopyrightHolders';
import SelectContributor from 'components/Catalog/New/SelectContributors';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import moment from 'moment';
import history from 'lib/history';
import { get, isEmpty } from 'lodash';
import FullPageLoader from 'components/shared/FullPageLoader';
import { AppContext } from 'components/AppContext';
import Reviews from '../../Reviews/Reviews';
import { isValidEmail } from '../../../util/helpers';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '16px',
  },
  panel: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  panelcolor: {
    backgroundColor: '#fff2d8',
  },
  title: {
    padding: '20px 20px 0',
    margin: '0px 0px 9px -1100px',
    fontFamily: 'Rubik',
    fontsize: '17px',
    color: '#000000',
    fontweight: 'normal',
  },
  buttonContainer: {
    textAlign: 'center',
  },
  button: {
    color: theme.palette.black.main,
    marginBottom: '30px',
    borderWidth: '2px',
    '&:hover': {
      borderWidth: '2px',
    },
  },
  headerline: {
    borderBottom: `solid ${theme.palette.grey.main} 1px`,
    marginTop: theme.spacing(3),
  },
  fieldPadding: {
    paddingBottom: '10px',
    display: 'flex',
    width: '100%',
  },
  keywordsPadding: {
    paddingBottom: '10px',
    paddingTop: '10px',
    display: 'flex',
  },
  fieldPaddingRange: {
    width: '100%',
  },
  errortext: {
    color: theme.palette.red.main,
  },
  select: {
    background: theme.palette.grey.main,
    borderColor: theme.palette.grey.main,
    marginTop: theme.spacing(1),
    paddingLeft: '15px',
  },
  dropField: {
    paddingBottom: '10px',
    display: 'flex',
    // width: '61%',
  },
}));

const Languages = [
  {
    key: 0,
    value: 'English',
  },
  {
    key: 1,
    value: 'French',
  },
];
const AudienceList = [
  {
    key: 0,
    name: 'General/trade',
  },
  {
    key: 1,
    name: 'Children/juvenile',
  },
  {
    key: 2,
    name: 'Young adult',
  },
  {
    key: 3,
    name: 'Primary and secondary/elementary and highschool',
  },
  {
    key: 4,
    name: 'College/higher education',
  },
  {
    key: 5,
    name: 'Professional and scholarly',
  },
  {
    key: 6,
    name: 'ELT/ESL',
  },
  {
    key: 7,
    name: 'Adult Education',
  },
];

function UtilJson(data, finalObject, selectedChipSubject) {
  const subjectsJsonArray = [];
  for (var i in selectedChipSubject) {
    let subject = selectedChipSubject[i];
    subjectsJsonArray.push(subject);
  }
  const assets = [];
  let coverUrl = '';
  let coverTitle = '';
  if (finalObject.assetsData && finalObject.assetsData.length !== 0) {
    finalObject.assetsData.forEach(asset => {
      if (asset.data) {
        const assetJson = {};
        assetJson.url = asset.data;
        assetJson.fileName = asset.fileName;
        assetJson.isbn = asset.isbn;
        assets.push(assetJson);
      } else {
        assets.push(asset);
      }
    });
  }
  if (finalObject.coverUrlData && finalObject.coverUrlData.length !== 0) {
    coverUrl = finalObject.coverUrlData[0].data
      ? finalObject.coverUrlData[0].data
      : '';
    coverTitle = finalObject.coverUrlData[0].fileName;
  }

  return {
    title: data.title,
    subtitle: data.subtitle,
    assets,
    coverUrl,
    coverTitle,
    seriesTitle: data.seriesTitle,
    printLength: data.printLength,
    datePublished: data.datePublished,
    copyrightYear: data.copyrightYear,
    publisher: data.publisher,
    imprint: data.imprint,
    edition: data.edition,
    language: data.language,
    country: data.country,
    audience: data.audience,
    description: data.description,
    isbn: finalObject.isbnArray,
    subjects: subjectsJsonArray,
    contributors: finalObject.contributorArray,
    copyrightHolders: finalObject.copyRightHolderArray,
    awards: finalObject.awardArray,
    keywords: finalObject.keywordsChipArray,
    reviews: finalObject.reviewArray,
    relatedWorks: finalObject.relateWorkArray,
  };
}
function AccordionBookInfo(props) {
  const {
    text,
    isbn,
    assetsData,
    coverUrlData,
    updateBookData,
    editPage,
    setDuplicateData,
    skipCheck,
    expandBookInfo,
    openBookInfo,
  } = props;
  let selectedChipSubject = [];
  const api = useApi();
  const classes = useStyles();
  const { bookId } = useParams();
  const initialState = {
    title: updateBookData && updateBookData.title ? updateBookData.title : '',
    subtitle:
      updateBookData && updateBookData.subtitle ? updateBookData.subtitle : '',
    seriesTitle:
      updateBookData && updateBookData.seriesTitle
        ? updateBookData.seriesTitle
        : '',
    printLength:
      updateBookData && updateBookData.printLength
        ? updateBookData.printLength
        : null,
    datePublished:
      updateBookData && updateBookData.datePublished
        ? updateBookData.datePublished
        : '',
    copyrightYear:
      updateBookData && updateBookData.copyrightYear
        ? updateBookData.copyrightYear
        : '',
    publisher:
      updateBookData && updateBookData.publisher
        ? updateBookData.publisher
        : '',
    imprint:
      updateBookData && updateBookData.imprint ? updateBookData.imprint : '',
    edition:
      updateBookData && updateBookData.edition ? updateBookData.edition : '',
    language:
      updateBookData && updateBookData.language ? updateBookData.language : '',
    country:
      updateBookData && updateBookData.country ? updateBookData.country : '',
    audience:
      updateBookData && updateBookData.audience ? updateBookData.audience : '',
    description:
      updateBookData && updateBookData.description
        ? updateBookData.description
        : '',
    isbn: updateBookData && updateBookData.isbn ? updateBookData.isbn : '',
    subject:
      updateBookData && updateBookData.subject ? updateBookData.subject : [],
    contributors:
      updateBookData && updateBookData.contributors
        ? updateBookData.contributors
        : [],
    copyrightHolders:
      updateBookData && updateBookData.copyrightHolders
        ? updateBookData.copyrightHolders
        : [],
    awards:
      updateBookData && updateBookData.awards ? updateBookData.awards : [],
    keywords:
      updateBookData && updateBookData.keywords ? updateBookData.keywords : [],
    reviews:
      updateBookData && updateBookData.reviews
        ? updateBookData.reviews
        : [{ reviewText: '' }],
    relatedWorks:
      updateBookData && updateBookData.relatedWorks
        ? updateBookData.relatedWorks
        : [],
  };
  const [value, setValues] = React.useState(initialState);

  const { countries } = React.useContext(AppContext);

  const [keywordsChips, setKeywordsChips] = React.useState(
    updateBookData && updateBookData.keywords
      ? { items: updateBookData.keywords, value: '' }
      : { items: [], value: '' },
  );
  const [isLoading, setIsLoading] = useState(false);
  const [chip, showChip] = React.useState(
    !!(updateBookData && updateBookData.keywords),
  );

  const handleChange = panel => (event, isExpanded) => {
    openBookInfo(isExpanded ? panel : false);
  };
  const {
    handleFormSubmit,
    handleBlur,
    handleFormChange,
    handleDatePublishedChange,
    values,
    errors,
    isSubmit,
    setSubmit,
  } = useFormValidation(initialState, validationAuth);

  const [bookData, dispatch] = useReducer(
    AccoridionBookInfoReducer,
    initialState,
  );

  // on component mount, check for missing required fields and disable submit
  useEffect(() => {
    if (
      (values.title ||
        values.copyrightYear ||
        values.country ||
        values.datePublished ||
        values.language ||
        values.description ||
        values.publisher) === '' &&
      (assetsData.length === 0 && coverUrlData.length === 0)
    ) {
      setSubmit(true);
    }
  }, [values, setSubmit]);

  const persistFormData = useCallback(createDebouncedStore('book'), []);

  useEffect(() => {
    persistFormData.set(values);
  }, [values, persistFormData]);

  const [disabledInput, setdisableInput] = React.useState(false);

  function disableKeywordsInput() {
    setdisableInput(disableInput => !disableInput);
  }
  const handleChip = event => {
    if (keywordsChips.items.length <= 6) {
      setKeywordsChips({
        items: keywordsChips.items,
        value: event.target.value,
      });
    } else {
      disableKeywordsInput();
    }
  };
  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();

      if (keywordsChips.value) {
        showChip(true);
        const keywordArray = keywordsChips.value.split(',');
        if (keywordsChips.items.length + keywordArray.length <= 7) {
          setKeywordsChips({
            items: [...keywordsChips.items, ...keywordArray],
            value: '',
          });
        }
      }
    }
  };
  const handleDelete = (prop, index) => event => {
    event.preventDefault();
    keywordsChips.items.splice(index, 1);
    setdisableInput(false);
    setKeywordsChips({
      items: keywordsChips.items,
      value: '',
    });
  };
  const getMultipleSubjects = callBackdata => {
    selectedChipSubject = callBackdata;
  };
  const [contributorsFromChild, setContributorsFromChild] = useState([]);
  const getContributors = callBackdata => {
    setContributorsFromChild(callBackdata);
  };
  const [copyRightHoldersFromChild, setcopyRightHoldersFromChild] = useState(
    [],
  );
  const getCopyrightholders = callBackdata => {
    setcopyRightHoldersFromChild([...copyRightHoldersFromChild.splice(0)]);
    setcopyRightHoldersFromChild(...copyRightHoldersFromChild, callBackdata);
  };
  const [awardsFromChild, setAwardsFromChild] = useState([]);
  const getAwards = callBackdata => {
    setAwardsFromChild([...awardsFromChild.splice(0)]);
    setAwardsFromChild(...awardsFromChild, callBackdata);
  };
  const [reviewsFromChild, setReviewsFromChild] = useState([
    { reviewText: '' },
  ]);
  const getReviews = callBackdata => {
    setReviewsFromChild([...reviewsFromChild.splice(0)]);
    setReviewsFromChild(...reviewsFromChild, callBackdata);
  };
  const [relatedWorksFromChild, setRelatedWorksFromChild] = useState([]);
  const getRelateWork = callBackData => {
    setRelatedWorksFromChild([...relatedWorksFromChild.splice(0)]);
    setRelatedWorksFromChild(...relatedWorksFromChild, callBackData);
  };

  const [isDuplicate, setIsDuplicate] = useState(false);

  const clickToContinue = skip => {
    // check if atleast one asset is uploaded

    if (isEmpty(assetsData)) {
      toast.error('Please upload at least one asset');
      return;
    }

    setIsLoading(true);
    let finalAwards;
    let finalcopyrightHolders;
    let finalReviews;
    let finalRelatedWorks;
    if (awardsFromChild.length > 0 && awardsFromChild[0] !== '') {
      finalAwards = awardsFromChild.flat();
    } else {
      finalAwards = values.awards;
    }
    if (copyRightHoldersFromChild.length > 0) {
      // Will not consider an entry if any of the fields is empty
      let anyInvalidHolders = false;
      copyRightHoldersFromChild.flat().forEach(element => {
        // check every copyright holder for a valid-looking email address
        if (!isValidEmail(element.email)) {
          anyInvalidHolders = true;
        }
      });
      if (anyInvalidHolders) {
        toast.error(
          'Please enter a valid email address for all copyright holders',
        );
        setIsLoading(false);
        return;
      }
      finalcopyrightHolders = copyRightHoldersFromChild.flat();
    } else {
      finalcopyrightHolders = values.copyrightHolders;
    }
    if (
      reviewsFromChild.length > 0 &&
      !isEqual(reviewsFromChild[0], { reviewText: '' })
    ) {
      finalReviews = reviewsFromChild.flat();
    } else {
      finalReviews = values.reviews;
    }
    if (relatedWorksFromChild.length > 0 && relatedWorksFromChild[0] !== '') {
      finalRelatedWorks = relatedWorksFromChild.flat();
    } else {
      finalRelatedWorks = values.relatedWorks;
    }
    const finalContributors = contributorsFromChild.flat();
    handleFormSubmit();

    async function initialize(skipBookCheck) {
      const finalObject = {
        contributorArray: finalContributors,
        copyRightHolderArray: finalcopyrightHolders,
        awardArray: finalAwards,
        reviewArray: finalReviews,
        relateWorkArray: finalRelatedWorks,
        keywordsChipArray: keywordsChips.items,
        isbnArray: isbn,
        assetsData,
        coverUrlData,
      };
      const finalBookData = UtilJson(values, finalObject, selectedChipSubject);
      let response = [];
      try {
        if (Object.keys(finalBookData).length !== 0) {
          response = await api.createBook(finalBookData, skipBookCheck);
          dispatch({ type: 'SUBMIT_FORM', payload: finalBookData });
          toast.success('Book submitted Successfully');
          setDuplicateData({});
          setIsDuplicate(false);
          history.push('/catalog');
        }
      } catch (err) {
        console.log(err, 'error');

        // duplicate check
        if (get(err, 'response.status') === 409) {
          const res = get(err, 'response.data.error');
          const duplicateData = res ? JSON.parse(res) : {};
          setIsDuplicate(true);
          setDuplicateData(duplicateData);
          dispatch({ type: 'SUBMIT_ERROR' });
        } else if (response.length === 0) {
          setDuplicateData({});
          setIsDuplicate(false);
          dispatch({ type: 'SUBMIT_ERROR' });
          toast.error(`Book Submission has failed`);
        }
      } finally {
        setIsLoading(false);
      }
    }
    async function update(skipBookCheck) {
      const finalObject = {
        contributorArray: finalContributors,
        copyRightHolderArray: finalcopyrightHolders,
        awardArray: finalAwards,
        reviewArray: finalReviews,
        relateWorkArray: finalRelatedWorks,
        keywordsChipArray: keywordsChips.items,
        isbnArray: isbn,
        assetsData,
        coverUrlData,
      };
      const finalBookData = UtilJson(values, finalObject, selectedChipSubject);
      let response = [];
      try {
        if (Object.keys(finalBookData).length !== 0) {
          response = await api.updateBook(bookId, finalBookData, skipBookCheck);
          dispatch({ type: 'SUBMIT_FORM', payload: finalBookData });
          toast.success('Book updated Successfully');
          // disable the contract if present.
          api
            .disableBookForSale(bookId)
            .then(data => console.log('Diasbled the Contract', data))
            .catch(err => console.error('Unable to disable the contract', err));
          setDuplicateData({});
          setIsDuplicate(false);
          history.push('/catalog');
        }
      } catch (err) {
        console.log(err, 'error');
        // duplicate check
        if (get(err, 'response.status') === 409) {
          const res = get(err, 'response.data.error');
          const duplicateData = res ? JSON.parse(res) : {};
          setIsDuplicate(true);
          setDuplicateData(duplicateData);
          dispatch({ type: 'SUBMIT_ERROR' });
        } else if (response.length === 0) {
          setDuplicateData({});
          setIsDuplicate(false);
          dispatch({ type: 'SUBMIT_ERROR' });
          toast.error(`Book Submission has failed`);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (editPage) {
      update(skip);
    } else {
      initialize(skip);
    }
  };

  useEffect(() => {
    if (skipCheck) {
      clickToContinue(skipCheck);
    }
  }, [skipCheck]);

  return (
    <div className={classes.root}>
      <ExpansionPanel
        className={classes.panel}
        onChange={handleChange(true)}
        expanded={isDuplicate && !skipCheck ? false : expandBookInfo}
        disabled={isDuplicate && !skipCheck}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMore />}
          aria-controls="panelbh-content"
          id="panelbh-header"
        >
          <Typography>{text}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <Grid container>
              <Grid item xs={12}>
                <h4>* Indicates required fields</h4>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <h3>EBook Details</h3>
                      </Grid>
                      <Grid item xs={10}>
                        <Divider className={classes.headerline} />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container justify="space-between">
                  <Grid item xs={5}>
                    <TextField
                      className={classes.fieldPadding}
                      variant="outlined"
                      name="title"
                      type="text"
                      value={values.title || ''}
                      placeholder="Title *"
                      onBlur={handleBlur}
                      onChange={handleFormChange}
                    />
                    {errors.title && (
                      <div className={classes.errortext}>{errors.title}</div>
                    )}
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      className={classes.fieldPadding}
                      variant="outlined"
                      name="subtitle"
                      type="text"
                      value={values.subtitle || ''}
                      placeholder="Subtitle"
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      className={classes.fieldPadding}
                      variant="outlined"
                      name="seriesTitle"
                      type="text"
                      value={values.seriesTitle || ''}
                      placeholder="Series Title"
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      className={classes.fieldPadding}
                      variant="outlined"
                      name="printLength"
                      type="text"
                      value={values.printLength || ''}
                      placeholder="Print Length"
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <Grid container justify="space-around">
                        <KeyboardDatePicker
                          className={classes.fieldPadding}
                          disableToolbar
                          varient="static"
                          inputVariant="outlined"
                          format="YYYY-MM-DD"
                          margin="normal"
                          id="date-picker-inline"
                          label="Date Published *"
                          value={
                            values.datePublished
                              ? moment
                                  .utc(values.datePublished)
                                  .format('YYYY-MM-DD')
                              : null
                          }
                          onBlur={handleBlur}
                          onChange={handleDatePublishedChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    {errors.datePublished && (
                      <div className={classes.errortext}>
                        {errors.datePublished}
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      className={classes.fieldPadding || ''}
                      variant="outlined"
                      name="copyrightYear"
                      type="text"
                      value={values.copyrightYear || ''}
                      placeholder="Copyright Year *"
                      onBlur={handleBlur}
                      onChange={handleFormChange}
                    />
                    {errors.copyrightYear && (
                      <div className={classes.errortext}>
                        {errors.copyrightYear}
                      </div>
                    )}{' '}
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      className={classes.fieldPadding}
                      variant="outlined"
                      name="publisher"
                      type="text"
                      value={values.publisher || ''}
                      placeholder="Publisher *"
                      onBlur={handleBlur}
                      onChange={handleFormChange}
                    />
                    {errors.publisher && (
                      <div className={classes.errortext}>
                        {errors.publisher}
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      className={classes.fieldPadding}
                      variant="outlined"
                      name="imprint"
                      type="text"
                      value={values.imprint || ''}
                      placeholder="Imprint"
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      className={classes.fieldPadding}
                      variant="outlined"
                      name="edition"
                      type="text"
                      value={values.edition || ''}
                      placeholder="Edition"
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      select
                      className={classes.dropField}
                      InputLabelProps={{ required: true }}
                      name="language"
                      type="text"
                      label="Language"
                      value={values.language || ''}
                      onBlur={handleBlur}
                      onChange={handleFormChange}
                      variant="outlined"
                    >
                      {Languages.map(option => (
                        <MenuItem key={option.key} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                    {errors.language && (
                      <div className={classes.errortext}>{errors.language}</div>
                    )}
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      select
                      className={classes.dropField}
                      name="audience"
                      type="text"
                      label="Audience"
                      value={values.audience || ''}
                      onChange={handleFormChange}
                      variant="outlined"
                    >
                      {AudienceList.map(option => (
                        <MenuItem key={option.key} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      select
                      required
                      className={classes.dropField}
                      variant="outlined"
                      name="country"
                      label="Country"
                      type="text"
                      value={values.country || ''}
                      onChange={handleFormChange}
                    >
                      {countries.map(country => (
                        <MenuItem key={country.code} value={country.code}>
                          {country.name}
                        </MenuItem>
                      ))}
                    </TextField>
                    {errors.country && (
                      <div className={classes.errortext}>{errors.country}</div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="description"
                      label="Description"
                      type="text"
                      required
                      multiline
                      rows={15}
                      rowsMax={8}
                      variant="outlined"
                      className={classes.root}
                      value={values.description || ''}
                      onBlur={handleBlur}
                      onChange={handleFormChange}
                    />
                    {errors.description && (
                      <div className={classes.errortext}>
                        {errors.description}
                      </div>
                    )}
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={2}>
                        <h3>Subject</h3>
                      </Grid>
                      <Grid item xs={10}>
                        <Divider className={classes.headerline} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <SelectSubject
                      initialValues={values.subject}
                      callback={getMultipleSubjects}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={2}>
                            <h3>Contributors</h3>
                          </Grid>
                          <Grid item xs={10}>
                            <Divider className={classes.headerline} />
                          </Grid>
                          <Grid item xs={12}>
                            <SelectContributor
                              initialValues={{ values: values.contributors }}
                              callback={getContributors}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={2}>
                            <h3>Copyright Holder</h3>
                          </Grid>
                          <Grid item xs={10}>
                            <Divider className={classes.headerline} />
                          </Grid>
                          <Grid container>
                            <Grid item xs={12}>
                              <CopyrightHolders
                                initialValues={{
                                  values: value.copyrightHolders,
                                }}
                                fieldName="Copyright Holders"
                                placeholderName="Copyright Holders"
                                callback={getCopyrightholders}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={2}>
                            <h3>Awards</h3>
                          </Grid>
                          <Grid item xs={10}>
                            <Divider className={classes.headerline} />
                          </Grid>
                          <Grid item xs={12}>
                            <ArrayTextField
                              initialValues={{ values: value.awards }}
                              fieldName="Awards"
                              placeholderName="Awards"
                              callback={getAwards}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={2}>
                            <h3>Keywords</h3>
                          </Grid>
                          <Grid item xs={9}>
                            <Divider className={classes.headerline} />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              className={classes.fieldPaddingRange}
                              variant="outlined"
                              name="keyword"
                              type="text"
                              placeholder="Keywords"
                              value={keywordsChips.value}
                              disabled={!!disabledInput}
                              onKeyDown={handleKeyDown}
                              onChange={handleChip}
                            />
                            {chip === true && (
                              <Grid
                                item
                                xs={12}
                                className={classes.keywordsPadding}
                              >
                                <Grid container spacing={2}>
                                  {keywordsChips.items.map((data, index) => (
                                    <Grid item key={index}>
                                      <Chip
                                        label={data}
                                        key={index}
                                        className={classes.chip}
                                        onDelete={handleDelete(data, index)}
                                      />
                                    </Grid>
                                  ))}
                                </Grid>
                              </Grid>
                            )}
                            <FormHelperText
                              classes={{ root: classes.formHelperText }}
                            >
                              Maximum 7 keywords. you can keep adding by comma.
                            </FormHelperText>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={2}>
                            <h3>Reviews</h3>
                          </Grid>
                          <Grid item xs={10}>
                            <Divider className={classes.headerline} />
                          </Grid>
                          <Grid item xs={12}>
                            {/* <ArrayTextField
                              initialValues={{ values: value.reviews }}
                              fieldName="Reviews"
                              multiline
                              placeholderName="Review By"
                              callback={getReviews}
                            /> */}
                            <Reviews
                              initialValues={{ values: values.reviews }}
                              multiline
                              callback={getReviews}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={2}>
                            <h3>Related Work</h3>
                          </Grid>
                          <Grid item xs={10}>
                            <Divider className={classes.headerline} />
                          </Grid>
                          <Grid item xs={12}>
                            <ArrayTextField
                              initialValues={{ values: value.relatedWorks }}
                              fieldName="Related Work"
                              placeholderName="Related Work"
                              callback={getRelateWork}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} classes={{ root: classes.buttonContainer }}>
              <Button
                type="button"
                onClick={() => clickToContinue(false)}
                color="primary"
                variant="outlined"
                classes={{ root: classes.button }}
                disabled={isSubmit || isLoading}
              >
                Submit
              </Button>
              {isLoading ? <FullPageLoader /> : ''}
            </Grid>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
AccordionBookInfo.propTypes = {
  text: PropTypes.string.isRequired,
  isbn: PropTypes.number,
  assetsData: PropTypes.arrayOf(PropTypes.any).isRequired,
  coverUrlData: PropTypes.arrayOf(PropTypes.any).isRequired,
  updateBookData: PropTypes.object,
  editPage: PropTypes.bool,
  setDuplicateData: PropTypes.func.isRequired,
  skipCheck: PropTypes.bool.isRequired,
  expandBookInfo: PropTypes.bool.isRequired,
  openBookInfo: PropTypes.func,
};
AccordionBookInfo.defaultProps = {
  isbn: undefined,
  editPage: PropTypes.bool,
  updateBookData: {},
  openBookInfo: PropTypes.func,
};

export default AccordionBookInfo;

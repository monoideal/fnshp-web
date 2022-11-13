import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  Button,
  Typography,
  Grid,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  TextField,
  Divider,
  IconButton,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { ExpandMore } from '@material-ui/icons';
import { useDropzone } from 'react-dropzone';
import DropZoneIcon from '@material-ui/icons/AssignmentReturnedOutlined';
import {
  FILE_FORMAT_BOOK,
  FILE_FORMAT_COVER_MSG,
  FILE_FORMAT_COVER,
} from 'constants.js';
import AccordionBookUploadCheck from 'components/Catalog/New/AccordionBookUploadCheck';
import AccordionBookInfo from 'components/Catalog/New/AccordionBookInfo';
import UploadZoneStyle from 'components/Catalog/New/dropZoneStyle';
import FullPageLoader from 'components/shared/FullPageLoader';
import Header from 'components/Catalog/HeaderWithBreadcrumbs';
import UploadFileReducer from 'reducers/UploadFileReducer';
import { useApi } from 'api/';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { isEmpty, first, reject } from 'lodash';
import CloseOutlined from '@material-ui/icons/CloseOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    background: theme.palette.lightGrey.main,
  },
  panel: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  panelcolor: {
    backgroundColor: '#fff2d8',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
  headerField: {
    fontWeight: 'bold',
  },
  formbox: {
    padding: '20px 0 40px 15px',
  },
  tablerowbox: {
    padding: '10px 0',
    borderbottom: `solid ${theme.palette.grey.main} 1px`,
  },
  contentmargin: {
    margin: '15px 20px 17px',
    fontWeight: 'bold',
  },
  headerPadding: {
    paddingBottom: '15px',
  },
}));

const isbnJson = {};
let data = {};

export function RowBreak() {
  return (
    <Grid
      item
      sm={12}
      style={{
        padding: '0px',
      }}
    />
  );
}

function AccordionBookAndCoverUpload(props) {
  const { text, isColor, state, editPage, bookData } = props;
  const classes = useStyles();
  const classes1 = UploadZoneStyle();
  const [expanded, setExpanded] = useState(false);
  const [skipCheck, setSkipCheck] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const [duplicateData, setDuplicateData] = useState({});
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let uploadedBooks = [];

  if (bookData && editPage && bookData.assets) {
    uploadedBooks = bookData.assets;
  }
  const [bookUpload, setBookUpload] = useState([...uploadedBooks]);
  const [expandBookInfo, setExpandBookInfo] = useState(false);

  async function getBookUpload(callbackData) {
    setBookUpload(prevState => [...prevState, callbackData]);
  }

  async function removeAsset(obj) {
    setBookUpload(prevState => [...reject(prevState, obj)]);
  }
  const [bookCoverUpload, setBookCoverUpload] = useState(
    bookData && editPage && bookData.coverKey ? [bookData.coverKey] : [],
  );

  function getCoverUpload(callbackData) {
    setBookCoverUpload([callbackData]);
  }

  const [isbnValue, setIsbnValue] = useState('');
  function setIsbn(callbackIsbn) {
    setIsbnValue(callbackIsbn);
  }

  function setDisable(callbackdisable) {
    setIsDisable(callbackdisable);
  }

  // NOTE: commenting the isbn check
  /* async function clickToUpload() {
    setClick(true);
    try {
      const isbnArray = Object.keys(isbnJson).map(i => isbnJson[i]);
      const isbnArr = isbnArray.map(row => row.isbn);
      const isbn = { isbn: isbnArr };
      result = await api.checkBooks(
        qs.stringify(isbn, { arrayFormat: 'repeat' }),
      );
      console.log(result, 'result data');
    } catch (err) {
      console.log('Error', err);
    }
  } */

  function handleClose() {
    setExpanded(false);
    setExpandBookInfo(true);
  }

  function openBookInfo(input) {
    setExpandBookInfo(input);
  }

  // Scroll to Top
  useEffect(() => {
    if (!isEmpty(duplicateData)) {
      const mainEle = first(document.getElementsByTagName('main'));
      if (mainEle) mainEle.scrollTo(0, 0);
    }
  }, [duplicateData]);

  return (
    <div className={classes.root}>
      <div>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.headerPadding}>
              <Header
                title={editPage ? bookData.title : 'Add New Book'}
                breadcrumbLinks={[{ to: '/catalog', text: 'Catalogue' }]}
              />
            </div>
          </Grid>
        </Grid>
        {!isEmpty(duplicateData) ? (
          <AccordionBookUploadCheck
            text="1. Upload E-Book"
            color={classes.panelcolor}
            isbn={isbnValue.data}
            duplicateData={duplicateData}
            handleSkipCheck={val => setSkipCheck(val)}
          />
        ) : (
          <ExpansionPanel
            className={isColor ? classes.panelcolor : classes.panel}
            expanded={expanded === true}
            onChange={handleChange(true)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              aria-controls="panelbh-content"
              id="panelbh-header"
            >
              <Typography gutterBottom>
                {text}
                {isColor ? (
                  <span className={classes.contentmargin}>{state}</span>
                ) : (
                  ''
                )}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.headerField}>
                    Upload E-book
                  </Typography>
                </Grid>
                <RowBreak />
                <Typography variant="caption" className={classes1.italic}>
                  {FILE_FORMAT_COVER_MSG}
                </Typography>
                <Grid item xs={12}>
                  <UploadBox
                    fileType={FILE_FORMAT_BOOK}
                    callback={getBookUpload}
                    removeAsset={removeAsset}
                    callbackDisable={setDisable}
                    callbackIsbn={setIsbn}
                    bookUpload={bookUpload}
                    bookCoverUpload={bookCoverUpload}
                    editPage={editPage}
                  />
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography className={classes.headerField}>
                      Upload Cover
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="caption" className={classes1.italic}>
                      The file formats you can upload are png, jpgs.
                    </Typography>
                  </Grid>
                  <UploadBox
                    fileType={FILE_FORMAT_COVER}
                    callback={getCoverUpload}
                    callbackDisable={setDisable}
                    bookUpload={bookUpload}
                    bookCoverUpload={bookCoverUpload}
                  />
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
            <Grid item xs={12} classes={{ root: classes.buttonContainer }}>
              <Button
                onClick={() => handleClose()}
                color="primary"
                variant="outlined"
                classes={{ root: classes.button }}
                disabled={isDisable}
              >
                Continue
              </Button>
            </Grid>
          </ExpansionPanel>
        )}

        <AccordionBookInfo
          text="2. Book Information"
          assetsData={bookUpload}
          coverUrlData={bookCoverUpload}
          updateBookData={bookData}
          editPage={editPage}
          setDuplicateData={val => setDuplicateData(val)}
          skipCheck={skipCheck}
          expandBookInfo={expandBookInfo}
          openBookInfo={openBookInfo}
        />
      </div>
    </div>
  );
}
AccordionBookAndCoverUpload.propTypes = {
  text: PropTypes.string.isRequired,
  isColor: PropTypes.bool,
  state: PropTypes.string,
  editPage: PropTypes.bool,
  bookData: PropTypes.object,
};
AccordionBookAndCoverUpload.defaultProps = {
  isColor: null,
  state: '',
  editPage: false,
  bookData: {},
};

function UploadBox(props) {
  const {
    fileType,
    callback,
    callbackDisable,
    callbackIsbn,
    bookCoverUpload,
    bookUpload,
    removeAsset,
    editPage,
  } = props;
  const classes = UploadZoneStyle();
  const [isbnData, setIsbnData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [{ percentage }, dispatch] = useReducer(UploadFileReducer, {
    percentage: 0,
  });
  const api = useApi();
  const fileJson = {};
  useEffect(() => {
    if (bookUpload.length > 0 && bookCoverUpload.length > 0) {
      callbackDisable(false);
    } else {
      callbackDisable(true);
    }
  });
  function prepareIsbnData() {
    data = {};
    Object.keys(isbnJson).forEach(key => {
      const isbnrow = isbnJson[key];
      const json = {};
      json.format = isbnrow.format;
      json.urlKey = isbnrow.urlKey;
      data[isbnrow.isbn] = json;
    });
    setIsbnData({
      data,
    });
  }

  function handleTableChange(id, rowData, e, index) {
    const json = {};
    bookUpload.forEach(row => {
      if (row.id === id) {
        json.id = row.id;
        json.format = row.type;
        json.isbn = e.target.value;
        json.urlKey = row.title;
        isbnJson[row.id] = json;
      }
      prepareIsbnData();
    });
    callbackIsbn(isbnData);
    bookUpload[index].isbn = e.target.value;
  }

  /**
   * @function - single file get uploaded
   * @param {*} uploadedFiles - have single file array from DropZone at each selection
   * @param {*} upldmsg - upload message
   */
  async function uploadFile(uploadedFiles, upldmsg, contentType, privateFile) {
    let fileData = [];
    // uploadedFiles will always contain single fileObject as the dropzone is restricted to accept single file. So extracting the first element from the uploadedFiles array
    const uploadSingleFile = uploadedFiles[0];
    fileData = uploadSingleFile.name.split('.');
    const [fileName, type] = fileData;
    fileJson.id = Math.random;
    fileJson.fileName = fileName;
    fileJson.type = type;
    try {
      const url = await api.uploadFile(
        uploadSingleFile,
        contentType,
        privateFile,
        dispatch,
      );
      const newEntry = {
        id: url,
        fileName: fileJson.fileName,
        format: fileJson.type,
        data: url,
      };

      await callback(newEntry);
      setIsLoading(false);

      toast.success(upldmsg);
    } catch (err) {
      setIsLoading(false);
      toast.error(`Book/Cover Upload failed due to ${err}`);
    }
  }

  // NOTE: doesn't remove from the DB. Will be removed once the claim is saved.
  // For new assets -> id is the response returned after uploading to fsdrop
  // For existing asset -> id is the assetId from the backend
  const handleDelete = id => {
    if (removeAsset) {
      removeAsset({ id });
      if (editPage) {
        toast.success('Asset removed from the list. Please save your changes');
      }
    }
  };

  const onDrop = useCallback(
    acceptedFiles => {
      setIsLoading(true);
      if (fileType === FILE_FORMAT_BOOK) {
        if (acceptedFiles.length !== 0) {
          const uploadedFiles = new FormData();
          acceptedFiles.forEach(file => {
            uploadedFiles.append('book', file);
          }, uploadFile(acceptedFiles, 'Book has been uploaded', 'book', true));
        } else {
          setIsLoading(false);
          toast.error('Rejected file');
        }
      } else if (acceptedFiles.length !== 0) {
        const uploadedFiles = new FormData();
        acceptedFiles.forEach(file => {
          uploadedFiles.append('book', file);
        }, uploadFile(acceptedFiles, 'Cover has been uploaded', 'cover'));
      } else {
        setIsLoading(false);
        toast.error('Rejected file');
      }
    },
    [fileType],
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noKeyboard: true,
    noClick: true,
    multiple: false,
    accept: `${fileType}`,
  });
  const { ref, ...rootProps } = getRootProps();
  return (
    <>
      {isLoading ? (
        <FullPageLoader withPercentage percentage={percentage} />
      ) : null}
      <input {...getRootProps()} {...getInputProps()} />
      {fileType === '.pdf, .epub, .mobi' && bookUpload.length !== 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ISBN</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Type of File</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookUpload &&
              bookUpload.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <TextField
                      id="ISBN"
                      label="ISBN"
                      type="text"
                      value={row.isbn || ''}
                      onChange={e => handleTableChange(row.id, row, e, index)}
                      margin="normal"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.fileName || row.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.format}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <IconButton
                      onClick={() => handleDelete(row.id)}
                      className={classes.iconRed}
                    >
                      <CloseOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <>
          {fileType === '.png, .jpg, .jpeg' && bookCoverUpload.length !== 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Title</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookCoverUpload &&
                  bookCoverUpload.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.fileName || row}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          ) : null}
        </>
      )}
      <Grid container {...rootProps}>
        <Grid item xs={8}>
          <Button variant="outlined" className={classes.button}>
            <Typography
              variant="caption"
              className={classes.text}
              onClick={open}
            >
              Choose File
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <div className={classes.container}>
            <div className={classes.icon}>
              <DropZoneIcon fontSize="large" />
            </div>
            {isDragActive ? (
              <div className={classes.textBox}>Drop files..</div>
            ) : (
              <div>
                <Typography variant="caption" className={classes.textBox}>
                  Drop files(s) here
                </Typography>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
}
UploadBox.propTypes = {
  fileType: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  callbackDisable: PropTypes.func,
  callbackIsbn: PropTypes.func,
  removeAsset: PropTypes.func,
  bookCoverUpload: PropTypes.array,
  bookUpload: PropTypes.array,
  editPage: PropTypes.bool,
};
UploadBox.defaultProps = {
  callbackDisable: undefined,
  callbackIsbn: undefined,
  removeAsset: undefined,
  bookCoverUpload: [],
  bookUpload: [],
  editPage: false,
};

export default AccordionBookAndCoverUpload;

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { withRouter, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Header from 'components/Catalog/HeaderWithBreadcrumbs';
import Button from 'components/shared/Button';

import { useApi } from 'api/';
import { useAuth0 } from "@auth0/auth0-react";
import RetailPrice from 'components/Catalog/RoyaltyContract/RetailPrice';
import DistributionOptions from 'components/Catalog/RoyaltyContract/DistributionOptions';
import Details from 'components/Catalog/RoyaltyContract/Details';
import DetailsManual from 'components/Catalog/RoyaltyContract/DetailsManual';
import Submit from 'components/Catalog/RoyaltyContract/submit';
import FieldsValidation from 'components/Catalog/RoyaltyContract/fieldsValidation';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { AppContext } from 'components/AppContext';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  submitButtonContainer: {
    textAlign: 'center',
  },
}));

function RoyaltyContractContainer({ location }) {
  const classes = useStyles();
  const api = useApi();
  const { royaltyContractId } = useParams();
  const { isAuthenticated } = useAuth0();
  const { fanshipUser } = React.useContext(AppContext);
  const { bookId } = useParams();
  const [alert, openAlert] = useState(false);
  const [book, setBooks] = useState({});
  const [isLoadingFromBook, setIsLoadingFromBook] = useState(true);
  const [isLoadingFromContract, setIsLoadingFromContract] = useState(true);
  const [mainHolder, setMainHolder] = useState({});
  const [royaltyHolders, setRoyaltyHolders] = useState({
    0: {}
  });
  const [contractValues, setContractValues] = useState({
    values: {
      retailPrice: '',
      distributionOption: 'auto',
      effectiveDate: moment().format('YYYY-MM-DD'),
      expiryDate: 0,
      onSaleDate: moment().format('YYYY-MM-DD'),
    },
    errors: {
      retailPrice: '',
      distributionOption: '',
      effectiveDate: false,
      expiryDate: false,
      onSaleDate: false,
    },
    messages: {
      retailPrice: '',
      effectiveDate: '',
      expiryDate: '',
      onSaleDate: '',
    },
  });
  const [priceValidation, setPriceValidation] = useState(false);
  const [optionValidation, setOptionValidation] = useState(false);
  const [royaltyValidation, setRoyaltyValidation] = useState(false);

  const handleInputs = (name, value, type) => {
    const updateValues = contractValues.values;
    const updateErrors = contractValues.errors;
    const updateMessages = contractValues.messages;

    if (FieldsValidation(value, type, contractValues) === true) {
      updateErrors[name] = false;
      updateValues[name] = value;
      updateMessages[name] = '';
      if (name === 'retailPrice') {
        setPriceValidation(false);
      } else if (name === 'distributionOption') {
        setOptionValidation(false);
      } else {
        setRoyaltyValidation(false);
      }
      if (name === 'expiryDate') {
        handleInputs(
          'effectiveDate',
          contractValues.values.effectiveDate,
          'effectiveDate',
        );
        handleInputs(
          'onSaleDate',
          contractValues.values.onSaleDate,
          'onSaleDate',
        );
      }
      setContractValues({
        values: updateValues,
        errors: updateErrors,
        messages: updateMessages,
      });
    } else {
      updateErrors[name] = true;
      updateValues[name] = value;
      updateMessages[name] = FieldsValidation(value, type, contractValues);
      setContractValues({
        values: updateValues,
        errors: updateErrors,
        messages: updateMessages,
      });
    }
  };
  const handleSubmit = () => {
    let fieldsvalidationResult = 0;
    const { errors } = contractValues;
    Object.keys(errors).forEach(key => {
      if (errors[key] === true || errors[key] === '') {
        fieldsvalidationResult += 1;
      }
    });
    if (fieldsvalidationResult === 0) {
      openAlert(true);
    } else {
      const updateErrors = contractValues.errors;
      const updateMessages = contractValues.messages;

      Object.keys(updateErrors).forEach(key => {
        if (updateErrors[key] !== false) {
          if (key === 'retailPrice') {
            setPriceValidation(true);
          } else if (key === 'distributionOption') {
            setOptionValidation(true);
          } else {
            setRoyaltyValidation(true);
          }
          updateErrors[key] = true;
          updateMessages[key] = 'Required Field!';
        }
      });
    }
  };

  const getUserName = () => {
    if (fanshipUser.organization) {
      if (fanshipUser.organization.name) {
        return fanshipUser.organization.name;
      }
      return 'Unknown Name';
    }
    if (
      fanshipUser.creator.firstName &&
      fanshipUser.creator.lastName
    ) {
      return `${fanshipUser.creator.firstName} ${fanshipUser.creator.lastName}`;
    }
    if (
      fanshipUser.creator.firstName &&
      !fanshipUser.creator.lastName
    ) {
      return `${fanshipUser.creator.firstName}`;
    }
    if (
      !fanshipUser.creator.firstName &&
      fanshipUser.creator.lastName
    ) {
      return `${fanshipUser.creator.lastName}`;
    }
    return 'Unknown Name';
  };
  const updateParentHolders = data => {
    setRoyaltyHolders(data);
  };

  const handleCloseAlert = () => {
    openAlert(false);
  };

  useEffect(() => {
    async function initialBookFetch() {
      try {
        setMainHolder({
          mainHolder: {
            name: {
              name: getUserName(),
              userId: fanshipUser.id,
              isOrganization: false,
            },
            email: '',
            percentage: '100',
          },
        });
        const res = await api.fetchOneCreatorBook(bookId);
        setBooks(res.book);
        setIsLoadingFromBook(false);
      } catch (err) {
        console.log(err);
      }
    }
    initialBookFetch();
  }, [
    api,
    isAuthenticated,
    contractValues.errors,
    contractValues.messages,
    contractValues.values,
  ]);
  
  useEffect(() => {
    if (royaltyContractId) {
      async function getRoyaltyContract() {
        // fetch the specific royalty contract
        const existingContract = await api.fetchRoyaltyContract(royaltyContractId)
        setContractValues({
          values: {
            retailPrice: existingContract.retailPrice,
            distributionOption: 'auto',
            effectiveDate: moment.unix(existingContract.effectiveDate).format('YYYY-MM-DD'),
            expiryDate: moment.unix(existingContract.expiryDate).format('YYYY-MM-DD'),
            onSaleDate: moment.unix(existingContract.onSaleDate).format('YYYY-MM-DD'),
          },
          errors: {
            retailPrice: false,
            distributionOption: '',
            effectiveDate: false,
            expiryDate: false,
            onSaleDate: false,
          },
          messages: {
            retailPrice: '',
            effectiveDate: '',
            expiryDate: '',
            onSaleDate: '',
          },
        });
        
        existingContract.details.forEach((detail, index) => {
          royaltyHolders[index] = {
            email: detail.email,
            name: {
              name: detail.displayName,
              userId: detail.beneficiaryId,
              status: detail.status,
              isOrganization: false,
              limitedAccess: false,
              type: 'update',
              createdAt: moment().format('YYYY-MM-DD')
            },
            percentage: detail.royaltyPercentage / 100
          }
        });
        setIsLoadingFromContract(false);
      }
      getRoyaltyContract();
    } else {
      setIsLoadingFromContract(false);
    }
  }, []);
  
  if (isLoadingFromBook || isLoadingFromContract) return 'Loading...';

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header
            title="Create Royalty Contract"
            breadcrumbLinks={[
              { to: `/catalog/view/${book.id}`, text: book.title },
            ]}
          />
          <Submit
            open={alert}
            close={handleCloseAlert}
            contractValues={contractValues.values}
            option={contractValues.values.distributionOption}
            royaltyHolders={royaltyHolders}
            mainHolder={mainHolder}
            bookID={book.id}
            update={get(location, 'state.type') === 'update'}
          />
        </Grid>
        <Grid item xs={12}>
          <RetailPrice
            handleInputs={handleInputs}
            contractValues={contractValues}
            priceValidation={priceValidation}
          />
          <DistributionOptions
            handleInputs={handleInputs}
            optionValidation={optionValidation}
          />
          {contractValues.values.distributionOption === 'auto' ? (
            <Details
              handleInputs={handleInputs}
              contractValues={contractValues}
              updateParentHolders={updateParentHolders}
              royaltyValidation={royaltyValidation}
              bookId={bookId}
              royaltyHolders={royaltyHolders}
              setRoyaltyHolders={setRoyaltyHolders}
            />
          ) : (
            <DetailsManual
              handleInputs={handleInputs}
              contractValues={contractValues}
              mainHolder={mainHolder}
              royaltyValidation={royaltyValidation}
              bookId={bookId}
            />
          )}
        </Grid>
        <Grid item xs={12} classes={{ root: classes.submitButtonContainer }}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

RoyaltyContractContainer.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default withRouter(RoyaltyContractContainer);

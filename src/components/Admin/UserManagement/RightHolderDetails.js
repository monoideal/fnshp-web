import React, { useEffect, useState } from 'react';
import { useApi } from 'api/';
import { useParams } from 'react-router-dom';
import { Grid, Divider, Box, Typography } from '@material-ui/core';
import _ from 'lodash';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import history from 'lib/history';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PaperHeader from 'components/Account/PaperHeader';

const useStyles = makeStyles(() => ({
  backIcon: {
    marginLeft: '15px',
    marginTop: '24px',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  mainContainer: {
    fontFamily: 'Rubik',
    backgroundColor: '#ffffff',
  },
  sectionContainer: {
    fontFamily: 'Rubik',
    paddingLeft: '24px',
    paddingBottom: '31px',
    paddingTop: '24px',
  },
  sectionTitle: {
    fontFamily: 'Rubik',
    fontSize: '18px',
    fontWeight: 600,
    color: '#000000',
    marginBottom: '10px',
  },
  heading: {
    fontFamily: 'Rubik',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#000000',
    lineHeight: 1.5,
    marginBottom: '10px',
  },
  data: {
    fontFamily: 'Rubik',
    fontSize: '16px',
    color: '#000000',
    lineHeight: 1.5,
    marginBottom: '10px',
  },
  tableHeading: {
    fontSize: '14px',
    color: '#666666',
    fontWeight: 600,
  },
  tableData: {
    fontSize: '14px',
    color: '#202f35',
  },
  hyperLink: {
    fontSize: '14px',
    color: '#003a99',
  },
  subHeading: {
    fontSize: '16px',
    fontWeight: 'normal',
    fontStyle: 'italic',
    letterSpacing: '0.09em',
    margin: '10px 15px',
  },
}));

function buildIndividualData(userData) {
  const { creator } = userData;
  const personalInfo = {
    sectionTitle: 'Personal Information',
    sectionData: [
      {
        'First name': creator.firstName || '-',
        'Middle name': creator.middleName || '-',
        'Last name': creator.lastName || '-',
        'Date of Birth':
          creator.dateOfBirth && creator.dateOfBirth !== 0
            ? moment
                .unix(creator.dateOfBirth)
                .utc()
                .format('YYYY-MM-DD')
            : '-',
        'Date of Death':
          creator.dateOfDeath && creator.dateOfDeath !== 0
            ? moment
                .unix(creator.dateOfDeath)
                .utc()
                .format('YYYY-MM-DD')
            : '-',
        Email: creator.email || '-',
        'Payment Email': creator.paymentEmail || '-',
        'Phone Number': creator.phoneNumber || '-',
        ISNI: creator.isni || '-',
      },
    ],
  };
  const addressInfo = {
    sectionTitle: 'Address Information',
    sectionSubtitlePrefix: 'Address',
    sectionData:
      creator.addresses.map(address => {
        return {
          'Type of Address': address.type ? _.startCase(address.type) : '-',
          Address: address.street || address.address1 + address.address2 || '-',
          City: address.city || '-',
          'Province/State': address.region || address.state || '-',
          Country: address.country || '-',
          'Postal/Zip Code': address.postal_code || address.postalCode || '-',
        };
      }) || [],
  };

  return [personalInfo, addressInfo];
}

function buildOrgData(userData) {
  const { organization } = userData;
  const { subsidiaryCompany, contactPerson, address } = organization;
  const orgInfoTab = {
    sectionTitle: 'Organization Information',
    sectionData: [
      {
        'Organization Legal Name': organization.name,
        'Website URL': organization.url,
        'Phone Number': organization.phoneNumber,
        'Parent Company': organization.parentCompany,
        'Subsidiary Company': subsidiaryCompany.map(subsidiary => {
          return {
            name: subsidiary.name,
          };
        }),
      },
    ],
  };

  const addressInfoTab = {
    sectionTitle: 'Address Information',
    sectionSubtitlePrefix: 'Address',
    sectionData:
      address.map(addressData => {
        return {
          Address: addressData.address1 + addressData.address2,
          City: addressData.city,
          'Province/State': addressData.state,
          Country: addressData.country,
          'Postal/Zip Code': addressData.postalCode,
        };
      }) || [],
  };

  const contactInfoTab = {
    sectionTitle: 'Contact Person Information',
    sectionSubtitlePrefix: 'Contact',
    sectionData: contactPerson.map(contact => {
      return {
        'First Name': contact.firstName,
        'Last Name': contact.lastName,
        Email: contact.email,
        'Phone Number': contact.phoneNumber,
        'Job Title': contact.jobTitle,
        'Is Primary Contact': contact.isPrimary
          ? 'Yes. The person is authorized to act on behalf of the organization.'
          : 'No.',
      };
    }),
  };

  // const kycDocsInfoTab = {
  //   sectionTitle: 'Verification of organization status',
  //   sectionData: [
  //     { thead: ['Name', 'Type', 'Documents'] },
  //     {
  //       trow: kycDoc.map(doc => [
  //         doc.name,
  //         _.split(doc.filename, '.'),
  //         { value: doc.filename, link: doc.url },
  //       ]),
  //     },
  //   ],
  // };

  // const kycDocsInfoTab = {
  //   sectionTitle: 'Submitted KYC Document Details',
  //   sectionData: kycDoc.map(document => {
  //     return {
  //       'Document Name': document.name,
  //       'File Name': document.filename,
  //     };
  //   }),
  // };

  return [orgInfoTab, addressInfoTab, contactInfoTab];
}

function buildUserDetailsJSON(userData) {
  let data = [];
  if (userData) {
    if (userData.isOrganization) {
      data = buildOrgData(userData);
    } else {
      data = buildIndividualData(userData);
    }
  }
  return data;
}

const handleBack = () => {
  history.push('/admin/rightholders');
};
export default function RightHolderDetails() {
  const classes = useStyles();
  const api = useApi();
  const { id } = useParams();
  const [rightHolder, setRightHolder] = useState([]);
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const rightHolderDetails = await api.fetchRightHolder(id);
      setUserData(rightHolderDetails);
      setRightHolder(buildUserDetailsJSON(rightHolderDetails));
    };
    fetchData();
  }, [(api, id)]);
  return (
    <Box className={classes.mainContainer}>
      <Box flex="row" className={classes.backIcon} onClick={() => handleBack()}>
        <ChevronLeftIcon />
        <Typography>Back</Typography>
      </Box>

      {rightHolder.map((section, index) => (
        <Grid
          key={`section-${index}`}
          container
          direction="row"
          className={classes.sectionContainer}
        >
          <Grid item xs={4} className={classes.sectionTitle}>
            {section.sectionTitle}
          </Grid>
          <Grid item xs={8} className={classes.sectionTitle}>
            <Divider />
          </Grid>

          {section.sectionData.map((object, outerIndex) => [
            section.sectionData.length > 1 && outerIndex !== 0 ? (
              <PaperHeader
                label={`${section.sectionSubtitlePrefix ||
                  section.sectionTitle} #${outerIndex + 1}`}
                styleOverrides={{ label: classes.subHeading }}
              />
            ) : null,
            Object.entries(object).map((entry, innerIndex) => [
              <Grid item xs={6} key={`${outerIndex}-${innerIndex}`}>
                <Grid container>
                  <Grid item xs={4} className={classes.heading}>
                    {!_.isEmpty(entry[0]) ? `${entry[0]} :` : '-'}
                  </Grid>
                  <Grid item xs={8} className={classes.data}>
                    {!_.isEmpty(entry[1]) && !Array.isArray(entry[1])
                      ? entry[1]
                      : !_.isEmpty(entry[1]) && Array.isArray(entry[1])
                      ? entry[1].map(data =>
                          Object.entries(data).map(dataStub => (
                            <> {dataStub[1] + ';'} </>
                          )),
                        )
                      : '-'}
                  </Grid>
                </Grid>
              </Grid>,
            ]),
          ])}
        </Grid>
      ))}
      {userData && userData.kycDoc ? (
        <Grid container className={classes.sectionContainer}>
          <Grid item xs={2} className={classes.sectionTitle}>
            KYC Documents
          </Grid>
          <Grid item xs={10} className={classes.sectionTitle}>
            <Divider />
          </Grid>
          <Grid item xs={8}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeading} align="center">
                      Document Name
                    </TableCell>
                    <TableCell className={classes.tableHeading} align="center">
                      Name of the File
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableData}>
                  {userData.kycDoc.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center" className={classes.hyperLink}>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={row.url}
                          className={classes.link}
                        >
                          {_.startCase(row.filename)}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : (
        ''
      )}
    </Box>
  );
}

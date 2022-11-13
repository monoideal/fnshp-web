import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import history from 'lib/history';
import { isEmpty, set } from 'lodash';
import {
  Container,
  Grid,
  TextField,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { useApi } from 'api/';
import { fullname } from 'util/helpers';
import BreadcrumbLink from 'components/shared/BreadcrumbLink';
import { toast } from 'react-toastify';

const prefillHeadline1 = 'Earn rewards for recommending your favourite books';
const prefillText1 = name => `<p>Dear Readers,</p>
<p>There’s nothing better than a really spot-on book recommendation
 – when somebody excitedly presses a book into your hand and insists that you read it.
 I’m constantly recommending books to my friends and I love it when somebody tells me
 I just “have” to read something. Mostly, I listen. Don’t you?</p>

<p>If, like me, you’ve found connection through books and reading during this strange
and sometimes solitary year, I’d love to tell you about a new platform where personal
recommendations from awesome readers like you help to connect people with great books.</p>

<p>Fanship is a brand-new ebook retail platform that I and a growing number of authors and
readers are excited to be part of. Fanship helps readers like you to help authors like
me when you recommend books you love. In a digital, socially distanced arena, it captures
the essence of a friend pressing a book into your hands with a grin.</p>

<p>Bonus: you can earn reward points for every recommendation and every book you buy.</p>

<p>I’d be so thrilled if you would join me in using Fanship. If, while you’re there, you
could take a moment to recommend my books to people you think would enjoy them, that would
really mean a lot: new readers are the best gift you can give an author, and your support
helps writers to continue to create the books you love to read and recommend.</p>

<p>Here’s what you do:</p>

<ol>
  <li>Create a Fan profile on Fanship, then click on the “Recommend” button under a book to send a thoughtful, personal recommendation to family, friends, or co-workers;</li>
  <li>Earn reward points for buying and recommending books. Redeem the rewards for free books or donate to literary charities;</li>
  <li>Watch how that personal touch with your recommendations makes a big difference to whether a book finds new readers. Graphs for each of your recommendations show you when people click on a link you sent them or buy a book;</li>
  <li>Post on your social media about how you’re using Fanship to earn rewards for talking about the books you love.</li>
</ol>

<p>With deepest gratitude,</p>

<p>${name}</p>
`;

const prefillHeadline2 = 'Support writers: tell a friend about a book you love';
const prefillText2 = name => `<p>Dear Readers,</p>
<p>This year, everything about how writers and publishers promote their work and meet
their readers has been turned on its head. So it’s been heartening to see that throughout
the disruption, books themselves have prevailed as a crucial means of solace, entertainment,
and connection. Books have been important to me as a reader these past months, and, as an
author, knowing that the words I write can provide companionship to others never
ceases to amaze me.</p>

<p>Until we can meet again at book signings and events, our shared reading experiences
connect us. That’s why I’m writing to you today.</p>

<p>I’m so thrilled to be a part of a new endeavor that helps people connect through
reading while also supporting creators. Fanship is a new ebook retail platform where
personal recommendations help readers like you discover books you might not hear about
elsewhere, and where authors like me can find new readers and earn more for their work.</p>

<p>Because reading is important to you, please consider creating an account and joining
me and a growing list of writers and readers in using Fanship. When you use Fanship to
recommend books, you help writers to keep creating. If you’re able to, you can also “Applaud”
authors at checkout with a small, one-time contribution, 100% of which is paid to the author.</p>

<p>Your support is a huge boost to writers’ hearts, and your applause is a huge practical boost
that is appreciated more than ever when so much income from in-person events has been lost.</p>

<p>Please join me in using Fanship. Here’s what you do:</p>

<ol>
  <li>Create a Fan profile on Fanship, then click on the “Recommend” button under any book (including mine, below) to send a link to family, friends and coworkers you think will enjoy the book as much as you;</li>
  <li>Applaud the author when you buy a book on Fanship and encourage your friends and family to do the same. This is a one-time contribution at checkout, and it goes direct to the author. Any amount you’re able to give really means a lot;</li>
  <li>See how your support is helping books to find new readers: A graph for each book you recommend shows you when people click on a link you sent them or buy a book because of your personal thumbs up;</li>
  <li>Post on social media about how you’re using Fanship to support writers and books.</li>
</ol>

<p>With deepest gratitude,</p>

<p>${name}</p>
`;

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  form: {
    width: '100%',
    '& .MuiTextField-root': {
      width: '100%',
      marginBottom: 20,
    },
    '& input': {
      width: '100%',
    },
  },
  biography: {
    flexBasis: '100% !important',
  },
  editor: {
    height: 400,
    marginBottom: 10,
    padding: '5px 15px',
    backgroundColor: 'white',
    borderRadius: 2,
    border: '1px solid #F1F1F1',
  },
  options: {
    textAlign: 'center',
    '& button': {
      display: 'block',
      fontWeight: 'bold',
    },
  },
  live: {
    '& .MuiFormControlLabel-root': {
      alignItems: 'end',
    },
    '& .MuiCheckbox-root': {
      paddingTop: 0,
    },
  },
  submitButton: {
    fontWeight: 'bold',
  },
}));

const reducer = (profileState, action) => {
  switch (action.type) {
    case 'form_edit': {
      const { path, value } = action.payload;
      const toUpdate = { ...profileState };
      set(toUpdate, ...path, value);
      return toUpdate;
    }
    case 'form_save': {
      return action.payload;
    }
    case 'fetch_profile': {
      return action.payload;
    }
    default:
      throw new Error('invalid action for dispatch');
  }
};

const hasAnError = errors => Object.keys(errors).some(k => errors[k]);

export default function ProfileEditPage({ match }) {
  const classes = useStyles();
  const api = useApi();
  const {
    params: { id },
  } = match;
  const [profile, dispatch] = React.useReducer(reducer, {});
  const liveLink = `${window.location.origin}/recommendation/${profile.id}`;

  const [errors, setErrors] = useState({
    exclusiveHeadline: false,
    exclusiveBio: false,
  });

  const name = fullname(
    profile.firstName,
    profile.middleName,
    profile.lastName,
  );
  // Set up the draft.js
  const [editorState, setEditorState] = useState();
  const editor = React.useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const currentProfile = await api.fetchCreatorProfile(id);
        dispatch({
          type: 'fetch_profile',
          payload: currentProfile,
        });
        setEditorState(
          EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(currentProfile.exclusiveBio || ''),
            ),
          ),
        );
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      await api.updateProfile({
        ...profile,
        // Grab the HTML from the editor, since draft.js doesn't natively do this
        exclusiveBio: editor.current.editor.editor.innerHTML,
      });
      toast.success('Successfully updated profile');
      history.push('/profiles');
    } catch (err) {
      console.log(err);
      toast.error('Failed to update profile');
    }
  };

  const handleCheckboxChange = evt => {
    dispatch({
      type: 'form_edit',
      payload: { path: ['isPublished'], value: evt.target.checked },
    });
  };
  const handleChange = key => evt => {
    const { value } = evt.target;
    dispatch({
      type: 'form_edit',
      payload: { path: [key], value },
    });
    setErrors({ ...errors, [key]: !value });
  };

  const handlePrefill = (headline, text) => {
    dispatch({
      type: 'form_edit',
      payload: { path: ['exclusiveHeadline'], value: headline },
    });
    setEditorState(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(convertFromHTML(text)),
      ),
    );
  };

  const onEditorStateChange = value => {
    setEditorState(value);
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <BreadcrumbLink text="My Profiles" to="/profiles" />
      <h1>Activate Your Fan Base</h1>
      {isEmpty(profile) && !isEmpty(id) ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <h3>1. Start by choosing your message</h3>
          <p>
            What kind of appeal is likely to resonate with your readers? Select
            a template from the options below.
          </p>
          <Grid container spacing={3} className={classes.options}>
            <Grid item>
              <Button
                onClick={() =>
                  handlePrefill(prefillHeadline1, prefillText1(name || ''))
                }
              >
                <img
                  height={120}
                  src="/img/payment_history.png"
                  alt="Earn Rewards"
                />
                <br />
                Earn Rewards
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() =>
                  handlePrefill(prefillHeadline2, prefillText2(name || ''))
                }
              >
                <img
                  height={120}
                  src="/img/rewardsSuccess.png"
                  alt="Earn Rewards"
                />
                <br />
                Support Writers
              </Button>
            </Grid>
          </Grid>
          <h3>2. Customize your invitation</h3>
          <p>
            You know what your readers respond to. You can customize our
            template invitations, or write one of your own. You can return to
            this page to edit your copy at any time.
          </p>
          <Grid item xs={12} className={classes.form} style={{ marginTop: 40 }}>
            <TextField
              label="Headline"
              value={profile.exclusiveHeadline}
              helperText="Required"
              variant="outlined"
              onChange={handleChange('exclusiveHeadline')}
              InputLabelProps={{
                shrink: true,
              }}
              error={errors.exclusiveHeadline}
            />
          </Grid>
          <Grid item xs={12} className={classes.form}>
            <Editor
              ref={editor}
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              editorClassName={classes.editor}
              toolbar={{
                options: ['inline', 'list'],
                inline: { options: ['bold'] },
                list: { options: ['unordered', 'ordered'] },
              }}
            />
          </Grid>
        </React.Fragment>
      )}
      <Grid item xs={12} className={classes.live}>
        <FormControlLabel
          control={
            <Checkbox
              checked={profile.isPublished || false}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label={
            <span>
              <strong>Make my page live.</strong> Your invitation to readers to
              join you on Fanship is a live webpage, but will not be searchable.
              You can choose who to share the link with and when.
            </span>
          }
        />
        <p>
          <h3>
            3. Copy this link to your personal invitation page and share it via
            social media or email:
          </h3>
          <strong>{liveLink}</strong>
        </p>
      </Grid>
      <Grid item xs={12} className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          disabled={hasAnError(errors)}
          className={classes.submitButton}
        >
          CREATE INVITATION & RETURN TO MY PROFILE
        </Button>
      </Grid>
    </Container>
  );
}

ProfileEditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};

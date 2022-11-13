import React, { useEffect } from 'react';
import treeGraphUtil from 'util/TreeGraphUtil';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function TreeDraw(props) {
  const { shape } = props;

  useEffect(() => {
    if (Object.keys(shape).length > 0) {
      treeGraphUtil(shape);
    }
  }, []);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <div className="treeDraw" id="treeDraw" />
        </Grid>
      </Grid>
    </>
  );
}

TreeDraw.propTypes = {
  shape: PropTypes.objectOf(PropTypes.any).isRequired,
};

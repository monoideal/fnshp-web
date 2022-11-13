import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

/**
 * takes an array of items and uses @material-ui's Grid to vertically align them
 * this is particularly useful when trying to align text next to an icon
 */
export default function AlignedItems({ items, spacing, mobileJustify }) {
  return (
    <Grid
      container
      spacing={spacing}
      direction="row"
      alignItems="center"
      justify={mobileJustify}
    >
      {items.map(item => {
        const key = item.key || JSON.stringify(item);
        return (
          <Grid item key={key}>
            {item}
          </Grid>
        );
      })}
    </Grid>
  );
}

AlignedItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  ).isRequired,
  spacing: PropTypes.number,
  mobileJustify: PropTypes.string,
};

AlignedItems.defaultProps = {
  spacing: 0,
  mobileJustify: 'flex-start',
};

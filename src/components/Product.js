import React from 'react';
import PropTypes from 'prop-types';
import { kebabCase } from 'lodash';

function generateUrl({ title }) {
  return `https://prescientinnovationsfan2fan.myshopify.com/products/${kebabCase(
    title,
  )}`;
}

function Product({ product }) {
  const { title, description, images } = product;
  const { src: imageSrc } = images[0];
  return (
    <a href={generateUrl(product)}>
      {title}
      <br />
      {description}
      <br />
      <img
        src={imageSrc}
        alt="hey"
        style={{
          maxWidth: '10%',
        }}
      />
    </a>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default Product;

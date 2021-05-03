import React from 'react';
import ReactDOM from 'react-dom';
import MDXDocument from '@entry-mdx';
import { MDXProvider } from '@mdx-js/react';
import Wrapper from './components/wrapper';

ReactDOM.render(
  <MDXProvider
    components={{
      wrapper: Wrapper,
    }}
  >
    <MDXDocument />
  </MDXProvider>,
  document.getElementById('root')
);

if (module && module.hot) {
  module.hot.accept();
}

import React from 'react';
import ReactDOM from 'react-dom';
import MDXDocument from '@entry-mdx';
import { MDXProvider } from '@mdx-js/react';
import Slides from '@components/slides';

ReactDOM.render(
  <MDXProvider>
    <Slides>
      <MDXDocument />
    </Slides>
  </MDXProvider>,
  document.getElementById('root')
);

if (module && module.hot) {
  module.hot.accept();
}

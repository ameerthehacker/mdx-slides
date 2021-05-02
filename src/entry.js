import React from 'react';
import ReactDOM from 'react-dom';
// the {entryMDX} will be replaced before building step
import MDXDocument from '{entryMDX}';
import { MDXProvider } from '@mdx-js/react';

ReactDOM.render(
  <MDXProvider>
    <MDXDocument />
  </MDXProvider>,
  document.getElementById('root')
);

if (module && module.hot) {
  module.hot.accept();
}

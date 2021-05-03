import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './components/wrapper';
import { ThemeProvider } from 'theme-ui';
import defaultTheme from '../themes/default';
import * as MDX from '@entry-mdx';

const MDXDocument = MDX.default;
const theme = MDX.theme || defaultTheme;

if (theme.googleFont) {
  const linkTag = document.createElement('link');

  linkTag.setAttribute('rel', 'stylesheet');
  linkTag.setAttribute('href', theme.googleFont);

  document.head.appendChild(linkTag);
}

ReactDOM.render(
  <ThemeProvider
    components={{
      wrapper: Wrapper,
    }}
    theme={theme}
  >
    <MDXDocument />
  </ThemeProvider>,
  document.getElementById('root')
);

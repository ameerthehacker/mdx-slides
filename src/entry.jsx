import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './components/wrapper';
import { ThemeProvider } from 'theme-ui';
import defaultTheme from '../themes/default';
import * as MDX from '@entry-mdx';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
 * {
   padding: 0px;
   margin: 0px;
 }
 #root {
   height: 100vh;
 }
`;
const MDXDocument = MDX.default;
const theme = MDX.theme ? { ...defaultTheme, ...MDX.theme } : defaultTheme;

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
    <GlobalStyles />
    <MDXDocument />
  </ThemeProvider>,
  document.getElementById('root')
);

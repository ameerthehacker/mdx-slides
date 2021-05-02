import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import NoSlides from './empty';
import Slides from './slides';

function getSlides(children) {
  let currentSlideIndex = 0;
  let slides = [];
  const addChildToSlide = (index, child) => {
    if (!slides[index]) slides[index] = [];

    slides[index].push(child);
  };

  React.Children.forEach(children, (child) => {
    if (child.props.mdxType === 'hr') {
      currentSlideIndex++;
    } else {
      addChildToSlide(currentSlideIndex, child);
    }
  });

  return slides;
}

export default function Wrapper({ children }) {
  const slides = getSlides(children);

  return slides.length > 0 ? (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/1" />
        </Route>
        <Route path="/:slideNumber">
          <Slides slides={slides} />
        </Route>
      </Switch>
    </HashRouter>
  ) : (
    <NoSlides />
  );
}

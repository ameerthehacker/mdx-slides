import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

export default function Slides({ slides }) {
  const { slideNumber } = useParams();
  const slide = slides[slideNumber - 1];

  // invalid slide number go to the first slide
  if (!slide) {
    return <Redirect to="/1" />;
  } else {
    return slides[slideNumber - 1];
  }
}

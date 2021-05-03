import React from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import useKey from '@rooks/use-key';
import styled from 'styled-components';

const Slide = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Slides({ slides }) {
  const history = useHistory();
  let { slideNumber } = useParams();
  slideNumber = parseInt(slideNumber);
  const slide = slides[slideNumber - 1];
  const moveForward = () => {
    const nextSlideNumber = slideNumber === slides.length ? 1 : slideNumber + 1;

    history.push(`/${nextSlideNumber}`);
  };
  const moveBackward = () => {
    const nextSlideNumber = slideNumber === 1 ? slides.length : slideNumber - 1;

    history.push(`/${nextSlideNumber}`);
  };

  useKey(['ArrowLeft', 'ArrowDown'], () => moveBackward());
  useKey(['ArrowRight', 'ArrowUp'], () => moveForward());

  // invalid slide number go to the first slide
  if (!slide) {
    return <Redirect to="/1" />;
  } else {
    return (
      <Slide>
        <div>{slides[slideNumber - 1]}</div>
      </Slide>
    );
  }
}

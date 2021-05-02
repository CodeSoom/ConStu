import facepaint from 'facepaint';

const mq = facepaint([
  '@media(min-width: 450px)',
  '@media(min-width: 650px)',
  '@media(min-width: 1050px)',
]);

export const mq2 = facepaint([
  '@media(min-width: 1050px)',
]);

export const mq3 = facepaint([
  '@media(min-width: 450px)',
  '@media(min-width: 650px)',
  '@media(min-width: 820px)',
  '@media(min-width: 1050px)',
]);

export const mq4 = facepaint([
  '@media(min-width: 450px)',
  '@media(min-width: 700px)',
]);

export default mq;

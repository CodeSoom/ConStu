export const dateToString = jest.fn((date) => date);

export const toStringEndDateFormat = jest.fn();

export const formatReviewDate = (reviews) => reviews.map((review) => ({
  ...review,
  createDate: dateToString(review.createDate),
}));

export const formatGroup = (group) => {
  const { applyEndDate, createDate, reviews } = group.data();

  return {
    ...group.data(),
    id: group.id,
    applyEndDate: dateToString(applyEndDate),
    createDate: dateToString(createDate),
    reviews: reviews && [...formatReviewDate(reviews)],
  };
};

export const getInitTheme = jest.fn();

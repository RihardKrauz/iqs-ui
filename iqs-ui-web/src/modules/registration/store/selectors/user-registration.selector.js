export const getErrorsMessages = ({ errors }) =>
    errors
        ? Object.keys(errors).map(
              err => `Errors in field ${err}: ${[].concat(errors[err].general, errors[err].custom).join(',')}`
          )
        : '';

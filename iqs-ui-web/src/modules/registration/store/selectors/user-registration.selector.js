/**
 * Get all errors from state
 * @param {errors} state current state
 */
export const getErrorMessages = ({ errors }) =>
    errors
        ? Object.keys(errors).map(
              err => `Errors in field ${err}: ${[].concat(errors[err].general, errors[err].custom).join(',')}`
          )
        : [];

import Error from '../types/error';

const throwError = (message: string, status?: number) => {
  const error: Error = new Error(message);
  if (status) {
    console.log(status);
    error.statusCode = status;
  } else {
    error.statusCode = 500;
  }
  throw error;
};
export default throwError;

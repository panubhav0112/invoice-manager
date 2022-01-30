import express from 'express';
import ResSchema from 'src/types/res_schema';
// const notFound = (req: express.Request, res: express.Response, next: any) => {
//   const error = new Error(`Not found - ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

const errorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: any
) => {
  console.log(err);
  const statusCode = err.statusCode === 200 ? 500 : err.statusCode;
  res.status(statusCode);
  res.json({
    data: [],
    message: err.message,
    success: false,
  });
};

export { errorHandler };

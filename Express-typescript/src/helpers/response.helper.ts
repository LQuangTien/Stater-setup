import * as express from "express";
const Response = {
  success: (res: express.Response, data: any, status = 200) => {
    return res.status(status).json({
      success: true,
      ...data
    });
  },
  error: (res: express.Response, err: any, status = 400) => {
    return res.status(status).json({
      success: false,
      error: {
        message: err.message,
        type: err.type,
        errors: err.errors
      }
    });
  }
};
export default Response;

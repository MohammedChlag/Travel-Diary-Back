export const generateErrorUtils = (status, code, message) => {
  throw {
    httpStatus: typeof status === "number" ? status : 500,
    code: typeof code === "string" ? code : "INTERNAL_SERVER_ERROR",
    message:
      typeof message === "string" ? message : "Ocurrió un error inesperado.",
  };
};

// funcion que maneje los errores

export const generateErrorUtils = (status, code, message)=>{
    const error = new Error(message)
    error.httpStatus = status
    error.code = code
    return error;
};
const humps = require("humps");
/**
 * Append generic headers to our API response.
 * @param {Object} ctx koa server context
 */
const httpHeaders = (ctx) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
};
/**
 * Decorate a successful response object.
 * @param {Object} ctx koa server context
 * @param {Object} data actual response data
 * @param {Number} status defaults to `200`
 */
const httpResponse = (ctx, data, status) => {
  httpHeaders(ctx);
  ctx.status = status || 200;
  ctx.body = {
    data: humps.decamelizeKeys(data || {}),
    method: `${ctx.method} ${ctx.path}`,
  };
  console.log("httpResponse", {
    request: JSON.stringify(ctx.request.body),
    response: JSON.stringify(ctx.body),
  });
  return ctx.body;
};
/**
 * Decorate an error response object.
 * @param {Object} ctx koa server context
 * @param {Error} error exception error
 */
const httpError = (ctx, error) => {
  httpHeaders(ctx);
  const stack = error.stack.split("\n").map((file) => file.trim().substring(3));
  stack.shift();
  ctx.status = error.getStatusCode ? error.getStatusCode() : 500;
  ctx.body = {
    error: {
      code: ctx.status,
      message: error.message,
      location: stack,
    },
    method: `${ctx.method} ${ctx.path}`,
  };
  console.log("httpError", {
    request: JSON.stringify(ctx.request.body),
    response: JSON.stringify(ctx.body),
  });
  return ctx.body;
};

module.exports = { httpResponse, httpError };

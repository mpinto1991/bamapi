const Koa = require("koa");
const Router = require("koa-router");
const Logger = require("koa-logger");
const BodyParser = require("koa-bodyparser");
const Fs = require("fs");
const ErrorHandler = require("./infrastructure/middleware/errorhandler");
const NotFoundError = require("./domain/errors/notfound");
const base = require("./routes/base");
const filesrouter = require("./routes/filesrouter");
const FileRepo = require("./persistence/files");

/* Create repositories */
const repositories = [
  new FileRepo(Fs.promises)
];
/* Create app and register middlewares */
const app = new Koa();
app.use(Logger());
app.use(BodyParser());
app.use(ErrorHandler());
/* Connect base router */
const baseRouter = new Router();
base(...repositories)(baseRouter);
app.use(baseRouter.routes());
app.use(baseRouter.allowedMethods());
/* Connect files router */
const filesRouter = new Router({ prefix: "/files" });
filesrouter(...repositories)(filesRouter);
app.use(filesRouter.routes());
app.use(filesRouter.allowedMethods());
/* Top level error handler */
app.use(async (ctx) => {
  throw new NotFoundError(`Route '${ctx.method} ${ctx.path}'`);
});
/* Start service in port */
app.listen(process.env.LISTEN_PORT);

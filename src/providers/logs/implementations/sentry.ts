import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { Router } from "express";

export function sentry(app: Router) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],

    tracesSampleRate: 1.0,
  });
  return Sentry;
}

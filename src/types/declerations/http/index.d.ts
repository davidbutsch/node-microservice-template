import { IncomingHttpHeaders } from "http";

declare module "http" {
  interface IncomingHttpHeaders {
    session?: string;
  }
}

import { ENDPOINTS } from "./constants";
import { Docs } from "./docs";

// once written difficult generics make life easier in the future

export type Endpoint = keyof typeof ENDPOINTS;
export type Method = 'get' | 'post' | 'put' | 'delete';
type MethodKey = 'params' | 'body' | 'res' | 'headers';
type notSet = '_is_not_set_';

export type MethodField<
  E extends keyof typeof ENDPOINTS,
  M extends Method,
  MK extends MethodKey
> = E extends keyof Docs
  ? M extends keyof Docs[E]
    ? Docs[E][M] extends ({ [K in MK]?: infer MP1 } | { [K in MK]: infer MP2 })
      ? MP1 | MP2
      : Docs[E] extends ({ [K in MK]?: infer EP1 } | { [K in MK]: infer EP2 })
        ? EP1 | EP2
        : notSet
    : never
  : never;

type DocsEndpoint<
  E extends keyof typeof ENDPOINTS,
  M extends Method
> = E extends keyof Docs
  ? M extends keyof Docs[E]
    ? M extends ('get' | 'delete')
      ? E
      : (E | `${E}/${string}`)
    : never
  : never;

export type MethodArgs<
  E extends Endpoint,
  M extends Method
> =
  & ({ endpoint: DocsEndpoint<E, M> })
  & (MethodField<E, M, 'params'> extends notSet
      ? { params?: undefined }
      : { params: MethodField<E, M, 'params'> })
  & (MethodField<E, M, 'body'> extends notSet
      ? { body?: undefined }
      : { body: MethodField<E, M, 'body'> })
  & (MethodField<E, M, 'headers'> extends notSet
      ? { headers?: { 'Content-Type': 'application/json' } }
      : {
          headers: MethodField<E, M, 'headers'> extends HeadersInit
            ? MethodField<E, M, 'headers'>
            : { 'Content-Type': 'application/json' }
        });

export type EndpointsDocs = {
  [K in keyof typeof ENDPOINTS]: unknown;
};
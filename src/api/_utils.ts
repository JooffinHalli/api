import { URL } from "./constants";
import { Endpoint, Method, MethodArgs, MethodField } from "./_typesUtils";

export const genMethod = <M extends Method>(method: M) => {

  const methodFn = async <E extends Endpoint>({
    endpoint,
    params,
    body,
    headers = { 'Content-Type': 'application/json' }
  }: MethodArgs<E, M>) => {


    const parameters = params
      ? `?${Object.keys(params).map(k => `${k}=${(params as any)[k]}`).join('&')}`
      : '';

    const url = `${URL}${endpoint}${parameters}`;

    try {
      const res: Promise<MethodField<E, M, 'res'>> = fetch(url, {
        method,
        headers,
        body
      }).then(r => r.json());

      return res;
    }
    catch (e: any) {
      throw new Error(e.message || 'нет связи с сервером');
    }
  };

  return methodFn;
};
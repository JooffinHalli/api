import { EndpointsDocs } from "./_typesUtils";

// you should describe every registrated endpoint, otherwise you can not call it

export interface Docs extends EndpointsDocs {
  ['exampleEndpoint']: {
    entity: {
      id: number
      one: number
      two: number
      three: number
      four: number
      five: number
    }
    get: {
      params: {
        count?: number
      }
      res: {
        count: number
        data: Docs['exampleEndpoint']['entity'][]
      }
    }
  }
  ['test']: {
    put: {
      params: {
        user?: number
      }
      res: 'Ok'
    },
    post: {
      body: FormData
      res: 'Ok'
    }
  }
}
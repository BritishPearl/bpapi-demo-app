import * as ClientOAuth2 from 'client-oauth2';
import { Request, Response } from 'express';
import * as request from 'request';
import BPClient from '../middlewares/BPClient';

const makeCall = (res: Response, path: string, token: ClientOAuth2.Token) => {
  const req: ClientOAuth2.RequestObject = token.sign({
    method: 'get',
    url: BPClient.baseUri + path,
  });
  const options = {
    url: req.url,
    headers: req.headers,
  };
  request(options, (error: any, response: any, body: string) => {
    if (error) {
      return res.status(500).end();
    } else {
      return res.status(response.statusCode).json(JSON.parse(response.body));
    }
  });
};

const proxyCall = (req: Request, res: any, path: string) => {
  BPClient.loadToken(res.req.user.id)!!.then((token) => {
    if (token) {
      return makeCall(res, path, token);
    } else {
      return res.status(401).end();
    }
  }).catch((err) => {
    return res.status(500).end();
  });
};

export const auth = (req: Request, res: Response) => {
  const uri = BPClient.authenticationUri();
  res.redirect(uri);
};

export const callback = (req: Request, res: any) => {
  BPClient.retrieveToken(req.query.url, res.req.user.id).then(() => {
    res.status(200).send({});
  }).catch((err) => {
    res.status(400).end();
  });
};

export const revoke = (req: Request, res: any) => {
  return BPClient.revokeToken(res.req.user.id)
    .then(() => res.status(200).send({}))
    .catch((err) => res.status(500).send({}));
};

export const accounts = (req: Request, res: Response) => proxyCall(req, res, '/accounts');

export const investmentSummary = (req: Request, res: Response) => proxyCall(req, res, '/accounts/investment-summary');

import { Request, Response } from 'express';

export type CreateController<T> = () => T;

export type HttpRequestHandler = (req: Request, res: Response) => Promise<void>;

export type AuthWrappedHttpRequestHandler = (jwtVerifier: any) => HttpRequestHandler;
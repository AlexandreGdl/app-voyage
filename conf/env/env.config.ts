/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Env } from './env.interface';

// @ts-ignore
import developmentEnv from './env.development';

const getEnvVars = (): Env => {
  return developmentEnv;
};

export const env = getEnvVars();

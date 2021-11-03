//Learn more here: https://mswjs.io/docs/getting-started/integrate/browser
//This is a service worker https://developers.google.com/web/fundamentals/primers/service-workers

import { setupWorker } from 'msw';
import { handlers } from './handlers';

const worker = setupWorker(...handlers);

export default worker;

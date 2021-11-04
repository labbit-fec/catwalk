//Learn more here: https://mswjs.io/docs/getting-started/integrate/browser
//This is a service worker https://developers.google.com/web/fundamentals/primers/service-workers

import { setupServer } from 'msw/node';
import handlers from './handlers';

debugger;
const mswServer = setupServer(...handlers);

export default mswServer;

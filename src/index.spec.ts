import Connection from 'imap';
import connect from './index';

require('dotenv').config();

const config: Connection.Config = {
  user: process.env.EMAIL_ACCOUNT || '',
  password: process.env.EMAIL_PASSWORD || '',
  host: process.env.EMAIL_HOST || '',
  port: parseInt(process.env.EMAIL_PORT || '', 10),
  tls: !!process.env.EMAIL_TLS,
  authTimeout: parseInt(process.env.EMAIL_AUTH_TIMEOUT || '', 10),
};

// @ts-ignore
test('#Connection test.', async () => {
  const imap = await connect(config);
  imap.destroy();
  imap.end();
});

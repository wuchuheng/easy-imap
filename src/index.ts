import Connection from 'imap';
import ImapImp from './imap/ImapImp';

const connect = (config: Connection.Config):Promise<ImapInterface> => ImapImp.connect(config);

export default connect;

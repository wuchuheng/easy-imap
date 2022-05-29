import Connection from 'imap';
import { ImapInterface } from './ImapInterface';

export default class ImapImp implements ImapInterface {
  private readonly imap: Connection;

  constructor(imapInstance: Connection) {
    this.imap = imapInstance;
  }

  /** Attempts to connect and authenticate with the IMAP server. */
  public static connect(config: Connection.Config): Promise<ImapInterface> {
    return new Promise<ImapInterface>((resolve, reject) => {
      const imapInstance = new Connection(config);
      imapInstance.once('ready', () => resolve(new ImapImp(imapInstance)));
      imapInstance.once('error', (err: Error) => reject(err));
      imapInstance.connect();
    });
  }

  destroy(): void {
    this.imap.destroy();
  }

  end(): void {
    this.imap.end();
  }

  openBox(mailboxName: string): Promise<Connection.Box>;
  openBox(mailboxName: string, openReadOnly: boolean): Promise<Connection.Box>;
  openBox(mailboxName: string, openReadOnly: boolean, modifiers: Object): Promise<Connection.Box>;
  openBox(
    mailboxName: string,
    openReadOnly?: boolean,
    modifiers?: Object,
  ): Promise<Connection.Box> {
    return new Promise<Connection.Box>((resolve, reject) => {
      const callBack = (error: Error, mailbox: Connection.Box) => {
        if (error) {
          return reject(error);
        }
        return resolve(mailbox);
      };
      if (mailboxName && openReadOnly !== undefined && modifiers !== undefined) {
        this.imap.openBox(mailboxName, openReadOnly, mailboxName, callBack);
      } else if (mailboxName && openReadOnly !== undefined) {
        this.imap.openBox(mailboxName, openReadOnly, callBack);
      } else {
        this.imap.openBox(mailboxName, callBack);
      }
    });
  }
}

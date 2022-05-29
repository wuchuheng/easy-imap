import Connection from 'imap';

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
}

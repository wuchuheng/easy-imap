import Connection from 'imap';

declare interface ImapInterface {
  /** Immediately destroys the connection to the server. */
  destroy(): void;

  /** Closes the connection to the server after all requests in the queue have been sent. */
  end(): void;

  /**
   * Opens a specific mailbox that exists on the server. mailboxName should include any necessary
   * prefix/path. modifiers is used by IMAP extensions.
   * */
  openBox(mailboxName: string): Promise<Connection.Box>;
  openBox(mailboxName: string, openReadOnly: boolean): Promise<Connection.Box>;
  openBox(mailboxName: string, openReadOnly: boolean, modifiers: Object): Promise<Connection.Box>;
  /** Creates a new mailbox on the server. mailboxName should include any necessary prefix/path. */
  addBox(mailboxName: string): Promise<void>;
}

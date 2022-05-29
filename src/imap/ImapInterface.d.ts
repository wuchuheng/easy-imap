declare interface ImapInterface {
  /** Immediately destroys the connection to the server. */
  destroy(): void;
  /** Closes the connection to the server after all requests in the queue have been sent. */
  end(): void;
}

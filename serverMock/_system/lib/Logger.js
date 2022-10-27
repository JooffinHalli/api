class Logger {

  #red = '\x1b[31m%s\x1b[0m';
  #green = '\x1b[32m%s\x1b[0m';
  #yellow = '\x1b[33m%s\x1b[0m';
  #blue = '\x1b[34m%s\x1b[0m';
  #magenta = '\x1b[35m%s\x1b[0m';
  #cyan = '\x1b[36m%s\x1b[0m';

  #log = console.log;

  info(...args) { this.#log(...args) }
  success(...args) { this.#log(this.#green, ...args) }
  warn(...args) { this.#log(this.#yellow, ...args) }
  err(...args) { this.#log(this.#red, ...args) }

}

module.exports = new Logger();
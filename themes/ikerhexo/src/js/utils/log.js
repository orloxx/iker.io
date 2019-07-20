class Log {
  static info(...objs) {
    if (process.env.NODE_ENV === 'development') {
      console.log(...objs);
    }
  }

  static error(...objs) {
    if (process.env.NODE_ENV === 'development') {
      console.error(...objs);
    }
  }
}

export default Log;

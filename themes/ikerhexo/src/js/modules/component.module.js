class Component {
  constructor(el, config, name) {
    this.el = el;
    this.config = config;
    this.name = name;
  }

  init() {
    throw new Error(`${this.name} Component: Missing method 'init'`);
  }
}

export default Component;

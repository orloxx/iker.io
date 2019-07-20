import Log from 'utils/log';

let instance;

class ComponentLoader {
  static get instance() {
    if (!instance) {
      instance = new ComponentLoader();
    }
    return instance;
  }

  static register(component) {
    ComponentLoader.instance.register(component);
  }

  static init() {
    ComponentLoader.instance.init();
  }

  constructor() {
    this.components = {};
    this.elements = [...document.querySelectorAll('[data-components]')];
  }

  register(component) {
    this.components = Object.assign({}, this.components, component);
  }

  init() {
    this.elements.forEach(this.traverse.bind(this));
  }

  traverse(el) {
    const dataComponents = el.getAttribute('data-components').split(' ');
    dataComponents.forEach((componentName) => {
      try {
        const Component = this.components[componentName];
        const config = JSON.parse(el.getAttribute(`data-config-${componentName}`));
        Log.info(`${componentName} Component initialised`, el, config);
        const instance = new Component(el, config, componentName);
        instance.init();
      } catch (e) {
        Log.error(`${componentName}: Problem initialising component.`, e);
      }
    });
  }
}

export default ComponentLoader;

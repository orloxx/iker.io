import ComponentLoader from 'component.loader';
import Component from 'modules/component.module';

class HomeMenu extends Component {
  init() {
    const button = this.el.querySelector('.homeheader__button');
    button.addEventListener('click', this.toggleMenu.bind(this));
    this.menu = this.el.querySelector('.homeheader__menu');
  }

  toggleMenu() {
    const openClass = 'homeheader__menu--open';
    if (this.menu.classList.contains(openClass)) {
      this.menu.classList.remove(openClass);
    } else {
      this.menu.classList.add(openClass);
    }
  }
}

ComponentLoader.register({ HomeMenu });
export default HomeMenu;

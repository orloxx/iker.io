import ComponentLoader from 'component.loader';
import Component from 'modules/component.module';

class FooterDate extends Component {
  init() {
    this.el.innerHTML = new Date().getFullYear();
  }
}

ComponentLoader.register({ FooterDate });
export default FooterDate;

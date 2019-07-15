import ComponentLoader from 'component.loader';
import Component from 'modules/component.module';
import onScroll from 'utils/on-scroll';

class ProgressBar extends Component {
  init() {
    this.appendBar();
    this.addEventListeners();
    console.log(this.el.getBoundingClientRect());
  }

  appendBar() {
    this.$bar = document.createElement('DIV');
    this.$progress = document.createElement('DIV');
    this.$bar.id = Math.random().toString(36).substring(2);
    this.$bar.classList.add('progressBar');
    this.$progress.classList.add('progressBar__current');
    this.$bar.appendChild(this.$progress);
    document.body.appendChild(this.$bar);
  }

  addEventListeners() {
    onScroll(this.updateCurrentPosition.bind(this));
  }

  updateCurrentPosition(scroll) {
    console.log(this.el.getBoundingClientRect());
  }
}

ComponentLoader.register({ ProgressBar });
export default ProgressBar;

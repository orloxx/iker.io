import ComponentLoader from 'component.loader';
import Component from 'modules/component.module';
import onScroll from 'utils/on-scroll';

class ProgressBar extends Component {
  init() {
    this.appendBar();
    this.addEventListeners();
  }

  appendBar() {
    this.$bar = document.createElement('DIV');
    this.$progress = document.createElement('DIV');
    this.$bar.classList.add('progressBar');
    this.$progress.classList.add('progressBar__current');
    this.$bar.appendChild(this.$progress);
    document.body.appendChild(this.$bar);
  }

  addEventListeners() {
    onScroll(this.updateCurrentPosition.bind(this), 20);
  }

  updateCurrentPosition() {
    const { top, height } = this.el.getBoundingClientRect();
    const realHeight = Math.max(0, height - innerHeight);
    const percent = Math.min(Math.max(0, (-top) * 100 / realHeight), 100);

    this.$progress.style.width = `${percent}%`;
  }
}

ComponentLoader.register({ ProgressBar });
export default ProgressBar;

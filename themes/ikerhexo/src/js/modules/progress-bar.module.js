import ComponentLoader from 'component.loader';
import Component from 'modules/component.module';
import onScroll from 'utils/on-scroll';
import progressBarTemplate from 'templates/progress-bar.hbs';

class ProgressBar extends Component {
  init() {
    this.initTitles();
    this.appendBar();
    this.addEventListeners();
  }

  initTitles() {
    this.titles = [...this.el.querySelectorAll('h1,h2,h3,h4,h5')];
  }

  appendBar() {
    const fixedParent = document.createElement('DIV');
    fixedParent.innerHTML = progressBarTemplate({ titles: this.titles.slice(1) });
    this.$bar = fixedParent.querySelector('.progressBar');
    this.$progress = fixedParent.querySelector('.progressBar__current');
    this.$currentTitle = fixedParent.querySelector('.progressBar__currentTitle');
    this.$titles = fixedParent.querySelector('.progressBar__titles');
    document.body.appendChild(fixedParent);
  }

  addEventListeners() {
    onScroll(this.updateCurrentPosition.bind(this), 20);
    this.$currentTitle.addEventListener('click', this.toggleIndex.bind(this));
    this.$titles.addEventListener('click', this.closeIndex.bind(this));
  }

  updateCurrentPosition() {
    const { top, height } = this.el.getBoundingClientRect();
    const realHeight = Math.max(0, height - innerHeight);
    const percent = Math.min(Math.max(0, (-top) * 100 / realHeight), 100);

    this.$progress.style.width = `${percent}%`;

    if (percent > 0) {
      this.$currentTitle.removeAttribute('hidden');
      const $selected = this.titles.reduce((a, b) => {
        return ((this.$bar.offsetHeight * 2) - top) < b.offsetTop ? a : b;
      });
      this.$currentTitle.innerHTML = $selected.outerHTML;
    } else {
      this.$currentTitle.setAttribute('hidden', true);
      this.$titles.setAttribute('hidden', true);
    }
  }

  toggleIndex(e) {
    e.preventDefault();
    if (this.$titles.hidden) {
      this.$titles.removeAttribute('hidden');
      document.body.classList.add('noScroll');
    } else {
      this.closeIndex();
    }
  }

  closeIndex() {
    this.$titles.setAttribute('hidden', true);
    document.body.classList.remove('noScroll');
  }
}

ComponentLoader.register({ ProgressBar });
export default ProgressBar;

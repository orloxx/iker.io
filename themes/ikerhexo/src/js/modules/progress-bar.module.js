import ComponentLoader from 'component.loader';
import Component from 'modules/component.module';
import onScroll from 'utils/on-scroll';
import progressBarTemplate from 'templates/progress-bar.hbs';

class ProgressBar extends Component {
  static get CONFIG() {
    return {
      elements: {
        bar: '.progressBar',
        progress: '.progressBar__current',
        currentTitle: '.progressBar__currentTitle',
        titles: '.progressBar__titles',
      },
      classes: {
        titlesOpen: 'progressBar__titles--open',
      },
    };
  }

  init() {
    this.options = Object.assign({}, ProgressBar.CONFIG, this.config);
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
    this.$bar = fixedParent.querySelector(this.options.elements.bar);
    this.$progress = fixedParent.querySelector(this.options.elements.progress);
    this.$currentTitle = fixedParent.querySelector(this.options.elements.currentTitle);
    this.$titles = fixedParent.querySelector(this.options.elements.titles);
    document.body.appendChild(fixedParent);
  }

  addEventListeners() {
    onScroll(this.updateCurrentPosition.bind(this), 20);

    if (this.$currentTitle) {
      this.$currentTitle.addEventListener('click', this.toggleIndex.bind(this));
    }
    if (this.$titles) {
      this.$titles.addEventListener('click', this.closeIndex.bind(this));
    }
  }

  updateCurrentPosition() {
    const { top, height } = this.el.getBoundingClientRect();
    const realHeight = Math.max(0, height - innerHeight);
    const percent = Math.min(Math.max(0, (-top) * 100 / realHeight), 100);

    this.$progress.style.width = `${percent}%`;

    if (this.$currentTitle) {
      if (percent > 0) {
        this.$currentTitle.removeAttribute('hidden');
        const $selected = this.titles.reduce((a, b) => {
          return ((this.$bar.offsetHeight * 2) - top) < b.offsetTop ? a : b;
        });
        this.$currentTitle.children[0].innerHTML = $selected.outerHTML;
      } else {
        this.$currentTitle.setAttribute('hidden', true);
        this.closeIndex();
      }
    }
  }

  toggleIndex(e) {
    e.preventDefault();
    if (this.$titles.classList.contains(this.options.classes.titlesOpen)) {
      this.closeIndex();
    } else {
      this.$titles.classList.add(this.options.classes.titlesOpen);
    }
  }

  closeIndex() {
    this.$titles.classList.remove(this.options.classes.titlesOpen);
  }
}

ComponentLoader.register({ ProgressBar });
export default ProgressBar;

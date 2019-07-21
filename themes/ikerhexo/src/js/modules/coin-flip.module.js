import ComponentLoader from 'component.loader';
import Component from 'modules/component.module';

class CoinFlip extends Component {
  init() {
    this.el.addEventListener('click', this.flip.bind(this));
    this.options = Object.assign({}, this.config, {
      classes: {
        heads: 'coin__heads',
        tails: 'coin__tails',
      },
    });
  }

  flip(e) {
    e.preventDefault();
    const random = Math.random();

    this.el.classList.remove(this.options.classes.heads);
    this.el.classList.remove(this.options.classes.tails);

    setTimeout(() => {
      if (random < 0.5) {
        this.el.classList.add(this.options.classes.heads);
      } else {
        this.el.classList.add(this.options.classes.tails);
      }
    }, 100);
  }
}

ComponentLoader.register({ CoinFlip });
export default CoinFlip;

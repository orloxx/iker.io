import ComponentLoader from 'component.loader';
import Component from 'modules/component.module';

class SearchBar extends Component {
  init() {
    this.$submit = this.el.querySelector('.search-form-submit');
    this.$submit.innerHTML = `<svg class="icon"><use xlink:href="#src--svg--search"></use></svg>`;
  }
}

ComponentLoader.register({ SearchBar });
export default SearchBar;

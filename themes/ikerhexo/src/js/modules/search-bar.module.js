import ComponentLoader from 'component.loader';
import Component from 'modules/component.module';

class SearchBar extends Component {
  init() {
    const $form = this.el.querySelector('.search-form');
    $form.setAttribute('autocomplete', 'off');
    const $submit = this.el.querySelector('.search-form-submit');
    $submit.innerHTML = `<svg class="icon"><use xlink:href="#src--svg--search"></use></svg>`;
  }
}

ComponentLoader.register({ SearchBar });
export default SearchBar;

import htmx from 'htmx.org/dist/htmx';
import _hyperscript from 'hyperscript.org/dist/_hyperscript';

window.htmx = htmx;
window._hyperscript = _hyperscript;
_hyperscript.browserInit();

htmx.defineExtension('checkbox-enc', {
  encodeParameters: function (xhr, parameters, elt) {
    const cbs = elt.querySelectorAll('input[type=checkbox]');
    cbs.forEach((cb) => {
      if (cb.name) {
        parameters[cb.name] = cb.checked === true;
      }
    });
  }
});

htmx.on('htmx:afterOnLoad',
  /** @param {CustomEvent<{xhr: XMLHttpRequest}>} */
  function ({ detail: { xhr } }) {
    const header = xhr.getResponseHeader("HX-Navigate")
    if (!header) {
      return;
    }
    /** @type {{path: string; routerElt?: string; silent?: boolean}} */
    const nav = JSON.parse(header);
    if (!nav.path) {
      return;
    }
    const target = (nav.routerElt && document.querySelector(nav.routerElt)) || document.body;
    if (target) {
      target.dispatchEvent(new CustomEvent('navigate', {
        detail: { path: nav.path, silent: nav.silent }
      }));
    }
  });

customElements.define('on-lifecycle-event', class extends HTMLDivElement {
  connectedCallback() {
    if (this.hasAttribute('_')) {
      this.addEventListener('load', function () {
        this.dispatchEvent(new CustomEvent('init'));
      }, { once: true });
      return
    }
    this.dispatchEvent(new CustomEvent('init'));
  }

  disconnectedCallback() {
    this.dispatchEvent(new CustomEvent('destroy'));
  }
}, { extends: 'div' });

class WorkflowService {
  constructor() {
    /** @type {string} */
    this.__current = '';
  }

  get current() {
    return this.__current;
  }

  set current(c) {
    this.__current = c;
  }
}


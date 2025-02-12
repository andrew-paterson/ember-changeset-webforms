import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import MarkdownIt from 'markdown-it';
import { htmlSafe } from '@ember/template';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{this.html}}\n{{!-- {{#if this.html}}\n  {{#if this.htmlNotParsed}}\n    <div style=\"display:none\" {{did-insert this.parseHTML}}>{{this.html}}</div>\n  {{else}}\n    {{this.html}}\n  {{/if}}\n{{/if}} --}}");

const md = new MarkdownIt({});
class MarkdownToHtml extends Component {
  static {
    g(this.prototype, "source", [tracked]);
  }
  #source = (i(this, "source"), undefined);
  get html() {
    const element = document.createElement('div');
    element.innerHTML = md.renderInline(this.args.source);
    var links = element.querySelectorAll('a');
    for (var link of Array.from(links)) {
      if (link.hostname !== window.location.hostname && !link.getAttribute('href').startsWith('#')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
    }
    return htmlSafe(element.innerHTML);
  }
}
setComponentTemplate(TEMPLATE, MarkdownToHtml);

export { MarkdownToHtml as default };
//# sourceMappingURL=markdown-to-html.js.map

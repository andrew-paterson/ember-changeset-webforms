import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';
import { g, i } from 'decorator-transforms/runtime';

class SvgIconBase extends Component {
  static {
    g(this.prototype, "vectorEffect", [tracked]);
  }
  #vectorEffect = (i(this, "vectorEffect"), undefined);
  get computedVectorEffect() {
    return this.args.vectorEffect || 'non-scaling-stroke';
  }
}

export { SvgIconBase as default };
//# sourceMappingURL=svg-icon-base.js.map

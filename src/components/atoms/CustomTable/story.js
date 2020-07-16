import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
// required Knobs interfaces
import { text, boolean, radios, object } from '@storybook/addon-knobs';
// this module
import CustomTable from './index.vue';
// module readme
import readme from './readme.md';

storiesOf('atoms/CustomTable', module)
  .add('default', () => ({
    components: { CustomTable },
    props: {
    },
    template: `
          <custom-table>
          </custom-table>
    `,
  }), {
    notes: { markdown: readme },
  });
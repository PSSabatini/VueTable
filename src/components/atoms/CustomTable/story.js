import Vue from 'vue';
import { storiesOf } from '@storybook/vue';
// required Knobs interfaces
import { text, boolean, radios, object } from '@storybook/addon-knobs';
// this module
import CustomTable from './index.vue';
// module readme
import readme from './readme.md';

const tableData = [
  {
    Name: 'Paola',
    Age: 32,
    Github: '<a target="_blank" href="www.github.com/PSSabatini">/PSSabatini</a>',
    Technologies: ['Javascript', 'Vue.js', 'React', 'SCSS'],
    'Developer Since': '01.05.2019',
    Code: 'JS15',
    Salary: '15.000,00 €',
  },
  {
    Name: 'Leonardo',
    Age: 33,
    Github: '<a target="_blank" href="www.github.com/Carleon">/Carleon</a>',
    Technologies: ['Javascript', 'Java', 'SQL', 'Jest'],
    'Developer Since': '10.01.2000',
    Code: 'JS29',
    Salary: '30.000,00 €',
  },
  {
    Name: 'Amanda',
    Age: 45,
    Github: '<a target="_blank" href="www.github.com/">/Amanda</a>',
    Technologies: ['Phyton', 'Java'],
    'Developer Since': '01.02.1995',
    Code: 'JS123',
    Salary: '12.312,00 €',
  },
  {
    Name: 'Marija',
    Age: 25,
    Github: '<a target="_blank" href="www.github.com/">/Marija</a>',
    Technologies: ['CSS', 'HTML5', 'Javascript'],
    'Developer Since': '01.05.2019',
    Code: 'JS9',
    Salary: '58.000,00 €',
  },
  {
    Name: 'Max',
    Age: 31,
    Github: '<a target="_blank" href="www.github.com/">/Max</a>',
    Technologies: ['Vue.js', 'React', 'Angular'],
    'Developer Since': '02.06.2015',
    Code: 'JS9847',
    Salary: '123,00 €',
  },
];

storiesOf('atoms/CustomTable', module)
  .add('default', () => ({
    components: { CustomTable },
    props: {
      tableData: {
        default: object('Table Data', tableData),
      },
    },
    template: `
          <custom-table :itemsTable="tableData">
          </custom-table>
    `,
  }), {
    notes: { markdown: readme },
  });
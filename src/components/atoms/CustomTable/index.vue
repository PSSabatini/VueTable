<template>
  <div class="custom-table">

    <table>

      <thead>
        <tr>
          <th
            v-for="(items, index) in columns"
            :key="index"
            @click="sort(items, $event)">
              {{ items }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(items, name, index) in sortedItems"
          :key="index">

          <td
            v-for="(item, name, index) in items"
            :key="index"
            v-html="item">
          </td>

        </tr>
      </tbody>

    </table>

  </div>
</template>

<script>
export default {
  name: 'CustomTable',

  data() {
    return {
      tableData: this.itemsTable,
      ascending: '',
      selectedColumn: '',
      changedColumn: '',
    };
  },

  props: {
    itemsTable: {
      default: () => [],
    },
  },

  watch: {
    selectedColumn() {
      this.changedColumn = this.selectedColumn;
    },
  },

  computed: {
    columns() {
      const cols = [];

      this.tableData.forEach((item) => {
        const keys = Object.keys(item);

        keys.forEach((key) => {
          if (!cols.includes(key)) {
            cols.push(key);
          }
        });
      });

      return cols;
    },

    sortedItems() {
      const item = [];

      this.tableData.forEach((it) => {
        if (Object.keys(it)) {
          const value = Object.values(it);

          value.forEach((val, index) => {
            // check for Tags
            if (typeof val === 'string' && val.startsWith('&lt;') && val.includes('&lt;/')) {
              const tag = val.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
              const parser = new DOMParser();
              const tagHTML = parser.parseFromString(tag, 'text/html');

              value[index] = tagHTML.body.innerHTML;
            }

            // check for Array
            if (Array.isArray(val)) {
              const arrToStr = val.sort().join('<br>');

              value[index] = arrToStr;
            }
          });

          item.push(value);
        }
      });

      return item;
    },
  },

  methods: {
    sort(items) {
      this.selectedColumn = items;

      // Set the sort direction
      if (this.selectedColumn === this.changedColumn) {
        this.ascending = this.ascending ? !this.ascending : true;
      } else {
        this.ascending = true;
      }

      const sorted = this.tableData.slice().sort((a, b) => {
        const A = a[items];
        const B = b[items];

        // sort Dates
        if ((!Number.isNaN(Date.parse(A)) || !Number.isNaN(Date.parse(B)))
          && (typeof A !== 'number' || typeof B !== 'number')) {
          const dateA = Date.parse(A);
          const dateB = Date.parse(B);
          if (this.ascending) {
            if (dateA > dateB) return 1;
            if (dateA < dateB) return -1;
          } else {
            if (dateA > dateB) return -1;
            if (dateA < dateB) return 1;
          }
          return 0;
        }

        // sort HTML
        if (typeof A === 'string' && A.startsWith('&lt;') && A.includes('&lt;/')) {
          const tagA = A.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
          const tagB = B.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
          const parser = new DOMParser();
          const tagHTMLA = parser.parseFromString(tagA, 'text/html');
          const tagHTMLB = parser.parseFromString(tagB, 'text/html');
          const AinnerText = tagHTMLA.body.innerText;
          const BinnerText = tagHTMLB.body.innerText;

          if (this.ascending) {
            if (AinnerText > BinnerText) return 1;
            if (AinnerText < BinnerText) return -1;
          } else {
            if (AinnerText > BinnerText) return -1;
            if (AinnerText < BinnerText) return 1;
          }
          return 0;
        }

        if (this.ascending) {
          if (A > B) return 1;
          if (A < B) return -1;
        } else {
          if (A > B) return -1;
          if (A < B) return 1;
        }
        return 0;
      });

      this.tableData = sorted;
      return sorted;
    },
  },
};
</script>

<style lang="scss">
  .custom-table {
    font-family: Arial, Helvetica, sans-serif;

    table {
      border-spacing: 0;
      border-collapse: collapse;

      width: 100%;
      text-align: center;


      th, td {
        min-width: 60px;
      }


      th {
        border: 2px solid black;
        padding: 10px;

        cursor: pointer;

        transition: background-color 200ms ease;

        &:hover {
          background: linear-gradient(
            90deg,rgba(14,14,14,1)
            0%,rgba(10,16,18,0.5)
            50%, rgba(15,15,22,1)
            100%);
        }
      }


      td {
        border: 1px solid black;
        padding: 5px;
      }

      a {
        text-decoration: none;
        color: black;

        &:visited {
          color: black;
        }

        &:hover {
          font-weight: 700;
          border-bottom: 2px solid black;
        }
      }
    }

  }
</style>

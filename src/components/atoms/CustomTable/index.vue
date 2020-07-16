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

  props: {
    itemsTable: {
      default: () => [],
    },
  },

  computed: {
    columns() {
      const cols = [];

      this.itemsTable.forEach((item) => {
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

      this.itemsTable.forEach((it) => {
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
              const arrToStr = val.join('<br>');

              value[index] = arrToStr;
            }
          });

          item.push(value);
        }
      });
      console.log(item);
      return item;
    },
  },
};
</script>

<style lang="scss">
  .custom-table {
  }
</style>

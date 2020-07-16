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
      default: '',
    },
  },
};
</script>

<style lang="scss">
  .custom-table {
  }
</style>

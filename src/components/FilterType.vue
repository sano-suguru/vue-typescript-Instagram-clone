<template>
  <div class="filter-type">
    <p>
      {{ filter.name }}
    </p>
    <div class="img"
      :class="filter.name"
      :style="{ backgroundImage: `url(${image})` }"
      @click="selectFilter">
    </div> 
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import IFilter from '../types/filter';
import EventBus from '../event-bus';

@Component
export default class FilterType extends Vue {
  @Prop(Object)
  filter!: IFilter;

  @Prop(String)
  image!: string;

  selectFilter(): void {
    EventBus.$emit('filter-selected', {
      filter: this.filter.name,
    });
  }
}
</script>

<style lang="scss">
.filter-type {
  width: 100px;
  display: inline-block;
  margin: 0 3px;
  p {
    font-size: 11px;
    text-align: center;
    text-transform: capitalize;
    padding-bottom: 5px;
  }
  .img {
    cursor: pointer;
    width: 100px;
    height: 100px;
    background-size: cover;
    background-position: center center;
  }
}

.filter-type:last-child {
  margin-right: 20px;
}
</style>

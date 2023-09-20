<template>
  <div class="page-catalog-containerz">
    <h5 class="tip">{{ catalogTitle }}</h5>
    <ul>
      <template v-for="item in catalog" :key="item.link || item.text">
        <CatalogItem :item="item" />
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePageCatalog, useThemeLocaleData } from '../composables/'
import { CatalogItem } from './CatalogItem'

const catalog = usePageCatalog()
const themeConfig = useThemeLocaleData()

const catalogTitle = computed(() => {
  return themeConfig.value.catalogTitle || '目录'
})
</script>

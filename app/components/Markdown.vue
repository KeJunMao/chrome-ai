<script setup lang="ts">
import { parseMarkdown } from "@nuxtjs/mdc/runtime";
const props = withDefaults(
  defineProps<{
    body?: string;
  }>(),
  {
    body: "",
  }
);

const data = ref();

watch(
  () => props.body,
  async (newVal) => {
    data.value = await parseMarkdown(newVal);
  },
  { immediate: true }
);
</script>

<template>
  <ContentRenderer :value="data">
    <template #empty>
      <p>No content found.</p>
    </template>
  </ContentRenderer>
</template>

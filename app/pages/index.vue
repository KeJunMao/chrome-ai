<script setup>
const input = ref("");
const { data: options } = useAiSessionOptions();
const { data: session, error } = useAiSession(options);
const { send, messages, clear } = useAiChat(session);

function handleSend() {
  if (input.value) {
    send(input.value);
    input.value = "";
  }
}
</script>

<template>
  <div class="h-[100vh] flex flex-col">
    <div
      v-if="error"
      class="backdrop-blur-sm bg-primary/10 inset-0 fixed z-10 flex flex-col items-center justify-center text-center p-4"
    >
      <h2 class="text-5xl font-semibold mb-4">{{ error.message }}</h2>
      <p class="p-4">
        {{ error.stack }}
      </p>
    </div>
    <main
      class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <div class="relative hidden flex-col items-start gap-8 md:flex">
        <fieldset
          class="grid gap-6 rounded-lg border dark:border-gray-800 border-gray-200 p-4 w-full"
        >
          <legend class="-ml-1 px-1 text-sm font-medium">Settings</legend>
          <UFormGroup label="Temperature">
            <UInput
              v-model="options.temperature"
              placeholder="0.8"
              type="number"
            />
          </UFormGroup>
          <UFormGroup label="TopK">
            <UInput v-model="options.topK" placeholder="3" type="number" />
          </UFormGroup>
        </fieldset>
      </div>
      <div
        class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2"
      >
        <UCard
          class="h-full flex flex-col"
          :ui="{
            body: { base: 'flex-1 flex flex-col gap-2 overflow-auto' },
            header: { base: 'flex justify-between' },
          }"
        >
          <template #header>
            <h1>Chrome Built-in AI Playground</h1>
            <UButton
              icon="i-heroicons-chat-bubble-bottom-center-text"
              size="sm"
              color="white"
              square
              variant="solid"
              label="New"
              :disabled="!messages.length"
              @click="clear"
            />
          </template>

          <div
            v-for="(msg, index) in messages"
            :key="msg.id"
            class="flex gap-2 text-sm"
            :class="msg.role === 'user' && 'flex-row-reverse'"
          >
            <UAvatar :alt="msg.role" />
            <div class=" w-fit bg-gray-800 rounded-lg">
              <Markdown :body="msg.content" :key="msg.id" class="p-3"></Markdown>
              <div  class="border-t border-dashed border-primary/30" />
              <pre class="text-xs p-3 text-gray-500 dark:text-gray-400">{{ JSON.stringify(msg, null, 2) }}</pre>
            </div>
          </div>

          <template #footer>
            <UTextarea
              v-model="input"
              :padded="false"
              placeholder="Type your message here..."
              variant="none"
              class="w-full"
              @keydown.enter.prevent="handleSend"
            />
            <div class="flex justify-end">
              <UButton icon="i-heroicons-paper-airplane" @click="handleSend"
                >Send Message</UButton
              >
            </div>
          </template>
        </UCard>
      </div>
    </main>
  </div>
</template>

declare global {
  interface Window {
    ai: any;
  }
}

export const useAiSession = (options?: MaybeRef<any>) => {
  async function createSession() {
    const canCreate = (await window?.ai?.canCreateTextSession()) ?? "no";
    if (canCreate !== "no") {
      asyncData.data.value?.destroy()
      return await window.ai.createTextSession(unref(options));
    }
    throw new Error("Can not create session");

  }

  const asyncData = useAsyncData<any>(createSession, {
    server: false,
    watch: [options],
  });

  return asyncData;
};

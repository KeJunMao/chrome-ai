export default function useAiSessionOptions() {
  return useAsyncData<{
    temperature: number;
    topK: number;
  }>(() => window.ai.defaultTextSessionOptions(), {
    server: false,
    default: () => ({ temperature: 0.8, topK: 3 }),
  });
}

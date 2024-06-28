interface Message {
  role: "user" | "assistant" | "";
  content: string;
  id: string;
}

export function useAiChat(session: MaybeRef<any>) {
  const messages = ref<Message[]>([]);

  function formatMessages() {
    return messages.value
      .map((v) => `${v.content}${v.role === "assistant" ? "<ctrl23>" : ""}`)
      .join("\n");
  }

  function clear() {
    messages.value = [];
  }

  const send = async (message: string) => {
    messages.value.push({
      role: "user",
      content: message,
      id: new Date().toISOString(),
    });

    const index = messages.value.length;
    const stream = await unref(session).promptStreaming(formatMessages());
    const result = {
      role: "assistant" as const,
      content: "",
      id: new Date().toISOString(),
    };
    messages.value.push(result);
    for await (const chunk of stream) {
      // @ts-ignore
      messages.value[index].content = chunk.toString();
    }
  };

  return {
    messages,
    send,
    clear,
  };
}

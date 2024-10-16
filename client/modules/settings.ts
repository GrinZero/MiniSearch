import { addLogEntry } from "./logEntries";
import { isF16Supported } from "./webGpu";

export const defaultSettings = {
  enableAiResponse: true,
  enableWebGpu: true,
  enableImageSearch: true,
  webLlmModelId: isF16Supported
    ? VITE_WEBLLM_DEFAULT_F16_MODEL_ID
    : VITE_WEBLLM_DEFAULT_F32_MODEL_ID,
  wllamaModelId: VITE_WLLAMA_DEFAULT_MODEL_ID,
  cpuThreads: 1,
  searchResultsToConsider: 3,
  systemPrompt: `Provide detailed, step-by-step responses following these guidelines:
- Answer in the same language as the person interacting with you.
- Explain thoroughly and communicate your thought process.
- Keep in mind today's date and time ({{dateTime}}).
- Base your responses on the provided search results and your general knowledge about the topic
- Include additional relevant context, even if not directly requested

Search results:
{{searchResults}}`,
  inferenceType: VITE_DEFAULT_INFERENCE_TYPE,
  openAiApiBaseUrl: "",
  openAiApiKey: "",
  openAiApiModel: "",
  enterToSubmit: true,
};

addLogEntry(
  `Number of logical processors in CPU: ${navigator.hardwareConcurrency ?? "unknown"}`,
);

export type Settings = typeof defaultSettings;

export const inferenceTypes = [
  { value: "browser", label: "Browser-Based" },
  { value: "openai", label: "OpenAI-Compatible API" },
  ...(VITE_INTERNAL_API_ENABLED
    ? [{ value: "internal", label: VITE_INTERNAL_API_NAME }]
    : []),
];

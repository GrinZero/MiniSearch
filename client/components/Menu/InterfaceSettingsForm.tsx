import { usePubSub } from "create-pubsub/react";
import { settingsPubSub } from "../../modules/pubSub";
import {
  Stack,
  Switch,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export function InterfaceSettingsForm() {
  const [settings, setSettings] = usePubSub(settingsPubSub);
  const form = useForm({
    initialValues: settings,
    onValuesChange: setSettings,
  });
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Stack gap="md">
      <Switch
        label="Dark Mode"
        checked={computedColorScheme === "dark"}
        onChange={toggleColorScheme}
        description="Enable or disable the dark color scheme."
      />

      <Switch
        label="Image Search"
        {...form.getInputProps("enableImageSearch", {
          type: "checkbox",
        })}
        description="Enable or disable image search results. When enabled, relevant images will be displayed alongside web search results."
      />

      <Switch
        label="Enter to Submit"
        {...form.getInputProps("enterToSubmit", {
          type: "checkbox",
        })}
        description="Enable or disable using Enter key to submit the search query. When disabled, you'll need to click the Search button or use Shift+Enter to submit."
      />
    </Stack>
  );
}

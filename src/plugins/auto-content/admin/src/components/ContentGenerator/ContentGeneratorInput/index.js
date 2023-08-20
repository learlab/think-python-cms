import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { TextInput } from "@strapi/design-system/TextInput";
import { Stack } from "@strapi/design-system/Stack";
import { Button } from "@strapi/design-system/Button";
import { Textarea } from "@strapi/design-system";
import { auth } from "@strapi/helper-plugin";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import useDebounce from "./useDebounce";

export default function Index({
  name,
  error,
  description,
  onChange,
  value,
  intlLabel,
  options,
  attribute,
}) {
  const { formatMessage } = useIntl();
  //   const [prompt, setPrompt] = useState("");
  const [err, setErr] = useState("");

  const { modifiedData, initialData } = useCMEditViewDataManager();
  const [dynamicZone, index] = name.split(".");
  const debouncedTargetFieldValue = useDebounce(
    modifiedData[dynamicZone][index]["Text"],
    300
  );

  const generateText = async () => {
    // Get the text from the chunk text field in Strapi
    console.log(JSON.stringify({ name, value }));
    try {
      const response = await fetch(`/auto-content/generate-question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getToken()}`,
        },
        body: JSON.stringify({
          text: `${debouncedTargetFieldValue}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const parsedResponse = await response.json().then((res) => {
        console.log(res);
        return res.choices[0].message.content.trim();
      });

      onChange({
        target: { name, value: parsedResponse, type: attribute.type },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const clearGeneratedText = async () => {
    onChange({ target: { name, value: "", type: attribute.type } });
  };

  // for testing
  useEffect(() => {
    console.log(modifiedData);
  }, [modifiedData]);
  // end testing

  return (
    // <Stack spacing={1}>
    //   <TextInput
    //     placeholder="Please write a prompt for content to generate"
    //     label="Prompt"
    //     name="Prompt"
    //     onChange={(debouncedTargetFieldValue) => setPrompt(debouncedTargetFieldValue)}
    //     value={prompt}
    //   />
    <Stack spacing={2}>
      <Textarea
        placeholder="Generated text"
        name="content"
        onChange={(e) =>
          onChange({
            target: { name, value: e.target.value, type: attribute.type },
          })
        }
      >
        {value}
      </Textarea>
      <Stack horizontal spacing={1}>
        <Button onClick={() => generateText()}>Generate</Button>
        <Button variant="secondary" onClick={() => clearGeneratedText()}>
          Clear
        </Button>
      </Stack>
    </Stack>
    // </Stack>
  );
}

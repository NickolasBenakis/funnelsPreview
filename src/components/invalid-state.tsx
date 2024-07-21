import Info from "@/components/info";
import exampleJSON from "@/json/example.json";
import { copyToClipboard, waitFor } from "@/lib/utils";
import React, { useState } from "react";
import { Button } from "./ui/button";

const InvalidState = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const onCopy = async () => {
    setIsError(false);

    try {
      copyToClipboard(JSON.stringify(exampleJSON));
      setIsCopied(true);
      await waitFor(1000);
      setIsCopied(false);
    } catch (_error) {
      setIsError(true);
      await waitFor(1000);
      setIsError(false);
    }
  };

  return (
    <div className="p-4 rounded-md">
      <Info
        heading="Invalid json schema"
        subheading="Try to upload another json, similar to the structure below 👇"
      />
      <div className="relative mx-auto w-[80%] overflow-auto bg-slate-400 p-2">
        <Button
          className="float-right transition-all duration-200"
          variant="default"
          onClick={onCopy}
        >
          {isError ? "Oups, Try again!" : isCopied ? "Copied!" : "Copy"}
        </Button>
        <pre>{JSON.stringify(exampleJSON, null, 2)}</pre>
      </div>
    </div>
  );
};

export default InvalidState;

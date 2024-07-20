import Info from "@/components/info";
import validJsonInputExample from "@/json/example.json";
import React, { Suspense } from "react";
import reactJsonView from "react-json-view-lite";
import { Skeleton } from "./ui/skeleton";

import "react-json-view-lite/dist/index.css";
import dynamic from "next/dynamic";

const InvalidState = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <Info
        heading="Invalid json schema"
        subheading="Try to upload another json, similar to the json below 👇"
      />
      <reactJsonView.JsonView
        data={validJsonInputExample}
        shouldExpandNode={reactJsonView.allExpanded}
        style={reactJsonView.defaultStyles}
      />
    </Suspense>
  );
};

export default InvalidState;

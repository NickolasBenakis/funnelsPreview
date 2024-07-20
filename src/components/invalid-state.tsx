import Info from "@/components/info";
import exampleJSON from "@/json/example.json";
import React, { Suspense } from "react";
import * as reactJsonView from "react-json-view-lite";
import { Skeleton } from "./ui/skeleton";

import "react-json-view-lite/dist/index.css";

const InvalidState = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <Info
        heading="Invalid json schema"
        subheading="Try to upload another json, similar to the json below 👇"
      />
      <reactJsonView.JsonView
        data={exampleJSON}
        shouldExpandNode={reactJsonView.allExpanded}
        style={reactJsonView.darkStyles}
      />
    </Suspense>
  );
};

export default InvalidState;

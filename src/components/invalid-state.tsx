import Info from "@/components/info";
import exampleJSON from "@/json/example.json";
import React from "react";
import * as reactJsonView from "react-json-view-lite";

import "react-json-view-lite/dist/index.css";

const InvalidState = () => {
  return (
    <>
      <Info
        heading="Invalid json schema"
        subheading="Try to upload another json, similar to the json below 👇"
      />
      <div className="mx-auto w-[80%]">
        <reactJsonView.JsonView
          data={exampleJSON}
          shouldExpandNode={reactJsonView.allExpanded}
          style={reactJsonView.darkStyles}
        />
      </div>
    </>
  );
};

export default InvalidState;

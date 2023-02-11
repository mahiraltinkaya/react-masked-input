# react-file-upload

## Install

```sh
npm install @mahiraltinkaya/react-file-upload
```

## Features

- Easy way to upload your files or images by dragging or selecting
- You can use drag and drop files
- You can code your drop frame as a children component.
- You can define maxsimum file sizes
- You can define files limit
- You can define allowed file types.

## Params

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| key          | description                                                                     | required |
| ------------ | ------------------------------------------------------------------------------- | -------- |
| limit        | File counts                                                                     | optional |
| maxsize      | Total files size                                                                | optional |
| multiple     | boolean select only one item                                                    | optional |
| allowedTypes | default types "image/png","image/jpg","image/jpeg","image/webp","image/svg+xml" | optional |
| files        | files variable                                                                  | required |
| setFiles     | setFiles function                                                               | required |

```

import React from "react";

import { UploadContainer } from "@mahiraltinkaya/react-file-input";

function App() {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <div className="App" style={{ padding: 20 }}>
      <UploadContainer
        setFiles={setFiles} // setFiles function
        files={files} // files array
        limit={10}
        maxsize={2} // in MB
        // default allowed types
        allowedTypes={[
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/webp",
          "image/svg+xml",
        ]}
        multiple={false}
      ></UploadContainer>
    </div>
  );
}

export default App;

```

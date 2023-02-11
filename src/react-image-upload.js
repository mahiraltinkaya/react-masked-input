import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const allowedTypes = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
  "image/gif",
];

const ReactImageUpload = ({
  title = "Drag & Drop your files here or click to select files",
  files = [],
  limit,
  setFiles,
  children = null,
  maxsize,
  multiple = true,
}) => {
  const [hightlight, setHightlight] = React.useState(false);
  const dropInput = React.useRef(null);

  const handleEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragOver = (e) => {
    handleEvent(e);
  };

  const onDragEnter = (e) => {
    handleEvent(e);
    setHightlight(true);
  };
  const onDragLeave = (e) => {
    handleEvent(e);
    setHightlight(false);
  };
  const onDrop = (e) => {
    handleEvent(e);
    let dt = e.dataTransfer;

    let fileList = Array.from(dt.files);

    if (fileList.length > 0) {
      setFileObject(fileList);
    }
  };
  const handleInputChange = (e) => {
    const target = e.target;
    let fileList = Array.from(target.files);

    if (fileList.length > 0) {
      setFileObject(fileList);
    }
  };

  const setFileObject = (fileList) => {
    let total = 0;

    if (fileList.length > 0) {
      fileList = [...files, ...fileList].filter((item, index) => {
        total += item.size;
        return (
          (multiple ? true : index === 0) &&
          allowedTypes.includes(item.type) &&
          (limit ? limit > index : true) &&
          (maxsize ? total < maxsize * 1024 * 1024 : true)
        );
      });

      setFiles([...fileList]);
    }

    setHightlight(false);
  };

  const deleteSelectedImage = (index) => {
    const fileList = files.filter((_, i) => i !== index);

    if (dropInput.current) {
      dropInput.current.value = "";
    }

    setFiles(fileList);
  };

  const setPreviewUrl = (file) => {
    return URL.createObjectURL(file);
  };

  return (
    <div className="file__container">
      <div className="file_previews">
        {files.map((item, index) => {
          return (
            <div className="preview" key={index}>
              <img src={setPreviewUrl(item)} alt="" width={120} height={60} />
              <button
                onClick={() => {
                  deleteSelectedImage(index);
                }}
              >
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="red"
                    d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
      <div
        className={"dropzone"}
        onClick={() => dropInput.current?.click()}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {children && children}
        {!children && (
          <div className={hightlight ? `dropline hightlight ` : "dropline"}>
            <svg
              fill="#000000"
              width="50px"
              height="50px"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>ionicons-v5-e</title>
              <path d="M450.29,112H142c-34,0-62,27.51-62,61.33V418.67C80,452.49,108,480,142,480H450c34,0,62-26.18,62-60V173.33C512,139.51,484.32,112,450.29,112Zm-77.15,61.34a46,46,0,1,1-46.28,46A46.19,46.19,0,0,1,373.14,173.33Zm-231.55,276c-17,0-29.86-13.75-29.86-30.66V353.85l90.46-80.79a46.54,46.54,0,0,1,63.44,1.83L328.27,337l-113,112.33ZM480,418.67a30.67,30.67,0,0,1-30.71,30.66H259L376.08,333a46.24,46.24,0,0,1,59.44-.16L480,370.59Z" />
              <path d="M384,32H64A64,64,0,0,0,0,96V352a64.11,64.11,0,0,0,48,62V152a72,72,0,0,1,72-72H446A64.11,64.11,0,0,0,384,32Z" />
            </svg>
            <div className="information">{title}</div>
            <div className="information">
              {maxsize && `max files size ${maxsize} mb.`}
            </div>
          </div>
        )}
        <input
          className="file__input"
          type="file"
          multiple={multiple}
          ref={dropInput}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

PropTypes.ReactImageUpload = {
  title: {
    type: PropTypes.string,
    required: false,
  },
  multiple: {
    type: PropTypes.number,
    required: false,
  },
  limit: {
    type: PropTypes.number,
    required: false,
  },
  maxsize: {
    type: PropTypes.number,
    required: false,
  },
  files: {
    type: PropTypes.array,
    required: true,
  },
  setFiles: {
    type: PropTypes.func,
    required: true,
  },
};

export { ReactImageUpload };

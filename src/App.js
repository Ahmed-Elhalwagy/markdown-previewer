import "./App.css";
import React, { useEffect, useState } from "react";
import { marked } from "marked";
import useLocalStorage from "./useLocalStorage";

const App = () => {
  const [code, setCode] = useState("## Hello");
  const [compiled, setCompiled] = useState('<h2 id="hello">Hello</h2>');

  const [panelActive, setPanelActive] = useState("markdown");
  const [docsData, setdocsData] = useLocalStorage("data", []);

  const openMD = () => {
    setPanelActive("markdown");
    console.log(panelActive);
  };

  const openPreview = () => {
    setPanelActive("preview");
    console.log(panelActive);
  };
  const openDocs = () => {
    setPanelActive("docs");
    console.log(panelActive);
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };

  const toggleActiveStyle = (el) => {
    if (panelActive === el) {
      return "btn active";
    } else {
      return "btn inactive";
    }
  };

  const panelCases = {
    markdown: (
      <div>
        <textarea onChange={handleChange} value={code} />
      </div>
    ),
    preview: (
      <div>
        <textarea value={compiled} />
      </div>
    ),
    docs: (
      <>
        <h1>{docsData}</h1>
      </>
    ),
  };

  // const url = "https://www.markdownguide.org/api/v1/basic-syntax.json";
  const url = "https://dog.ceo/api/breeds/image/random";
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setdocsData(data.message);
    };
    fetchApi();
    console.log(docsData);
  }, []);

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={openMD} className={toggleActiveStyle("markdown")}>
            MarkDown
          </button>
          <button
            onClick={openPreview}
            className={toggleActiveStyle("preview")}
          >
            Preview
          </button>
          <button onClick={openDocs} className={toggleActiveStyle("docs")}>
            Docs
          </button>
        </div>
        <div>{panelCases[panelActive]}</div>
      </div>
    </>
  );
};

export default App;

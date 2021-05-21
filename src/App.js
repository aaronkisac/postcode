import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ComboBox from "./components/ComboBox";
import { fetchData } from "./service/fetchData";
import "./styles.css";

export default function App() {
  const [options, setOptions] = useState([]);

  const isPostCodeValid = async (postcode) => {
    try {
      const res = await fetchData(`${postcode}/validate`);
      !res.result && toast.error("Validation: Postcode is not valid!");
      return res.result;
    } catch (error) {
      toast.error(`Validation: ${error.message}`);
    }
  };

  const getAutoComplete = async (postcode) => {
    try {
      const res = await fetchData(`${postcode}/autocomplete`);
      res?.result?.length &&
        setOptions(res?.result?.map((item) => ({ postcode: item })));
    } catch (error) {
      toast.error(`AutoComplete: ${error.message}`);
    }
  };
  useEffect(() => {
    getAutoComplete();
  }, []);

  return (
    <div className="App">
      <h4>Enter a valid postcode </h4>
      <ComboBox
        options={options}
        getOptions={getAutoComplete}
        isPostCodeValid={isPostCodeValid}
      />
    </div>
  );
}

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
      !res.data.result && toast.error("Validation: Postcode is not valid!");
      return res.data.result;
    } catch (error) {
      toast.error(`Validation: ${error.message}`);
    }
  };

  const getAutoComplate = async (postcode = "sw13") => {
    try {
      const res = await fetchData(`${postcode}/autocomplete`);
      res?.data?.result &&
        setOptions(res?.data?.result?.map((item) => ({ postcode: item })));
    } catch (error) {
      toast.error(`Autocomplate: ${error.message}`);
    }
  };
  useEffect(() => {
    getAutoComplate();
  }, []);

  return (
    <div className="App">
      <h4>Enter a valid postcode </h4>
      <ComboBox
        options={options}
        getOptions={getAutoComplate}
        isPostCodeValid={isPostCodeValid}
      />
    </div>
  );
}

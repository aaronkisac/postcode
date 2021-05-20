import React, { useCallback } from "react";
import { TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useFormik } from "formik";
import * as yup from "yup";
import _ from "lodash";
import { useHistory } from "react-router-dom";

export default function ComboBox({
  options = [],
  getOptions,
  getPostCodeDetails,
  isPostCodeValid
}) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      postcode: ""
    },
    validationSchema: yup.object().shape({
      postcode: yup.string().min(5, "min 5 caracter").max(7, "max 7 caracter")
    }),
    onSubmit: (values) => {
      isPostCodeValid(formik.values.postcode).then(() => {
        history.entries = [];
        history.index = -1;

        history.push(`postcodes/${formik.values.postcode}`);
      });
    }
  });
  const getFilteredOptions = useCallback(
    _.debounce((postcode) => getOptions(postcode), 500),
    []
  );

  const handleFilterOptions = (_, newValue) => {
    formik.setFieldValue("postcode", newValue, true);
    newValue && getFilteredOptions(newValue);
  };
  const handleOnBlur = () => {
    return formik.dirty && formik.handleBlur;
  };
  return (
    <form
      style={{ display: "flex", margin: "20px auto", width: "fit-content" }}
      onSubmit={formik.handleSubmit}
    >
      <Autocomplete
        id="postcode"
        name="postcode"
        options={options}
        getOptionLabel={(option) => option.postcode}
        getOptionSelected={(option) => option.postcode}
        value={formik.values}
        style={{ width: 300, marginRight: "10px" }}
        onInputChange={handleFilterOptions}
        onBlur={handleOnBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Postcode 'SW1A 1AA'"
            variant="outlined"
            error={formik.touched.postcode && Boolean(formik.errors.postcode)}
          />
        )}
      />
      <Button type="submit" variant="contained" size="large" color="primary">
        Submit
      </Button>
    </form>
  );
}

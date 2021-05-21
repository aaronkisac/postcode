import React, { useCallback } from "react";
import { TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useFormik } from "formik";
import * as yup from "yup";
import _ from "lodash";
import { useHistory } from "react-router-dom";

export default function ComboBox({ options, getOptions, isPostCodeValid }) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      postcode: "",
    },
    validationSchema: yup.object().shape({
      postcode: yup
        .string()
        .min(5, "min 5 character")
        .max(8, "max 8 character"),
    }),
    onSubmit: (values) => {
      isPostCodeValid(formik.values.postcode).then((isValid) => {
        if (isValid) {
          history.entries = [];
          history.index = -1;

          history.push(
            `postcodes/${formik.values.postcode.split(" ").join("")}`
          );
        } else {
          formik.errors.postcode = { message: "Invalid Postcode" };
          formik.dirty = true;
          handleOnBlur();
        }
      });
    },
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
      data-testid="comboBoxTestId"
    >
      <Autocomplete
        data-testid="postcode"
        id="postcode"
        name="postcode"
        
        options={options}
        getOptionLabel={(option) => option.postcode}
        getOptionSelected={(option) => option.postcode}
        value={formik.values}
        style={{ width: 300, marginRight: "10px" }}
        onInputChange={handleFilterOptions}
        onBlur={handleOnBlur}
        ListboxProps={{ "data-testid": "list-box" }}
        renderInput={(params) => (
          <TextField
            {...params}
            data-testid="postcodeLabel"
            label="Postcode"
            variant="outlined"
            error={formik.touched.postcode && Boolean(formik.errors.postcode)}
          />
        )}
      />
      <Button
        data-testid="postcodeSubmitButton"
        type="submit"
        variant="contained"
        size="large"
        color="primary"
      >
        Submit
      </Button>
    </form>
  );
}

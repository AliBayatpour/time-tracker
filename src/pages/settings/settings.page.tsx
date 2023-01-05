import { MenuItem, Select } from "@mui/material";
import React from "react";
import { THEME_DATA, THEME_KEYS } from "../../constants/themeNames.constant";

type Form = {
  rest: { value: string; isValid: boolean };
};

// const formInitialState = {
//   rest: { value: "", isValid: false },
// };

type Props = {
  setTheme: (themeName: keyof typeof THEME_DATA) => void;
  themeKey: keyof typeof THEME_DATA;
};
const Settings: React.FC<Props> = ({ setTheme, themeKey }) => {
  // const [form, setForm] = useState<Form>(formInitialState);

  // let formIsValid = false;
  // if (form.rest.isValid) {
  //   formIsValid = true;
  // }

  // const getRestTime = () => {
  //   const localValue = localStorage.getItem("restTime");
  //   return localValue ? localValue : "5";
  // };

  // const onSetRestTime = (event: any) => {
  //   event.preventDefault();
  //   if (!form.rest.isValid) {
  //     return;
  //   }
  //   localStorage.setItem("restTime", form.rest.value);
  // };

  // const validateInput = (inputKey: keyof Form, value: string): boolean => {
  //   switch (inputKey) {
  //     case "rest":
  //       return isNumWithLimit(value);
  //     default:
  //       return false;
  //   }
  // };

  // const changeFormHandler = (key: keyof Form, value: string) => {
  //   setForm((prev) => {
  //     return {
  //       ...prev,
  //       [key]: { value: value, isValid: validateInput(key, value) },
  //     };
  //   });
  // };

  const handleThemeChange = (themeName: any) => {
    console.log(themeName);
  };

  return (
    <>
      <div className="row">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
          onChange={(e) => setTheme(e.target.value as THEME_KEYS)}
          value={themeKey}
          sx={{ select: { color: "primary.contrastText" } }}
          inputProps={{ style: { color: "yellow" } }}
        >
          {(Object.keys(THEME_DATA) as THEME_KEYS[]).map((value) => (
            <MenuItem key={value} value={value}>
              {THEME_DATA[value].label}
            </MenuItem>
          ))}
        </Select>
        {/* <form onSubmit={onSetRestTime}>
          <div className="col-12 col-lg-2">
            <TextField
              type="number"
              label="Rest"
              id="restInput"
              value={form.rest.value}
              onChange={(event) =>
                changeFormHandler("rest", event?.target.value)
              }
              error={!form.rest.isValid}
              defaultValue={getRestTime()}
            />
          </div>
          <div className="col-12">
            <Button
              disabled={!formIsValid}
              type="submit"
              color="primary"
              variant="contained"
              className="mt-3"
            >
              Change rest time
            </Button>
          </div>
        </form> */}
      </div>
    </>
  );
};
export default Settings;

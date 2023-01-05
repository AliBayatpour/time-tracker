import {
  gipsyKing,
  pinkWereWolf,
  pinkyCat,
  powerRangers,
  sandyBeach,
  smokyWinter,
  sunnyNight,
} from "../styles/themes";

export const THEME_DATA = {
  POWER_RANGERS: {
    key: "POWER_RANGERS",
    label: "Power Rangers",
    value: powerRangers,
  },
  SANDY_BEACH: { key: "SANDY_BEACH", label: "Sandy Beach", value: sandyBeach },
  PINKY_CAT: { key: "PINKY_CAT", label: "Pinky Cat", value: pinkyCat },
  GIPSY_KING: { key: "GIPSY_KING", label: "Gipsy King", value: gipsyKing },
  SUNNY_NIGHT: { key: "SUNNY_NIGHT", label: "Sunny Night", value: sunnyNight },
  PINK_WEREWOLF: {
    key: "PINK_WEREWOLF",
    label: "Pink Werewolf",
    value: pinkWereWolf,
  },
  SMOKY_WINTER: {
    key: "SMOKY_WINTER",
    label: "Smoky Winter",
    value: smokyWinter,
  },
};

export type THEME_KEYS = keyof typeof THEME_DATA;
export type THEME_INFO = typeof THEME_DATA[THEME_KEYS];

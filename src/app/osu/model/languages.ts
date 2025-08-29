export const languages = {
    1:"Unspecified",
    2:"English",
    3:"Japanese",
    4:"Chinese",
    5:"Instrumenatal",
    6:"Korean",
    7:"French",
    8:"German",
    9:"Swedish",
    10:"Spanish",
    11:"Italian",
    12:"Russian",
    13:"Polish",
    14:"Other"
} as const;

export type LanguagesEnum = keyof typeof languages;
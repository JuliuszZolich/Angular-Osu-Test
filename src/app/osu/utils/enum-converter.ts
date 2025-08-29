import { genres, GenresEnum } from "../model/genres";
import { languages, LanguagesEnum } from "../model/languages";

export function convertEnumToGenre(genre: GenresEnum): string{
    return genres[genre];
}


export function convertEnumToLanguage(language: LanguagesEnum): string{
    return languages[language];
}

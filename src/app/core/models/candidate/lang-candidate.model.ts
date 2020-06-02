import { Language } from '../language.model';

export class LanguageCandidate {
    public id: number;
    public proficiency: string;
    public language: string | number | Language;
    public resume?: string;

    public constructor() {}
}

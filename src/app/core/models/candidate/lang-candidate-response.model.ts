import { Language } from '../language.model';

export class LanguageCandidateResponse {
    public id: number;
    public proficiency: string;
    public language: Language;

    public constructor() {}
}

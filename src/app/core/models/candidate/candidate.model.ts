import { CandidateLanguage } from './candidateLanguage.model';
import { Resume } from './resume.model';
import { CandidateSkill } from './candidateSkill.model';

export class Candidate {
    public phone: string;
    public photo: string;
    public fullname: string;
    public headline: string;
    public email: string;
    public address: string;
    public twitter: string;
    public github: string;
    public linkedin: string;
    public candidateLanguages: CandidateLanguage[];
    public candidateSkills: CandidateSkill[];
    public resume: Resume;
}

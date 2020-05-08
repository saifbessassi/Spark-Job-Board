import { CandidateLanguage } from './candidateLanguage.model';
import { Resume } from './resume.model';
import { CandidateSkill } from './candidateSkill.model';
import { Picture } from './picture.model';

export class Candidate {
    public phone: string;
    public picture: Picture;
    public fullname: string;
    public email: string;
    public address: string;
    public candidateLanguages: CandidateLanguage[];
    public candidateSkills: CandidateSkill[];
    public resume: Resume;
}

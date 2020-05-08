import { Experience } from './experience.model';
import { Education } from './education.model';
import { Project } from './project.model';
import { Document } from './document.model';
import { LanguageCandidateResponse } from './lang-candidate-response.model';
import { SkillCandidateResponse } from './skill-candidate-response.model';

export class Resume {
    public id: number;
    public description: string;
    public seniorityLevel: string;
    public experiences: Experience[];
    public educations: Education[];
    public projects: Project[];
    public skillsCandidate: SkillCandidateResponse[];
    public languagesCandidate: LanguageCandidateResponse[];
    public cv: Document;
}

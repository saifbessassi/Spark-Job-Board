import { Experience } from './experience.model';
import { Education } from './education.model';
import { Project } from './project.model';
import { Document } from './document.model';
import { LanguageCandidate } from './lang-candidate.model';
import { SkillCandidate } from './skill-candidate.model';

export class Resume {
    public id: number;
    public description: string;
    public seniorityLevel: string;
    public experiences: Experience[];
    public educations: Education[];
    public projects: Project[];
    public skillsCandidate: SkillCandidate[];
    public languagesCandidate: LanguageCandidate[];
    public cv: Document;
}

import { Experience } from './experience.model';
import { Education } from './education.model';
import { Project } from './project.model';

export class Resume {
    public description: string;
    public seniorityLevel: string;
    public experiences: Experience[];
    public educations: Education[];
    public projects: Project[];
}

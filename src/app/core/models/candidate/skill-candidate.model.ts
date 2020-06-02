import { Skill } from '../skill.model';

export class SkillCandidate {
    public id: number;
    public proficiency: string;
    public skill: Skill | string | number;
    public resume?: string;

    public constructor() {}
}

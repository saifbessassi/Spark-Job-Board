import { Skill } from '../skill.model';

export class SkillCandidateResponse {
    public id: number;
    public proficiency: string;
    public skill: Skill;

    public constructor () {}
}

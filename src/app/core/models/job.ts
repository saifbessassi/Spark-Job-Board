import { Skill } from './skill.model';

export class Job {

    public id: number;
    public title: string;
    public location: string;
    public description: string;
    public employmentType: string;
    public seniorityLevel: string;
    public status: string;
    public skills: Skill [];
    public created_at: Date;
    public updated_at: Date;
    public deadline: Date;

    constructor(

    ) {}
}

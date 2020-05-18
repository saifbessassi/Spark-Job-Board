import { Skill } from './skill.model';

export class Job {

    public id: number;
    public title: string;
    public location: string;
    public category: string;
    public description: string;
    public employmentType: string;
    public seniorityLevel: string;
    public status: string;
    public skills: Skill [];
    public createdAt: Date;
    public updatedAt: Date;
    public deadline: Date;

    constructor(

    ) {}
}

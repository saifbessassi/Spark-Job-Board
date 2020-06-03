import { Skill } from './skill.model';
import { Category } from './job/category.model';

export class Job {

    public id: number;
    public title: string;
    public location: string;
    public category: Category | number;
    public description: string;
    public employmentType: string;
    public seniorityLevel: string;
    public status: string;
    public skills: Skill [] | number [];
    public createdAt: Date;
    public updatedAt: Date;
    public deadline: Date;
    public createdBy: string;
    public updatedBy: string;

    constructor(

    ) {}
}

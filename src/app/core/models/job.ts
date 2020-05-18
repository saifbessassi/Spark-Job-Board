import { Skill } from './skill.model';
import { Category } from './job/category.model';

export class Job {

    public id: number;
    public title: string;
    public location: string;
    public category: Category;
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

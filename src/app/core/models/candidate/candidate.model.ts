import { Resume } from './resume.model';
import { Picture } from './picture.model';

export class Candidate {
    public id?: number;
    public phone: string;
    public imageUrl: string;
    public picture: Picture;
    public fullname: string;
    public email: string;
    public address: string;
    public resume: Resume;
}

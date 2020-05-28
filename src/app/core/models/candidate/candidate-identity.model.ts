import { Picture } from './picture.model';

export class CandidateIdentity {

    constructor(
        public fullname: string,
        public email: string,
        public picture: Picture,
        public address: string,
        public phone: string,
        public resume: {
            id: string,
            seniorityLevel: string
        }
    ) {}
}

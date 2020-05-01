export class CandidateIdentity {
    
    constructor(
        public fullname: string,
        public email: string,
        public photo: string,
        public address: string,
        public phone: string,
        public resume: {
            id: string,
            seniorityLevel: string
        }
    ) {}
}
export class Service {
//  {'name':'Test Service', 'completed': '8/10/2019','cost':1000, 'details':'testing how this shows up'},
                  
    constructor(
        public name: string,
        public completed: Date,
        public cost: number,
        public details: string,
        public scheduled: Date,
        public car:number,
	) { }
}
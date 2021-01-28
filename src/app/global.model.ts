export class Global { 
    ID: string;
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
    
    constructor(
        ID: string,
        NewConfirmed: number,
        TotalConfirmed: number,
        NewDeaths: number,
        TotalDeaths: number,
        NewRecovered: number,
        TotalRecovered: number) {
            this.ID=ID,
            this.NewConfirmed=NewConfirmed,
            this.TotalConfirmed=TotalConfirmed,
            this.NewDeaths=NewDeaths,
            this.TotalDeaths=TotalDeaths,
            this.NewRecovered=NewRecovered,
            this.TotalRecovered=TotalRecovered
        }
}
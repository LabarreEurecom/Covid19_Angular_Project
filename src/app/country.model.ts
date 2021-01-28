export class Country{
    uid: string;
    Country: string;
    CountryCode: string;
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;
    Date: string;

    constructor(
        uid: string,
        Country: string,
        CountryCode: string,
        NewConfirmed: number,
        TotalConfirmed: number,
        NewDeaths: number,
        TotalDeaths: number,
        NewRecovered: number,
        TotalRecovered: number,
        Date: string) {
            this.uid=uid;
            this.Country=Country;
            this.CountryCode=CountryCode;
            this.NewConfirmed=NewConfirmed;
            this.TotalConfirmed=TotalConfirmed;
            this.NewDeaths=NewDeaths;
            this.TotalDeaths=TotalDeaths;
            this.NewRecovered=NewRecovered;
            this.TotalRecovered=TotalRecovered;
            this.Date=Date;
        }
}
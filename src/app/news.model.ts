export class News {
    email: string;
    date: Date;
    type: string;
    country_worldwide: string;
    category: string;
    amount: number;

    constructor(
        email: string,
        date: Date,
        type: string,
        country_worldwide: string,
        category: string,
        amount: number
        )
        {
            this.email = email;
            this.date= date;
            this.type = type;
            this.country_worldwide = country_worldwide;
            this.category = category;
            this.amount = amount;
        }
}
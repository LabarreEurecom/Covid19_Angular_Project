import { Component, OnInit } from '@angular/core';
import { Covid19Service } from '../covid19.service';
import { News } from '../news.model';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  date: any;
  type: string;
  country_worldwide: string;
  category: string;
  amount: number;

  constructor(public covid19Service: Covid19Service) { }

  ngOnInit(): void {
  }

  addNews() {
    let news: News = {
      email: this.covid19Service.getUser().email,
      date: new Date(this.date),
      type: this.type,
      country_worldwide: this.country_worldwide,
      category: this.category,
      amount: this.amount
    };
    this.covid19Service.addNews(news);
    this.date = undefined;
    this.type = undefined;
    this.country_worldwide = undefined;
    this.category = undefined;
    this.amount = undefined;
  }
}
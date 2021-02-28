import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Chart from 'chart.js';
import { Covid19Service } from '../covid19.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

    country: any;
    country_Date: any;
    country_Recovered: any;
    country_Deaths: any;
    country_Confirmed: any;
    country_Active: any;
    complete_country_data: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        public covid19Service: Covid19Service
        ) {}
        
        public id: string;
     
        ngOnInit(): void {

         this.id = this.activatedRoute.snapshot.paramMap.get('id'); // get the country name

        this.covid19Service.getCountry(this.id)
        .subscribe((country: any)=>{
            this.country =country;

        // pie chart:
        new Chart('pieChart', {
            type: 'pie',
            data: {
                labels: ["Dead Cases", "Recovered Cases", "Active Cases"],
                datasets: [{
                    data: [
                        country.Country.TotalDeaths,
                        country.Country.TotalRecovered , 
                        country.Country.TotalConfirmed - 
                        country.Country.TotalRecovered
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)', // red 4th nb is for brightness
                        'rgba(54, 162, 235, 0.6)', // blue
                        'rgba(255, 206, 86, 0.6)' // yellow
                    ],
                    borderColor: [
                        'white',
                        'white',
                        'white'
                    ],
                    borderWidth: 1
                }]
            }, 
            options: {
                title:{
                    text:"Corona Virus Cases Distribution in "+this.id+":",
                    display:true, 
                    fontSize: 40,
                    fontColor: 'black'}
            }
        });
    });

    this.covid19Service.getCountryData(this.id)
    .subscribe((complete_country_data: any[])=>{
        this.complete_country_data = complete_country_data;

        this.country_Active = Array(this.complete_country_data.length);
        this.country_Deaths = Array(this.complete_country_data.length);
        this.country_Recovered = Array(this.complete_country_data.length);
        this.country_Confirmed = Array(this.complete_country_data.length);
        this.country_Date = Array(this.complete_country_data.length);

        for (let i=0; i<this.complete_country_data.length; i++) {
            this.country_Active[i] = this.complete_country_data[i].Active;
            this.country_Deaths[i] = this.complete_country_data[i].Deaths;
            this.country_Recovered[i] = this.complete_country_data[i].Recovered;
            this.country_Confirmed[i] = this.complete_country_data[i].Confirmed;
            this.country_Date[i] = this.complete_country_data[i].Date
            .slice(0,10); // To only keep yyyy-mm-dd
        }
        // console.log("Date",this.country_Date) see how the date is displayed
        
        // bar chart:
        new Chart('barChart', {
            type: 'bar',
            data: {
                labels: [
                    this.country_Date[this.country_Date.length-7],
                    this.country_Date[this.country_Date.length-6],
                    this.country_Date[this.country_Date.length-5],
                    this.country_Date[this.country_Date.length-4],
                    this.country_Date[this.country_Date.length-3],
                    this.country_Date[this.country_Date.length-2],
                    this.country_Date[this.country_Date.length-1]
                    ],
                datasets: [
            {
                label: "Daily Deaths",
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                data: [
                    this.country_Deaths[this.country_Deaths.length-7] -
                    this.country_Deaths[this.country_Deaths.length-8],
                    this.country_Deaths[this.country_Deaths.length-6] -
                    this.country_Deaths[this.country_Deaths.length-7],
                    this.country_Deaths[this.country_Deaths.length-5] -
                    this.country_Deaths[this.country_Deaths.length-6],
                    this.country_Deaths[this.country_Deaths.length-4] -
                    this.country_Deaths[this.country_Deaths.length-5],
                    this.country_Deaths[this.country_Deaths.length-3] -
                    this.country_Deaths[this.country_Deaths.length-4],
                    this.country_Deaths[this.country_Deaths.length-2] -
                    this.country_Deaths[this.country_Deaths.length-3],
                    this.country_Deaths[this.country_Deaths.length-1] -
                    this.country_Deaths[this.country_Deaths.length-2]
                ]
                },
            {
                label: "Daily Recovered",
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                data: [
                    this.country_Recovered[this.country_Recovered.length-7] -
                    this.country_Recovered[this.country_Recovered.length-8] ,
                    this.country_Recovered[this.country_Recovered.length-6] -
                    this.country_Recovered[this.country_Recovered.length-7],
                    this.country_Recovered[this.country_Recovered.length-5] -
                    this.country_Recovered[this.country_Recovered.length-6],
                    this.country_Recovered[this.country_Recovered.length-4] -
                    this.country_Recovered[this.country_Recovered.length-5],
                    this.country_Recovered[this.country_Recovered.length-3] -
                    this.country_Recovered[this.country_Recovered.length-4],
                    this.country_Recovered[this.country_Recovered.length-2] -
                    this.country_Recovered[this.country_Recovered.length-3],
                    this.country_Recovered[this.country_Recovered.length-1] -
                    this.country_Recovered[this.country_Recovered.length-2]
                ]
            },
            {
                label: "Daily New Cases",
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                data: [
                    this.country_Active[this.country_Active.length-7] -
                    this.country_Active[this.country_Active.length-8]  ,
                    this.country_Active[this.country_Active.length-6] -
                    this.country_Active[this.country_Active.length-7],
                    this.country_Active[this.country_Active.length-5] -
                    this.country_Active[this.country_Active.length-6],
                    this.country_Active[this.country_Active.length-4] -
                    this.country_Active[this.country_Active.length-5],
                    this.country_Active[this.country_Active.length-3] -
                    this.country_Active[this.country_Active.length-4],
                    this.country_Active[this.country_Active.length-2] -
                    this.country_Active[this.country_Active.length-3],
                    this.country_Active[this.country_Active.length-1] -
                    this.country_Active[this.country_Active.length-2]
                ]
            }
        ]
            }, 
            options: {
                title:{
                    text:"Daily Corona Virus Cases in "+this.id+":",
                    display:true, 
                    fontSize: 40,
                    fontColor: 'black',
                } 
            }
        });

        // line chart:
        new Chart('lineChart', {
            type: 'line',
            data: {
                labels: this.country_Date,
                datasets: [
            {
                label: "Total Deaths",
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                data: this.country_Deaths
                },
            {
                label: "Total Recovered",
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                data: this.country_Recovered
            },
            {
                label: "Total New Cases",
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                data: this.country_Active
            }
        ]
            }, 
            options: {
                title:{
                    text:"Total Corona Virus Cases in "+this.id+":",
                    display:true, 
                    fontSize: 40,
                    fontColor: 'black',
                } 
            }
        });
            });
  }
}
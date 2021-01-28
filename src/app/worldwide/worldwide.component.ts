import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { Country } from '../country.model';
import { Covid19Service } from '../covid19.service';
import { Global } from '../global.model';
import { User } from '../user.model';
import { Worldwide } from '../worldwide.model';


@Component({
  selector: 'app-worldwide',
  templateUrl: './worldwide.component.html',
  styleUrls: ['./worldwide.component.css']
})


export class WorldwideComponent implements OnInit {
    
    user: User;
    complete_globals_data: Global;
    complete_all_data: Worldwide;
    countries: Country[];

    constructor(public covid19Service: Covid19Service) {}

    ngOnInit(): void {

    /**
     * Sorts a HTML table.
     * 
     * @param {HTMLTableElement} table The table to sort
     * @param {number} column The index of the column to sort
     * @param {boolean} asc Determines if the sorting will be in ascending
     */

    function sortTableByColumn(table, column, asc = true) {
        const dirModifier = asc ? 1 : -1;
        const tBody = table.tBodies[0];
        const rows = Array.from(tBody.querySelectorAll("tr"));

        // Sort each row
        const sortedRows = rows.sort((a: any, b: any) => {
            let aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
            let bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

            if (!isNaN(parseFloat(aColText)) && !isNaN(parseFloat(bColText))) {
                aColText = parseFloat(aColText)
                bColText = parseFloat(bColText)
            }

            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
        });

        // Remove all existing TRs from the table
        while (tBody.firstChild) {
            tBody.removeChild(tBody.firstChild);
        }

        // Re-add the newly sorted rows
        tBody.append(...sortedRows);

        // Remember how the column is currently sorted
        table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
        table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc);
        table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc);
    }

    document.querySelectorAll(".table-sortable th").forEach(headerCell => {
        headerCell.addEventListener("click", () => {
            const tableElement = headerCell.parentElement.parentElement.parentElement;
            const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
            const currentIsAscending = headerCell.classList.contains("th-sort-asc");

            sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
        });
    });
        
    this.user = this.covid19Service.getUser();
    this.complete_globals_data = this.covid19Service.getGlobal();
    this.complete_all_data = this.covid19Service.getWorldwideData();

    this.covid19Service.getCountries()
    .subscribe((countries: Country[])=>{
        this.countries = countries;
    });
    
    // pie chart:
    new Chart('pieChart', {
        type: 'pie',
        data: {
            labels: ["Dead Cases", "Recovered Cases", "Active Cases"],
            datasets: [{
                data: [
                    this.complete_globals_data.TotalDeaths,
                    this.complete_globals_data.TotalRecovered , 
                    this.complete_globals_data.TotalConfirmed - 
                    this.complete_globals_data.TotalRecovered
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
                text:"Corona Virus Cases Distribution Worldwide:",
                display:true, 
                fontSize: 40,
                fontColor: 'black'}
        }
    });
    
    // bar chart:
    new Chart('barChart', {
        type: 'bar',
        data: {
            labels: [
                Object.keys(this.complete_all_data.recovered)
                [Object.keys(this.complete_all_data.recovered).length-7],
                Object.keys(this.complete_all_data.recovered)
                [Object.keys(this.complete_all_data.recovered).length-6],
                Object.keys(this.complete_all_data.recovered)
                [Object.keys(this.complete_all_data.recovered).length-5],
                Object.keys(this.complete_all_data.recovered)
                [Object.keys(this.complete_all_data.recovered).length-4],
                Object.keys(this.complete_all_data.recovered)
                [Object.keys(this.complete_all_data.recovered).length-3],
                Object.keys(this.complete_all_data.recovered)
                [Object.keys(this.complete_all_data.recovered).length-2],
                Object.keys(this.complete_all_data.recovered)
                [Object.keys(this.complete_all_data.recovered).length-1]
                ],
            datasets: [
        {
            label: "Total Deaths",
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            data: [
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-7] as number) -
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-8] as number),
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-6] as number) -
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-7] as number),
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-5] as number) -
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-6] as number),
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-4] as number) -
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-5] as number),
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-3] as number) -
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-4] as number),
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-2] as number) -
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-3] as number),
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-1] as number) -
                (Object.values(this.complete_all_data.deaths)
                [Object.values(this.complete_all_data.deaths).length-2] as number)
            ]
            },
        {
            label: "Total Recovered",
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            data: [
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-7] as number) -
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-8]  as number),
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-6] as number) -
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-7]  as number),
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-5] as number) -
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-6]  as number),
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-4] as number) -
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-5]  as number),
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-3] as number) -
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-4]  as number),
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-2] as number) -
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-3]  as number),
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-1] as number) -
                (Object.values(this.complete_all_data.recovered)
                [Object.values(this.complete_all_data.recovered).length-2]  as number)
            ]
        },
        {
            label: "Total New Cases",
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            data: [
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-7] as number) -
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-8] as number),
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-6] as number) -
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-7] as number),
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-5] as number) -
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-6] as number),
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-4] as number) -
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-5] as number),
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-3] as number) -
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-4] as number),
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-2] as number) -
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-3] as number),
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-1] as number) -
                (Object.values(this.complete_all_data.cases)
                [Object.values(this.complete_all_data.cases).length-2] as number)
            ]
        }
    ]
        }, 
        options: {
            title:{
                text:"Daily Corona Virus Cases Worldwide:",
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
            labels: Object.keys(this.complete_all_data.recovered) as any[],
            datasets: [
        {
            label: "Daily Deaths",
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            data: Object.values(this.complete_all_data.deaths) as number[]
            },
        {
            label: "Daily Recovered",
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            data: Object.values(this.complete_all_data.recovered) as number[]
        },
        {
            label: "Daily New Cases",
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            data: Object.values(this.complete_all_data.cases) as number[]
        }
    ]
        }, 
        options: {
            title:{
                text:"Total Corona Virus Cases Worldwide:",
                display:true, 
                fontSize: 40,
                fontColor: 'black',
            } 
        }
    });
}
}
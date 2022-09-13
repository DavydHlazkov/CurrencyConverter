import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExchangeRatesService } from '../services/exchange-rates.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit{
  currencyList = ["UAH", "USD", "EUR", "PLN", "CHF", "GBP", "CAD", "INR", "CNY", "JPY", "AZN" ]
  second:number 
  first:number 
  from = "USD"
  to = "UAH"
  usd:number
  eur:number
  usdRate ="USD"
  eurRate = "EUR"
  rates: {[key : string]: number} = {}
  ratesTo:{[key : string]: number} = {}
  ratesUSD: {[key : string]: number} = {}
  ratesToEUR: {[key : string]: number} = {}
  fromInputControl : FormControl
  toInputControl: FormControl
  fromSelectFormControl: FormControl
  toSelectFormControl:FormControl
  fromToChange:boolean = true

  loadRates(first:boolean){
    this.service.getRates(this.to).subscribe(res => this.ratesTo = res.rates)
    this.service.getRates(this.from).subscribe(res => this.rates = res.rates)
  }

  constructor(private  service:ExchangeRatesService) { 
  }

  ngOnInit(): void {
    this.loadRates(true);
    this.loadRates(false)
    this.fromInputControl = new FormControl()
    this.toInputControl =  new FormControl()
    this.fromSelectFormControl = new FormControl("USD")
    this.toSelectFormControl = new FormControl("UAH")
    this.service.getRates(this.usdRate).subscribe(res => this.ratesUSD = res.rates)
    this.service.getRates(this.eurRate).subscribe(res => this.ratesToEUR = res.rates)


    this.fromSelectFormControl.valueChanges.subscribe((value) => {
    this.from = value
    this.fromInputControl.setValue(parseFloat((this.fromInputControl.value * this.rates[this.from]).toFixed(2)))
    } )

    this.toSelectFormControl.valueChanges.subscribe((value) => {
    this.to = value
    this.toInputControl.setValue(parseFloat((this.fromInputControl.value * this.rates[this.to]).toFixed(2)))
    } )

    this.fromInputControl.valueChanges.subscribe((value) => {
    if(this.fromToChange){
      this.toInputControl.setValue(parseFloat((value * this.rates[this.to]).toFixed(2)))
    }
    })

    this.toInputControl.valueChanges.subscribe((value) => {
    if(this.fromToChange == false){
      this.fromInputControl.setValue(parseFloat((value / this.rates[this.to]).toFixed(2)))
    }
    })
    }

    changeFromToDirection(direction:boolean){
    this.fromToChange = direction;
    }

}

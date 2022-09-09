import { Component, OnInit } from '@angular/core';
import { ExchangeRatesService } from '../services/exchange-rates.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit{
  currencyList : ["UAH", "USD", "EUR"]
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
  
  converter(first: boolean){
    if(first === true){
      this.second = parseFloat((this.first * this.rates[this.to]).toFixed(2))

    }else{
      this.first = parseFloat((this.second * this.ratesTo[this.from]).toFixed(2))
    }
  }

  loadStatic(){
    this.service.getRates(this.usdRate).subscribe(res => this.ratesUSD = res.rates)
    this.service.getRates(this.eurRate).subscribe(res => this.ratesToEUR = res.rates)
}

showRate(){
  this.usd = parseFloat((1 * this.ratesUSD["UAH"]).toFixed(2))
  this.eur = parseFloat((1 * this.ratesToEUR["UAH"]).toFixed(2))
}

  loadRates(first:boolean){
    this.service.getRates(this.from).subscribe(res => this.rates = res.rates)
    this.service.getRates(this.to).subscribe(res => this.ratesTo = res.rates)
    this.converter(first)
  }

getAll():string[]{
  let resultArr :string[] =[]
  let startedArr :string[] =  Object.keys(this.rates)
  for(let i =0; i<startedArr.length; i++){
    if(startedArr[i] == "UAH"){
        resultArr.push(startedArr[i])
      }else if (startedArr[i] == "USD"){
        resultArr.push(startedArr[i])
      }else if (startedArr[i] == "EUR"){
        resultArr.push(startedArr[i])
      }else if (startedArr[i] == "PLN"){
        resultArr.push(startedArr[i])
      }else if (startedArr[i] == "CHF"){
        resultArr.push(startedArr[i])
      }else if (startedArr[i] == "GBP"){
        resultArr.push(startedArr[i])
      }else if (startedArr[i] == "CAD"){
        resultArr.push(startedArr[i])
      }else if (startedArr[i] == "INR"){
        resultArr.push(startedArr[i])
      }else if (startedArr[i] == "CNY"){
        resultArr.push(startedArr[i])
      }else if (startedArr[i] == "JPY"){
        resultArr.push(startedArr[i])
      }else if (startedArr[i] == "AZN"){
        resultArr.push(startedArr[i])
      }
    }
    return resultArr
  }

  constructor(private  service:ExchangeRatesService) { 
  }

  ngOnInit(): void {
    this.loadRates(true);
    this.loadRates(false)
    this.loadStatic()
  }

}

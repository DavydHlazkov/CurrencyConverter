import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ExchangeRatesResponce} from "./payloads/exchange-rates-responce"

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {

  constructor(private  httpClient: HttpClient) { 
    
  }

  getRates(base:string):Observable<ExchangeRatesResponce>{
    return this.httpClient.get<ExchangeRatesResponce>(`https://api.exchangerate.host/latest?base=${base}`)
  }
}
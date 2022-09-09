export interface ExchangeRatesResponce {
    motd: {
        msg: string,
        url:string,
         },
    success: boolean,
    base: string,
    date:string,
    rates: {
        [key:string] : number
    }
}

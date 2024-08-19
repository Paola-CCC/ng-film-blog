import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

constructor() { }

  public converterToFrenchDate(dateStr: string): string {
    const date = new Date(dateStr); 
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateFormatee = date.toLocaleDateString('fr-FR', options);
    return dateFormatee;
  }
}

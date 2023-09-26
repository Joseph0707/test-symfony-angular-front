import { Component, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DecimalPipe],
})
export class DashboardComponent {
  country: Country[] = [];
	countries$: Observable<Country[]>;
	filter = new FormControl('', { nonNullable: true });

  constructor(private countryService: CountryService, pipe: DecimalPipe, private router: Router, private modalService: NgbModal) {
    this.countries$ = this.filter.valueChanges.pipe(
      startWith(''),
      switchMap(text => this.search(text, pipe))
    )
}

navigateTo(id: number) {
  this.router.navigate(['/detailSong/' + id]);
}


search(text: string, pipe: PipeTransform): Observable<Country[]> {
  return this.countryService.fetchCountries().pipe(
    map(countries => {
      console.log({countries})
      if (text.trim() === '') {
        return countries; // Retourne la liste complète des pays si le texte est vide
      }
      return countries.filter((country: any) => {
        const term = text.toLowerCase();

        return (
          country.groupName.toLowerCase().includes(term)
        );
      });
    })
  );
}
open() {
  const modalRef = this.modalService.open(ModalComponent);
  modalRef.componentInstance.inputValue = ''; // Initialiser la valeur si nécessaire

  modalRef.result.then((result) => {
    console.log('Closed with:', result); // Récupérer la valeur de l'input ici
  }, (reason) => {
    console.log('Dismissed with:', reason);
  });
}

}

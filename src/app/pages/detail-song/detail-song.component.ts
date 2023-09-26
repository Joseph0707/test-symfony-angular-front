import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent {
  dataDetail: any;
constructor(private route: ActivatedRoute, private countryService: CountryService, private location: Location) {
  this.getDetail(this.route.snapshot.params["id"]);
}

getDetail(id: string): void {
  this.countryService.fetchCountry(id)
    .subscribe({
      next: (data) => {
        this.dataDetail = data;
      },
      error: (e) => console.error(e)
    });
}
goBack() {
  this.location.back();
}
}

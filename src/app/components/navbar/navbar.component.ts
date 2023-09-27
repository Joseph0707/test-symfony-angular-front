import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private http: HttpClient, private notifier: NotifierService, private router: Router) { }

  uploadFile(event: any) {
    let fileList: FileList = event.target.files;

    if (fileList.length < 1) {
      console.log('return')
      return;
    }

    let file: File = fileList[0];

    this.upload(file).subscribe(() => {
      this.notifier.notify('success', 'Le fichier a bien été sauvegardé.');
      window.location.reload()
    }, () => {
      this.notifier.notify('error', 'Il y a eu un problème.')
    })
  }

  upload(file: File): Observable<any> {
    const formData = new FormData()

    formData.append('file', file, file.name)
    return this.http.post(`${environment.URL_BACKEND}parse-file`, formData)
  }
}

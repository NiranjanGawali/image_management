import { Injectable } from '@angular/core';
import { DataService } from '../shared/data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseURL: any;
  uploadImageURl: any;

  constructor(private dataService: DataService) {
    this.baseURL = environment.apiBase;
    this.uploadImageURl = this.baseURL + 'file';
  }

  uploadFile(files): Promise<any> {

    let data = new FormData();
    for (let i in files) {
      data.append("file", files[i]);
    }

    return new Promise((resolve, reject) => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(<any>JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', this.uploadImageURl, true);
      xhr.send(data);
    });
  }

  // FILE_PATH = ./../../image_management_system/server/images/

  
  getImages() {
    return this.dataService.getService('file');
  }

  deleteImage(id) {
    return this.dataService.deleteService(`file?id=${id}`);
  }
  
}

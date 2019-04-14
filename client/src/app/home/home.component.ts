import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private router: Router) { }

  previewImageArray: any = [];
  imageArray: any = [];
  imgArrayData: any = [];
  imageTypeResult: boolean = false;

  ngOnInit() {
    this.getUploadedImages();
  }

  // image preview
  showPreviewImage(event: any): void {
    let fileLength = event.target.files.length;
    for (let i = 0; i < fileLength; i++) {
      this.imageTypeResult = this.compareFileTypes(event.target.files[i]);
      if (this.imageTypeResult) {
        if (event.target.files && event.target.files[i]) {

          let reader = new FileReader();
          reader.onload = (event: any) => {
            this.previewImageArray.push(event.target.result);
          }
          reader.readAsDataURL(event.target.files[i]);
          // console.log(event.target.files[i]);
          this.imageArray.push(event.target.files[i]);
        }
      } else {
        this.previewImageArray = [];
        this.imageArray = [];
        alert('Please select only image of type jpg,jpeg and png!');
      }
    }
    // console.log(this.previewImageArray);
  }

  // Compare files function
  compareFileTypes(fileName): boolean {
    let fileTypeReturn = false;
    let fileExtension = fileName.name.split('.').pop();

    fileTypeReturn = this.isImage(fileExtension);

    return fileTypeReturn;
  }

  // Image type that we are going to accept
  isImage(extension) {
    switch (extension.toLowerCase()) {
      case 'jpg':
      case 'png':
      case 'jpeg':
        //etc
        return true;
    }
    return false;
  }


  // Remove selected image from previewImageArray
  removeImage(imgIndex): void {
    console.log(imgIndex);
    this.previewImageArray.splice(imgIndex, 1);
  }


  submit(form:NgForm) {
    console.log(this.imageArray);    
    this.homeService.uploadFile(this.imageArray).then((res) => {
      console.log(res);
      if(res.status) {
        this.previewImageArray = [];
        this.getUploadedImages();
        form.resetForm()
      }
    });
      
  }


  // Get uploaded images
  getUploadedImages() {
    this.homeService.getImages().subscribe(
      data => {
        console.log(data);
        if (data.status) {
          this.imgArrayData = data.data;
        }
      },
      err => {
        return console.error(err);
      }
    );
  }

  // Delete images
  deleteImage(img, index) {
    if (confirm("Are you sure to delete " + name)) {
      this.homeService.deleteImage(img._id).subscribe(
        data => {
          console.log(data);
          // if (data.status) {
            this.imgArrayData.splice(index, 1);
          // }
        },
        err => {
          return console.error(err);
        }
      );
    }
  }

}

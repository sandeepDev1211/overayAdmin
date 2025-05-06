import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service'; // Import the BannerService

@Component({
  selector: 'app-banner-upload',
  templateUrl: './banner-upload.component.html',
  styleUrls: ['./banner-upload.component.scss']})
export class BannerUploadComponent implements OnInit {
  selectedFile: File | null = null;
  uploadSuccess = false;
  uploadError = false;
  errorMessage = '';
  banners: any[] = []; // To store the list of banners

  constructor(private bannerService: BannerService) {}

  ngOnInit(): void {
    this.loadBanners(); // Load the banners when the component is initialized
  }

  // Fetch banners from the server
  loadBanners(): void {
    this.bannerService.getBanners().subscribe(
      (response) => {
        this.banners = response; // Update banners list
      },
      (error) => {
        console.error('Error fetching banners:', error);
      }
    );
  }

  // Triggered when the user selects a file
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Triggered when the user clicks the upload button
  uploadBanner(): void {
    if (!this.selectedFile) {
      this.uploadError = true;
      this.errorMessage = 'Please select a file before uploading!';
      return;
    }

    this.bannerService.uploadBanner(this.selectedFile).subscribe(
      (response) => {
        this.uploadSuccess = true;
        this.uploadError = false;
        this.errorMessage = '';
        this.loadBanners(); // Refresh the list after a successful upload
      },
      (error) => {
        this.uploadError = true;
        this.uploadSuccess = false;
        this.errorMessage = `Error uploading banner: ${error.message || 'Unknown error'}`;
      }
    );
  }

  // Delete a banner
  deleteBanner(id: string): void {
    this.bannerService.deleteBanner(id).subscribe(
      (response) => {
        console.log('Banner deleted', response);
        this.loadBanners(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting banner:', error);
      }
    );
  }
}

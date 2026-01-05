import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModalRef, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { ImageService } from '../../services/images.service';

@Component({
  selector: 'noya-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  providers: [ImageService]
})
export class GalleryComponent implements OnInit {
  @ViewChild('imageModal') imageModal!: TemplateRef<any>;
  
  allImages: string[] = [];
  displayedImages: string[] = [];
  loading: boolean = false;
  searchTerm: string = '';
  currentPage: number = 1;
  imagesPerPage: number = 24;
  currentImageIndex: number = 0;
  currentImage: string = '';
  hasMoreImages: boolean = true;
  activeModal: NgbModalRef | null = null;
  error: string | null = null;

  constructor(
    private modalService: NgbModal,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.loadImageUrls();
  }

  loadImageUrls(): void {
    this.loading = true;
    // You can use either a relative path to your assets folder
    // or the absolute path to the file in your project
    const filePath = 'assets/cleaned_urls_extra_good.txt';
    // Alternative: use the file directly from its current location
    // const filePath = 'assets/gallery/cleaned_urls_extra_good.txt';
    
    this.imageService.getImagesFromFile(filePath)
      .pipe(
        catchError(err => {
          console.error('Error loading image URLs:', err);
          this.error = 'Failed to load images. Please try again later.';
          return of([] as string[]);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(images => {
        this.allImages = images;
        if (this.allImages.length > 0) {
          this.loadMoreImages();
        }
      });
  }

  loadMoreImages(): void {
    this.loading = true;
    
    setTimeout(() => { // Simulate network delay
      const startIndex = (this.currentPage - 1) * this.imagesPerPage;
      const endIndex = startIndex + this.imagesPerPage;
      const newImages = this.filterImagesBySearchTerm().slice(startIndex, endIndex);
      
      this.displayedImages = [...this.displayedImages, ...newImages];
      this.hasMoreImages = endIndex < this.filterImagesBySearchTerm().length;
      this.currentPage++;
      this.loading = false;
    }, 500);
  }

  filterImages(): void {
    this.displayedImages = [];
    this.currentPage = 1;
    this.loadMoreImages();
  }

  filterImagesBySearchTerm(): string[] {
    if (!this.searchTerm) {
      return this.allImages;
    }
    
    const term = this.searchTerm.toLowerCase();
    return this.allImages.filter(image => 
      image.toLowerCase().includes(term)
    );
  }

  openImageModal(index: number): void {
    this.currentImageIndex = index;
    this.currentImage = this.displayedImages[index];
    // Pre-emptively load more images when we're close to the end
    if (this.hasMoreImages && this.currentImageIndex >= this.displayedImages.length - 3) {
      this.loadMoreImages();
    }
    // Open the modal using ng-bootstrap
    this.activeModal = this.modalService.open(this.imageModal, { 
      centered: true,
      size: 'xl',
      scrollable: true
    });
  }

  showPreviousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.currentImage = this.displayedImages[this.currentImageIndex];
    }
  }

showNextImage(): void {
  if (this.currentImageIndex < this.displayedImages.length - 1) {
    this.currentImageIndex++;
    this.currentImage = this.displayedImages[this.currentImageIndex];
    
    // Pre-emptively load more images when we're close to the end
    if (this.hasMoreImages && this.currentImageIndex >= this.displayedImages.length - 3) {
      this.loadMoreImages();
    }
  } else if (this.hasMoreImages) {
    // If we're at the end but there are more images to load
    this.loadMoreImages();
    // Wait for the images to load before advancing
    const previousLength = this.displayedImages.length;
    const checkInterval = setInterval(() => {
      if (this.displayedImages.length > previousLength && !this.loading) {
        clearInterval(checkInterval);
        this.currentImageIndex++;
        this.currentImage = this.displayedImages[this.currentImageIndex];
      }
    }, 100);
  }
}
}
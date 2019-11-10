import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from '../services/product.service';
import {ImageService} from '../services/image.service';
import {BaseCartItem, CartService} from 'ng-shopping-cart';
import {MatDialog} from '@angular/material';
import {Category} from '../model/category';
import {AddCategoryComponent} from '../add-category/add-category.component';
import {CategoryDTO} from '../DTO/CategoryDTO';
import {CategoryService} from '../services/category.service';

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() category: Category;
  @Input() isAdmin: boolean;
  selectedFile: ImageSnippet;
  @Output() categoryEdited: EventEmitter<Category> = new EventEmitter<Category>();
  @Output() categoryDelete: EventEmitter<Category> = new EventEmitter<Category>();

  constructor(private productService: ProductService,
              private imageService: ImageService,
              private cartService: CartService<BaseCartItem>,
              private dialog: MatDialog,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.imageService.getCategoryImage(this.category).subscribe(image => {
      this.category.image = image;
    });
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      console.log(this.category.id);
      this.imageService.uploadCategoryImage(this.selectedFile.file, this.category).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        });
    });

    reader.readAsDataURL(file);
  }

  addOrEditCategory(category: Category): void {
    const categoryDTO: CategoryDTO = new CategoryDTO();
    categoryDTO.isEditing = true;
    categoryDTO.category = category;
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '400px',
      data: categoryDTO
    });

    dialogRef.afterClosed().subscribe(editedProduct => {
        if (editedProduct) {
          this.categoryEdited.emit(editedProduct);
        }
      }
    );
  }

  selectImage() {
    document.getElementById('imageInput').click();
  }

  deleteCategory(category: Category) {
    console.log(this.category.id);
    // this.categoryDelete.emit(category);
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }
}

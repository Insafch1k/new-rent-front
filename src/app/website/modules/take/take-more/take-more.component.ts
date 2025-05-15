import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';


@Component({
  selector: 'app-take-more',
  templateUrl: './take-more.component.html',
  styleUrls: ['./take-more.component.scss']
})
export class TakeMoreComponent implements AfterViewInit {
districts = ['Район 1', 'Район 2', 'Район 3'];
  roomCounts = [1, 2, 3, 4, 5];
  city: string = '';
  floorFrom: string = '';
  floorTo: string = '';
  areaFrom: string = '';
  areaTo: string = '';
  rentFrom: string = '';
  rentTo: string = '';
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  selectedItem: string = '';
  isOpen = false;
  selectedDistricts: string[] = [];
  isDistrictOpen = false;
  selectedRoomCounts: number[] = [];
  isRoomCountOpen = false;

  @ViewChild('districtSelect') districtSelect!: ElementRef;
  @ViewChild('roomCountSelect') roomCountSelect!: ElementRef;

  ngAfterViewInit() {
    if (this.districtSelect) {
      this.districtSelect.nativeElement.addEventListener('click', (event: MouseEvent) => {
        event.stopPropagation();
      });
    }
    if (this.roomCountSelect) {
      this.roomCountSelect.nativeElement.addEventListener('click', (event: MouseEvent) => {
        event.stopPropagation();
      });
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.districtSelect.nativeElement.contains(event.target as Node)) {
      this.isDistrictOpen = false;
    }
    if (!this.roomCountSelect.nativeElement.contains(event.target as Node)) {
      this.isRoomCountOpen = false;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: string) {
    this.selectedItem = item;
    this.isOpen = false;
  }

  toggleDistrictDropdown() {
    this.isDistrictOpen = !this.isDistrictOpen;
    if (this.isDistrictOpen) {
      this.isRoomCountOpen = false;
    }
  }

  toggleDistrictSelection(district: string) {
    if (this.selectedDistricts.includes(district)) {
      this.selectedDistricts = this.selectedDistricts.filter(d => d !== district);
    } else {
      this.selectedDistricts.push(district);
    }
  }

  isDistrictSelected(district: string): boolean {
    return this.selectedDistricts.includes(district);
  }

  toggleRoomCountDropdown() {
    this.isRoomCountOpen = !this.isRoomCountOpen;
    if (this.isRoomCountOpen) {
      this.isDistrictOpen = false;
    }
  }

  toggleRoomCountSelection(count: number) {
    if (this.selectedRoomCounts.includes(count)) {
      this.selectedRoomCounts = this.selectedRoomCounts.filter(c => c !== count);
    } else {
      this.selectedRoomCounts.push(count);
    }
  }

  isRoomCountSelected(count: number): boolean {
    return this.selectedRoomCounts.includes(count);
  }

  clearCity() {
    this.city = '';
  }

  clearField(field: keyof TakeMoreComponent) {
    (this as any)[field] = '';
  }

  openDistrictSelect() {
    if (this.districtSelect) {
      this.districtSelect.nativeElement.focus();
      this.districtSelect.nativeElement.click();
    }
  }

  openRoomCountSelect() {
    if (this.roomCountSelect) {
      this.roomCountSelect.nativeElement.focus();
      this.roomCountSelect.nativeElement.click();
    }
  }
}

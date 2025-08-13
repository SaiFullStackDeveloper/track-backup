// Angular Import
import { Component, ElementRef, ViewChild } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';

@Component({
  selector: 'app-default',
  imports: [BarChartComponent, ChartDataMonthComponent, SharedModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  // public method
  @ViewChild('datepickerElem') datepickerElem!: ElementRef;
  @ViewChild('itemTableModal') itemTableModal!: ElementRef;
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private modalService: NgbModal) { }
  openItemModal() {
    this.modalService.open(this.itemTableModal, { size: 'lg' }); // optional size
  }
  ListGroup = [
    {
      name: 'Car Insurance',
      invest: '10-08-2025',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Health Insurance',
      invest: '05-08-2025',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Home Insurance',
      invest: '01-08-2025',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-up',
      color: 'text-danger'
    },
    {
      name: 'Travel Insurance',
      invest: '28-07-2025',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Life Insurance',
      invest: '15-08-2025',
      bgColor: 'bg-light-warning',
      icon: 'ti ti-chevron-up',
      color: 'text-warning'
    },
    {
      name: 'Pet Insurance',
      invest: '20-07-2025',
      bgColor: 'bg-light-info',
      icon: 'ti ti-chevron-up',
      color: 'text-info',
      space: 'pb-0'
    }
  ];


  profileCards = [
    {
      style: 'bg-primary-dark text-white',
      background: 'bg-danger',
      value: '$203k',
      text: 'Net Profit',
      color: 'text-white',
      value_color: 'text-white'
    },
    {
      background: 'bg-warning',
      avatar_background: 'bg-light-warning',
      value: '$550K',
      text: 'Total Revenue',
      color: 'text-warning'
    }
  ];

  profileCard = [
    {
      style: 'bg-danger text-white',       // red background
      background: 'bg-danger',
      value: '$203k',
      text: 'Net Profit',
      color: 'text-white',
      value_color: 'text-white'
    },
    {
      style: 'bg-warning text-dark',              // Yellow background, dark text for contrast
      background: 'bg-warning',                   // For icons or avatars
      avatar_background: 'bg-light-warning',      // Optional: lighter yellow for avatars/icons
      value: '$550K',
      text: 'Total Revenue',
      color: 'text-dark',                         // Use dark text for readability on yellow
      value_color: 'text-dark'                    // Optional: specifically for the value
    }
  ];

  editingIndex: number | null = null;

  expiryItems = [
    {
      category: 'Medicine',
      name: 'Paracetamol 500mg',
      expiryDate: this.toDateStruct('2025-07-15'),
      department: 'Pharmacy',
      editing: false,
    },
    {
      category: 'Food',
      name: 'Instant Noodles',
      expiryDate: this.toDateStruct('2025-06-30'),
      department: 'Kitchen',
      editing: false,
    },
    {
      category: 'Equipment',
      name: 'Oxygen Cylinder',
      expiryDate: this.toDateStruct('2025-08-01'),
      department: 'Emergency',
      editing: false,
    },
    {
      category: 'Stationery',
      name: 'Printer Cartridge',
      expiryDate: this.toDateStruct('2025-05-20'),
      department: 'Admin',
      editing: false,
    },
    {
      category: 'Medical',
      name: 'Insulin Pen',
      expiryDate: this.toDateStruct('2025-06-10'),
      department: 'Pharmacy',
      editing: false,
    },
    {
      category: 'Food',
      name: 'Milk Pack',
      expiryDate: this.toDateStruct('2025-08-05'),
      department: 'Cafeteria',
      editing: false,
    }
  ];

  toggleDatepicker(index: number) {
    this.editingIndex = this.editingIndex === index ? null : index;
  }

  saveDate() {
    // You could persist the change here
    this.editingIndex = null;
  }

  toDateStruct(dateStr: string): NgbDateStruct {
    const date = new Date(dateStr);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  toDate(expiry: NgbDateStruct): Date {
    return new Date(expiry.year, expiry.month - 1, expiry.day);
  }



  selectedIndex: number | null = null;

  toggleDatePicker(index: number) {
    this.selectedIndex = this.selectedIndex === index ? null : index;
    this.expiryItems.forEach((item, i) => item.editing = i === index);
  }

  toDisplayDate(date: NgbDateStruct): string {
    if (!date) return '';
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
  }

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const dateString = input.value; // e.g., "2025-08-11"
    // Example: Parse date string if needed
    // const [year, month, day] = dateString.split('-').map(Number);
    // const dateStruct: NgbDateStruct = { year, month, day };
    console.log('Date changed:', dateString);
  }


  // pagination and infinite scroll
  page = 1;
  pageSize = 5;
  initialDisplayCount = 8; // Show 8 records initially to force scroll
  loadMoreCount = 5; // Load 5 more when scrolling
  currentDisplayCount = 8; // Current number of items being displayed
  isLoading = false; // Loading state for infinite scroll
  filterDate: NgbDateStruct | null = null;

  // All items (expanded to 25 items for demo)
  allExpiryItems = [
    {
      category: 'Medicine',
      name: 'Paracetamol 500mg',
      expiryDate: this.toDateStruct('2025-07-15'),
      department: 'Pharmacy',
      editing: false,
    },
    {
      category: 'Food',
      name: 'Instant Noodles',
      expiryDate: this.toDateStruct('2025-06-30'),
      department: 'Kitchen',
      editing: false,
    },
    {
      category: 'Equipment',
      name: 'Oxygen Cylinder',
      expiryDate: this.toDateStruct('2025-08-01'),
      department: 'Emergency',
      editing: false,
    },
    {
      category: 'Stationery',
      name: 'Printer Cartridge',
      expiryDate: this.toDateStruct('2025-05-20'),
      department: 'Admin',
      editing: false,
    },
    {
      category: 'Medical',
      name: 'Insulin Pen',
      expiryDate: this.toDateStruct('2025-06-10'),
      department: 'Pharmacy',
      editing: false,
    },
    {
      category: 'Food',
      name: 'Milk Pack',
      expiryDate: this.toDateStruct('2025-08-05'),
      department: 'Cafeteria',
      editing: false,
    },
    // Additional 19 items to make 25 total
    {
      category: 'Medicine',
      name: 'Aspirin 100mg',
      expiryDate: this.toDateStruct('2025-09-15'),
      department: 'Pharmacy',
      editing: false,
    },
    {
      category: 'Food',
      name: 'Bread Loaf',
      expiryDate: this.toDateStruct('2025-08-20'),
      department: 'Kitchen',
      editing: false,
    },
    {
      category: 'Equipment',
      name: 'Blood Pressure Monitor',
      expiryDate: this.toDateStruct('2025-12-01'),
      department: 'Medical',
      editing: false,
    },
    {
      category: 'Medicine',
      name: 'Cough Syrup',
      expiryDate: this.toDateStruct('2025-10-15'),
      department: 'Pharmacy',
      editing: false,
    },
    {
      category: 'Food',
      name: 'Canned Beans',
      expiryDate: this.toDateStruct('2026-01-30'),
      department: 'Kitchen',
      editing: false,
    },
    {
      category: 'Stationery',
      name: 'Ink Cartridge',
      expiryDate: this.toDateStruct('2025-11-20'),
      department: 'Admin',
      editing: false,
    },
    {
      category: 'Medical',
      name: 'Glucose Strips',
      expiryDate: this.toDateStruct('2025-09-10'),
      department: 'Lab',
      editing: false,
    },
    {
      category: 'Food',
      name: 'Yogurt Cups',
      expiryDate: this.toDateStruct('2025-08-25'),
      department: 'Cafeteria',
      editing: false,
    },
    {
      category: 'Equipment',
      name: 'Thermometer',
      expiryDate: this.toDateStruct('2025-07-30'),
      department: 'Medical',
      editing: false,
    },
    {
      category: 'Medicine',
      name: 'Vitamin D Tablets',
      expiryDate: this.toDateStruct('2026-02-15'),
      department: 'Pharmacy',
      editing: false,
    },
    {
      category: 'Food',
      name: 'Frozen Vegetables',
      expiryDate: this.toDateStruct('2025-12-30'),
      department: 'Kitchen',
      editing: false,
    },
    {
      category: 'Stationery',
      name: 'Paper Rolls',
      expiryDate: this.toDateStruct('2025-10-20'),
      department: 'Admin',
      editing: false,
    },
    {
      category: 'Medical',
      name: 'Bandages',
      expiryDate: this.toDateStruct('2025-11-10'),
      department: 'Emergency',
      editing: false,
    },
    {
      category: 'Food',
      name: 'Energy Drinks',
      expiryDate: this.toDateStruct('2025-09-05'),
      department: 'Cafeteria',
      editing: false,
    },
    {
      category: 'Equipment',
      name: 'Pulse Oximeter',
      expiryDate: this.toDateStruct('2025-08-15'),
      department: 'Medical',
      editing: false,
    },
    {
      category: 'Medicine',
      name: 'Antibiotics',
      expiryDate: this.toDateStruct('2025-07-25'),
      department: 'Pharmacy',
      editing: false,
    },
    {
      category: 'Food',
      name: 'Cereal Boxes',
      expiryDate: this.toDateStruct('2025-11-30'),
      department: 'Kitchen',
      editing: false,
    },
    {
      category: 'Stationery',
      name: 'Marker Pens',
      expiryDate: this.toDateStruct('2025-12-20'),
      department: 'Admin',
      editing: false,
    },
    {
      category: 'Medical',
      name: 'Surgical Gloves',
      expiryDate: this.toDateStruct('2025-10-05'),
      department: 'Surgery',
      editing: false,
    }
  ];

  filteredItems = this.allExpiryItems.slice(0, this.initialDisplayCount); // Initially show only 5
  fromDate: NgbDateStruct | null = null;
  toDateField: NgbDateStruct | null = null;
  // Converts NgbDateStruct to Date
  ngbToDate(date: NgbDateStruct): Date {
    return new Date(date.year, date.month - 1, date.day);
  }

  // Improved scroll end detection method
  onScrollEnd() {
    console.log('Scroll detected - Current items:', this.filteredItems.length, 'Total items:', this.allExpiryItems.length);
    // Only load more if we haven't reached the end and not currently loading
    if (!this.isLoading && this.filteredItems.length < this.allExpiryItems.length) {
      console.log('Loading more items...');
      this.loadMoreItems();
    }
  }

  // Alternative scroll method with threshold detection
  onScroll(event: Event) {
    console.log('Scroll event triggered');
    const element = event.target as HTMLElement;
    const threshold = 50; // Trigger loading when 50px from bottom
    
    if (element.scrollHeight - element.scrollTop <= element.clientHeight + threshold) {
      if (!this.isLoading && this.filteredItems.length < this.allExpiryItems.length) {
        console.log('Near bottom, loading more items...');
        this.loadMoreItems();
      }
    }
  }

  // Load more items method
  loadMoreItems() {
    if (this.isLoading) return; // Prevent multiple simultaneous loads
    
    console.log('Starting to load more items...');
    this.isLoading = true;
    
    // Simulate loading delay (reduce this in production or remove entirely)
    setTimeout(() => {
      const currentLength = this.filteredItems.length;
      const nextBatch = this.allExpiryItems.slice(currentLength, currentLength + this.loadMoreCount);
      
      console.log('Current length:', currentLength, 'Next batch size:', nextBatch.length);
      
      if (nextBatch.length > 0) {
        this.filteredItems = [...this.filteredItems, ...nextBatch];
        this.currentDisplayCount = this.filteredItems.length;
        console.log('New total items displayed:', this.filteredItems.length);
      }
      
      this.isLoading = false;
    }, 300); // Reduced to 300ms for faster response
  }

  // Reset items to initial state
  resetItems() {
    this.filteredItems = this.allExpiryItems.slice(0, this.initialDisplayCount);
    this.currentDisplayCount = this.initialDisplayCount;
    this.isLoading = false;
  }

  filterTable() {
    if (this.fromDate && this.toDateField) {
      const from = this.ngbToDate(this.fromDate);
      const to = this.ngbToDate(this.toDateField);
      console.log('from and to-->', from, to)

      const filtered = this.allExpiryItems.filter(item => {
        console.log("item expirey date --->", item.expiryDate)
        const itemDate = this.ngbToDate(item.expiryDate);
        return itemDate >= from && itemDate <= to;
      });
      
      // Reset to show only first 5 of filtered results
      this.filteredItems = filtered.slice(0, this.initialDisplayCount);
      this.currentDisplayCount = this.filteredItems.length;
    } else {
      // Reset to initial state when no filter
      this.resetItems();
    }
  }

  selectedDateRange: {startDate: moment.Moment, endDate: moment.Moment} | null = null;

onDateRangeChange(event: {startDate: moment.Moment, endDate: moment.Moment}) {
  console.log('Selected range:', event);
  // event.startDate and event.endDate are moment.js objects
  // Use them to filter your table
}

}

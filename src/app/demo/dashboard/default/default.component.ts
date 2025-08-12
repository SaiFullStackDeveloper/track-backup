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
  @ViewChild('itemTableModal') itemTableModal: any;
  constructor(private modalService: NgbModal) { }
  openItemModal() {
    this.modalService.open(this.itemTableModal, { size: 'lg' }); // optional size
  }
  ListGroup = [
    {
      name: 'Car Insurance',
      profit: '1 Day left',
      invest: '10-08-2025',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Health Insurance',
      profit: '2 days left',
      invest: '05-08-2025',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Home Insurance',
      profit: '10days left',
      invest: '01-08-2025',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-up',
      color: 'text-danger'
    },
    {
      name: 'Travel Insurance',
      profit: '12 days left',
      invest: '28-07-2025',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-down',
      color: 'text-danger'
    },
    {
      name: 'Pet Insurance',
      profit: '30 days left',
      invest: '20-07-2025',
      bgColor: 'bg-light-danger',
      icon: 'ti ti-chevron-up',
      color: 'text-danger',
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

  saveDate(index: number) {
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
    const [year, month, day] = dateString.split('-').map(Number);
    const dateStruct: NgbDateStruct = { year, month, day };
    // use dateStruct
  }


  // pagination

  page = 1;
  pageSize = 5;
  filterDate: NgbDateStruct | null = null;

  filteredItems = [...this.expiryItems];
  fromDate: NgbDateStruct | null = null;
  toDateField: NgbDateStruct | null = null;
  // Converts NgbDateStruct to Date
  ngbToDate(date: NgbDateStruct): Date {
    return new Date(date.year, date.month - 1, date.day);
  }

  filterTable() {
    if (this.fromDate && this.toDate) {
      const from = this.ngbToDate(this.fromDate);
      const to = this.ngbToDate(this.toDateField);
      console.log('from and to-->', from, to)

      this.filteredItems = this.expiryItems.filter(item => {
        console.log("item expirey date --->", item.expiryDate)
        const itemDate = this.ngbToDate(item.expiryDate);
        return itemDate >= from && itemDate <= to;
      });
    } else {
      this.filteredItems = [...this.expiryItems];
    }
  }

  selectedDateRange: {startDate: moment.Moment, endDate: moment.Moment} | null = null;

onDateRangeChange(event: any) {
  console.log('Selected range:', event);
  // event.startDate and event.endDate are moment.js objects
  // Use them to filter your table
}

}

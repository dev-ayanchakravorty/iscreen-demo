import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    trigger('fadeInOut', [  state('void', style({ transform: 'translateX(150px)', opacity: 0 })),  transition('* => void', animate(1000)),]),
  ]
})
export class SidenavComponent implements OnInit{
  selectedBtnId = [];
  chartData = [
    {
      id: 1,
      name: 'Column Chart',
      mat_icon_name: 'bar_chart',
      isSelected: false
    },
    {
      id: 2,
      name: 'Radar Chart',
      mat_icon_name: 'bubble_chart',
      isSelected: false
    },
    {
      id: 3,
      name: 'MultiLine Chart',
      mat_icon_name: 'multiline_chart',
      isSelected: false
    },
    {
      id: 4,
      name: 'Pie Chart',
      mat_icon_name: 'pie_chart',
      isSelected: false
    },
    {
      id: 5,
      name: 'Table Chart',
      mat_icon_name: 'table_chart',
      isSelected: false
    }
  ];
  
  DataSet = [
    {
      Year: 2019,
      Data: [
        {
          Platform : 'Ice Lake',
          SKU: [ 'ICL-S62', 'ICL-H82', 'ICL-G42' ]
        },
        {
          Platform : 'Coffee Lake',
          SKU: [ 'CFL-H82', 'CFL-G42', 'CFL-UN42' ]
        },
      ]
    },
    {
      Year: 2018,
      Data: [
        {
          Platform : 'Kaby Lake',
          SKU: [ 'KBL-S62', 'KBL-H82' ]
        },
        {
          Platform : 'Lake Field',
          SKU: [ 'LKF-UN42', 'LKF-Y22', 'LKF-H82' ]
        }
      ]
    }
  ];
  selectedYears = [];
  selectedPlatforms = [];
  selectedSkus = [];
  selectedChartArray = [];
  filterArray: Object;
  openfilter: boolean = false;
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  bindChart(chart: String,id: number) {
    var index = this.selectedBtnId.indexOf(id);
    if(index > -1) {
      this.selectedBtnId.splice(index,1);
      this.chartData[id - 1].isSelected = false;
      this.selectedChartArray.splice(this.selectedChartArray.findIndex(obj => obj.id == id), 1);
    }
    else {
      this.selectedBtnId.push(id);
      this.chartData[id-1].isSelected = true;
      this.selectedChartArray.push({ id: id, name: chart});
    }
  }

  yearSelected(event)
  {
    if(event.isUserInput) {
      if(event.source.selected) {
        this.selectedYears.push(event.source.value);
      }
      else {
        this.selectedYears.splice(this.selectedYears.indexOf(event.source.value),1);
      }
    }
  }

  platformSelected(event)
  {
    if(event.isUserInput) {
      if(event.source.selected) {
        this.selectedPlatforms.push(event.source.value);
      }
      else {
        this.selectedPlatforms.splice(this.selectedPlatforms.indexOf(event.source.value),1);
      }
    }
  }

  skuSelected(event)
  {
    if(event.isUserInput) {
      if(event.source.selected) {
        this.selectedSkus.push(event.source.value);
      }
      else {
        this.selectedSkus.splice(this.selectedSkus.indexOf(event.source.value),1);
      }
    }
  }

  ApplyFilter() {
    this.filterArray = {
      Years: this.selectedYears,
      Platforms: this.selectedPlatforms,
      Skus: this.selectedSkus,
      Charts: this.selectedChartArray
    }
    this.dataService.getChart(this.selectedChartArray);
    this.dataService.getFilterSelection(this.filterArray);
    this.openfilter = false;
  }

  openSidebar() {
    this.openfilter = !this.openfilter;
  }
}

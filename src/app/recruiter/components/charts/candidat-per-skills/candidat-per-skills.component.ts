import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Colors } from 'ng2-charts';
import { SkillService } from 'src/app/core/services/skill/skill.service';

@Component({
  selector: 'sp-candidat-per-skills',
  templateUrl: './candidat-per-skills.component.html',
  styleUrls: ['./candidat-per-skills.component.scss']
})
export class CandidatPerSkillsComponent{

  data: number[] = [];

  constructor(
    private skillService: SkillService
    ) {}
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartData: ChartDataSets[] = [
    { data: this.data, label: 'Nombre candidat', maxBarThickness: 20 }
  ];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  colors: Colors[] = [
    {
      borderColor: '#fff',
      backgroundColor: 
        '#6c757d'
      ,
    }
  ];

  ngOnInit() {
    this.skillService.getNbCandidatePerSkill().subscribe(
      res => {
        for (const key of Object.keys(res)) {
          this.data.push(res[key]);
          this.barChartLabels.push(key);
        }
      }
    );
  }
}

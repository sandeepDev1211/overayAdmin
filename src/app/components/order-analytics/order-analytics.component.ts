import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-order-analytics',
  templateUrl: './order-analytics.component.html',
  styleUrls: ['./order-analytics.component.scss'],
})
export class OrderAnalyticsComponent implements OnInit {
  summary: any = {};
  statusBreakdown: any[] = [];
  monthlyRevenue: any[] = [];

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.analyticsService.getOrderAnalytics().subscribe({
      next: (data) => {
        this.summary = data.summary;
        this.statusBreakdown = data.statusBreakdown;
        this.monthlyRevenue = data.monthlyRevenue;
      },
      error: (err) => {
        console.error('Failed to fetch analytics:', err);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Tool } from '../../models';

@Component({
  selector: 'app-tools',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="tools" id="tools">
      <div class="container">
        <h2 class="section-title">Tools & Systems</h2>
        <p class="section-subtitle">Proficient in the platforms that power modern businesses</p>
        <div class="tools-grid">
          <div class="tool-card" *ngFor="let tool of (tools.length ? tools : fallbackTools); let i = index" [class.highlight]="i === 0">
            <span class="tool-name">{{ tool.name }}</span>
            <span class="tool-category">{{ tool.category }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .tools { background: #f8faff; padding: 100px 0; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
    .section-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(2rem, 4vw, 2.8rem);
      color: #0f1e47;
      text-align: center;
      margin-bottom: 12px;
    }
    .section-subtitle { color: #6b7a99; text-align: center; margin-bottom: 60px; }
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .tool-card {
      background: white;
      border: 2px solid #e8edff;
      border-radius: 12px;
      padding: 24px 20px;
      text-align: center;
      transition: all 0.2s ease;
      cursor: default;
      &:hover {
        border-color: #1a2f6b;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(26,47,107,0.08);
      }
      &.highlight { border-color: #1a2f6b; background: white; }
    }
    .tool-name {
      display: block;
      font-family: 'DM Serif Display', serif;
      font-size: 1.05rem;
      color: #1a2f6b;
      margin-bottom: 4px;
    }
    .tool-category {
      display: block;
      font-size: 0.8rem;
      color: #6b7a99;
    }
    @media (max-width: 768px) {
      .tools-grid { grid-template-columns: repeat(2, 1fr); }
      .container { padding: 0 20px; }
    }
  `]
})
export class ToolsComponent implements OnInit {
  tools: Tool[] = [];
  fallbackTools = [
    { name: 'Google Workspace', category: 'Productivity' },
    { name: 'Microsoft 365', category: 'Productivity' },
    { name: 'Slack', category: 'Communication' },
    { name: 'Zoom', category: 'Communication' },
    { name: 'Trello', category: 'Project Management' },
    { name: 'Asana', category: 'Project Management' },
    { name: 'Notion', category: 'Organization' },
    { name: 'ClickUp', category: 'Project Management' },
    { name: 'CRM Tools', category: 'Customer Management' },
  ];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTools().subscribe({ next: t => this.tools = t, error: () => {} });
  }
}

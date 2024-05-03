import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [MatToolbarModule, 
            MatDivider],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})

export class BreadcrumbComponent implements OnInit {

  currentPathTitle: string = "";
  currentPathSubtitle: string = "";

  constructor(private _activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void {
    this.currentPathTitle = this._activatedRoute.snapshot.data['title'];
    this.currentPathSubtitle = this._activatedRoute.snapshot.data['subtitle'];
  }

}
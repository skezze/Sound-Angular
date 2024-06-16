// home.component.ts
import { Component, OnInit } from '@angular/core';
import { Sound } from '../../models/Sound';
import { DataAccesService } from '../../services/data-acces.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  sounds: Sound[] = [];

  constructor(private dataAcces: DataAccesService) {}

  ngOnInit(): void {
    this.fetchSounds();
  }

  fetchSounds(): void {
    this.dataAcces.getSounds().subscribe(
      (data: Sound[]) => {
        this.sounds = data;
      },
      (error) => {
        console.error('Error fetching sounds:', error);
      }
    );
  }
}

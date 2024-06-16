import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audio-item',
  templateUrl: './audio-item.component.html'
})
export class AudioItemComponent implements OnInit, OnDestroy {
  @Input() name: string = '';
  @Input() src: string = '';

  isPlaying: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.playerService.currentTrack$.subscribe(currentTrack => {
        this.isPlaying = currentTrack === this.src && this.playerService.isPlaying;
      })
    );
    this.subscriptions.add(
      this.playerService.isPlaying$.subscribe(isPlaying => {
        this.isPlaying = this.playerService.currentTrack === this.src && isPlaying;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  togglePlay(): void {
    this.playerService.togglePlayPause(this.src);
  }
  
}

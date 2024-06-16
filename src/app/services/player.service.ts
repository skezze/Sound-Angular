import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private audio = new Audio();
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private currentTrackSubject = new BehaviorSubject<string>('');

  isPlaying$ = this.isPlayingSubject.asObservable();
  currentTrack$ = this.currentTrackSubject.asObservable();

  get isPlaying(): boolean {
    return this.isPlayingSubject.value;
  }

  get currentTrack(): string {
    return this.currentTrackSubject.value;
  }

  playTrack(src: string): void {
    if (this.currentTrack !== src) {
      this.audio.src = src;
      this.audio.load();
      this.currentTrackSubject.next(src);
    }
    this.audio.play();
    this.isPlayingSubject.next(true);
  }

  pauseTrack(): void {
    this.audio.pause();
    this.isPlayingSubject.next(false);
  }

  togglePlayPause(src: string): void {
    if (this.currentTrack === src && this.isPlaying) {
      this.pauseTrack();
    } else {
      this.playTrack(src);
    }
  }
}

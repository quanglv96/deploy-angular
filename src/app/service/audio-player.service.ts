import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Songs} from "../model/Songs";

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  songOfPageId?: number
  songOfBarId?: number
  playlistOfPageId?: number;
  playlistOfBarId?: number;
  songChange = new Subject<{song: Songs, source: string}>()
  playlistChange = new Subject<{id: number | undefined, playlist: Songs[]}>()
  playState = new Subject<string>()
  fastForwardPos = new Subject<{source: string, pos: number}>()
  loadSongOfBarComplete = false;
  loadSongOfBarChange = new Subject()
  loadSongOfPlaylistComplete = false;
  loadSongOfPageChange = new Subject()
  currentTimeOfBar = new Subject();
  loadStateChange = new Subject<string>()
  nextChange = new Subject<{state: string, id: number}>()
  activePage: string = 'none'
  action:string = ''

  constructor() { }

  compareSong() {
    return this.songOfPageId === this.songOfBarId
  }

  comparePlayList() {
    return this.playlistOfBarId === this.playlistOfPageId
  }
}

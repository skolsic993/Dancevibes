import { Pipe, PipeTransform } from '@angular/core';
import { Playlist } from './../Models/playlist.model';

@Pipe({
  name: 'randomize',
})
export class RandomElementPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): Playlist {
    return value && value[Math.floor(Math.random() * value.length)];
  }
}

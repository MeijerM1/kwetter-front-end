import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private wsUri = 'ws://localhost:8080/tweets';

  constructor() {
  }
}

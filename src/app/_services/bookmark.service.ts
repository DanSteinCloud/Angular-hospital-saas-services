import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bookmark } from '../_models/BookmarkExemple';
import { CrudService } from './crud.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookmarkService extends CrudService<Bookmark, number>
{


  constructor(protected _http: HttpClient) {
    super(_http, environment.baseUrl + '/patients');
  }

}

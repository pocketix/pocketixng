/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { Group } from '../models/group';

@Injectable({
  providedIn: 'root',
})
export class GroupService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getGroup
   */
  static readonly GetGroupPath = '/groups/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGroup$Response(params: {
    id: number;
    includeDevices?: boolean;
  }): Observable<StrictHttpResponse<Group>> {

    const rb = new RequestBuilder(this.rootUrl, GroupService.GetGroupPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('includeDevices', params.includeDevices, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Group>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGroup(params: {
    id: number;
    includeDevices?: boolean;
  }): Observable<Group> {

    return this.getGroup$Response(params).pipe(
      map((r: StrictHttpResponse<Group>) => r.body as Group)
    );
  }

  /**
   * Path part for operation updateGroup
   */
  static readonly UpdateGroupPath = '/groups/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateGroup$Response(params: {
    id: number;
    body: Group
  }): Observable<StrictHttpResponse<Group>> {

    const rb = new RequestBuilder(this.rootUrl, GroupService.UpdateGroupPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Group>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateGroup(params: {
    id: number;
    body: Group
  }): Observable<Group> {

    return this.updateGroup$Response(params).pipe(
      map((r: StrictHttpResponse<Group>) => r.body as Group)
    );
  }

  /**
   * Path part for operation deleteGroup
   */
  static readonly DeleteGroupPath = '/groups/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGroup$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, GroupService.DeleteGroupPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGroup(params: {
    id: number;
  }): Observable<void> {

    return this.deleteGroup$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAllGroups
   */
  static readonly GetAllGroupsPath = '/groups';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllGroups()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGroups$Response(params?: {
    includeDevices?: boolean;
  }): Observable<StrictHttpResponse<Array<Group>>> {

    const rb = new RequestBuilder(this.rootUrl, GroupService.GetAllGroupsPath, 'get');
    if (params) {
      rb.query('includeDevices', params.includeDevices, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Group>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllGroups$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGroups(params?: {
    includeDevices?: boolean;
  }): Observable<Array<Group>> {

    return this.getAllGroups$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Group>>) => r.body as Array<Group>)
    );
  }

  /**
   * Path part for operation createGroup
   */
  static readonly CreateGroupPath = '/groups';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createGroup$Response(params: {
    body: Group
  }): Observable<StrictHttpResponse<Group>> {

    const rb = new RequestBuilder(this.rootUrl, GroupService.CreateGroupPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Group>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createGroup(params: {
    body: Group
  }): Observable<Group> {

    return this.createGroup$Response(params).pipe(
      map((r: StrictHttpResponse<Group>) => r.body as Group)
    );
  }

}

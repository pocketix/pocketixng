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

import { Program } from '../models/program';
import { Version } from '../models/version';

@Injectable({
  providedIn: 'root',
})
export class ProgramService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getProgram
   */
  static readonly GetProgramPath = '/programs/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProgram()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProgram$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Program>> {

    const rb = new RequestBuilder(this.rootUrl, ProgramService.GetProgramPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Program>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProgram$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProgram(params: {
    id: number;
  }): Observable<Program> {

    return this.getProgram$Response(params).pipe(
      map((r: StrictHttpResponse<Program>) => r.body as Program)
    );
  }

  /**
   * Path part for operation getProgramOfGroup
   */
  static readonly GetProgramOfGroupPath = '/programs/ofGroup/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProgramOfGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProgramOfGroup$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<Array<Program>>> {

    const rb = new RequestBuilder(this.rootUrl, ProgramService.GetProgramOfGroupPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<Program>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getProgramOfGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProgramOfGroup(params: {
    id: number;
  }): Observable<Array<Program>> {

    return this.getProgramOfGroup$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Program>>) => r.body as Array<Program>)
    );
  }

  /**
   * Path part for operation createProgram
   */
  static readonly CreateProgramPath = '/programs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProgram()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProgram$Response(params: {
    body: {
'groupId': number;
'data': any;
}
  }): Observable<StrictHttpResponse<Program>> {

    const rb = new RequestBuilder(this.rootUrl, ProgramService.CreateProgramPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Program>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createProgram$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProgram(params: {
    body: {
'groupId': number;
'data': any;
}
  }): Observable<Program> {

    return this.createProgram$Response(params).pipe(
      map((r: StrictHttpResponse<Program>) => r.body as Program)
    );
  }

  /**
   * Path part for operation prototypeRunProgram
   */
  static readonly PrototypeRunProgramPath = '/programs/prototype/run';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `prototypeRunProgram()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  prototypeRunProgram$Response(params: {
    body: Array<any>
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ProgramService.PrototypeRunProgramPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `prototypeRunProgram$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  prototypeRunProgram(params: {
    body: Array<any>
  }): Observable<any> {

    return this.prototypeRunProgram$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation v1RunProgram
   */
  static readonly V1RunProgramPath = '/programs/v1/run';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v1RunProgram()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v1RunProgram$Response(params: {
    body: {
}
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ProgramService.V1RunProgramPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v1RunProgram$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v1RunProgram(params: {
    body: {
}
  }): Observable<any> {

    return this.v1RunProgram$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getMetaLanguage
   */
  static readonly GetMetaLanguagePath = '/programs/meta/{version}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getMetaLanguage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMetaLanguage$Response(params: {
    version: Version;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ProgramService.GetMetaLanguagePath, 'get');
    if (params) {
      rb.path('version', params.version, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getMetaLanguage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getMetaLanguage(params: {
    version: Version;
  }): Observable<any> {

    return this.getMetaLanguage$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}

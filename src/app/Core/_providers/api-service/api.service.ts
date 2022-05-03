import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, fromEvent, merge, Observable, Observer } from 'rxjs';
import { Socket } from 'ngx-socket-io';

const headersData ={ headers: new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  decodedToken: any;

  public obj: any = [];

  constructor(private http: HttpClient,public socket:Socket) { 

  }

  socketopen() {
    this.socket.connect();
  }

  socketclose(){
    this.socket.disconnect();
  }

  
  public sendMessage(message:any) {
    this.socket.emit('sendMessage', message);
  }


  public getmessages = () => {

    return new Observable((observer:any) => {

      this.socket.fromEvent('sendMessage').subscribe((message: any) => {

        observer.next(message);

      });

    });

  };

  public signIn(){
    this.socket.emit('signIn', '');
  }
  
  public endChat(endchat:any){
      this.socket.emit('endChat', endchat);
  }

  public getendChatmessage(){

    return new Observable((observer:any) => {

      this.socket.fromEvent('endChat').subscribe((message: any) => {

        observer.next(message);

      });

    });
  }

  public getpickmessages = () => {

    return new Observable((observer:any) => {

      this.socket.fromEvent('pickEvent').subscribe((message: any) => {

        observer.next(message);

      });

    });

  };

   // typeMessage method
   public typeMessage(message:any){
    this.socket.emit('typeMessage', message);
   }

   public gettypeMessage = () => {

    return new Observable((observer:any) => {

      this.socket.fromEvent('typeMessage').subscribe((message: any) => {

        observer.next(message);

      });

    });

  };

  //updatedepartments
  public updatedepartments(message:any){
    this.socket.emit('custdept', message);
  }

  public removeUsers = () => {

    return new Observable((observer:any) => {

      this.socket.fromEvent('removeUsers').subscribe((message: any) => {

        observer.next(message);

      });

    });

  };

  createOnline$() {

    return merge<any>(

      fromEvent(window, 'offline').pipe(map(() => false)),

      fromEvent(window, 'online').pipe(map(() => true)),

      new Observable((sub: Observer<boolean>) => {

      sub.next(navigator.onLine);

      sub.complete();

      }));

    }


  public guestname(message:any){
    this.socket.emit('guestname', message);
  }

  public Updateguestname = () => {

    return new Observable((observer:any) => {

      this.socket.fromEvent('guestname').subscribe((message: any) => {

        observer.next(message);

      });

    });

  };



  private mouseIcon = new BehaviorSubject<any>({
    obj: '',
  });

selectMouse(data: any) {

    this.mouseIcon.next(data);
  }

  getMouseValue() {
    return this.mouseIcon.asObservable();
  }


  
  postmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.post(`${environment.apiUrl}${endpoint}`, obj)
    .pipe(map(
      (res: any) => {
      return res;
    }));
    }


  putmethod(endpoint: string, obj: object): Observable<any> {
    return this.http.put(`${environment.apiUrl}${endpoint}`, obj)
    .pipe(map(
      (res: any) => {
      return res;
    }));
    }

    deletemethod(endpoint:string,obj:object): Observable<any>{
      return this.http.request('delete',`${environment.apiUrl}${endpoint}`, {body : obj})
      .pipe(map(
        (res: any) => {
        return res;
      }));
    }

      

       
                 
}

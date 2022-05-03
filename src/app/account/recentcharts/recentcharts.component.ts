import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recentcharts',
  templateUrl: './recentcharts.component.html',
  styleUrls: ['./recentcharts.component.scss']
})
export class RecentchartsComponent implements OnInit {
  @ViewChild('scrollMe1') private myScrollContainer: ElementRef;
  scrolltop1:number=0;
  recentcharts:any;
  usercharts:any;
  Totalcharts=false;
  particularchart=false;
  gback=true;
  glist=false;
  rightmessages:any;
  rowno:number=0;
  Convid:any;
  imgpath: any;
  constructor( private Api :ApiService) {
    this.imgpath = environment.ImageUrl;
   }

  ngOnInit(): void {
    this.getrecentcharts();
  }

  getrecentcharts(){
    const obj={
      "userid":localStorage.getItem('userId'),
      "expression":""
  }
    this.Api.postmethod('GetConvInfoCust',obj).subscribe(res=>{
      if(res.status==200)
      {
       this.recentcharts=res.response;
       this.Totalcharts=true;
       this.particularchart=false;
      }
   });
   }

  messageclick(conid:any){
    this.Convid=conid;
      let obj = {
        "MSG_ID":0,  
        "CONV_ID": conid, 
        "Count": 0,
        "user_id":localStorage.getItem('userId'), 
        "Conv_type":"I", 
        "Expression": "", 
        "from":"F" 
      }
        this.Api.postmethod('GetMessengerFeeds',obj).subscribe(res=>{
          if(res.response!=null){ 
            this.rowno=Number(res.response.Msgfeeds.feed[res.response.Msgfeeds.feed.length-1].RowNo.toString());             
          this.convertdata(res.response.Msgfeeds.feed.reverse());                        
        }
        });
   }

   convertdata(data:any){
    this.rightmessages=[];
    this.gback=false;
    this.glist=true;
    this.usercharts=[];
    this.Totalcharts=false;
    this.particularchart=true;
    this.rightmessages=Object.keys(data).map((it:any) =>{
      let obj2 = {
        MSG_ID:data[it].MSG_ID[0],
        MSG_TYPE: data[it].MSG_TYPE[0],
        MSG_FROM:data[it].MSG_from[0],
        FromUserName: data[it].FromUserName[0],
        MSG_CREATEDTS: data[it].MSG_CREATEDTS[0],
        MSG_DESC: data[it].MSG_DESC[0],  
        MSGFILE: data[it].MSGFILE,
        MSG_FILETYPE:data[it].MSG_FILETYPE           
      };      
      return obj2;
    });
    this.rightmessages.filter((item:any)=>{
      this.usercharts.push(item);  
    });
    this.scrolltop1=0;
    setTimeout(() => { this.scrolltop1 = this.myScrollContainer.nativeElement.scrollHeight; }, 500);  
  }

   onScroll1(){
    let obj = {
      "MSG_ID":0,  
      "CONV_ID": this.Convid, 
      "Count": this.rowno,
      "user_id":localStorage.getItem('userId'), 
      "Conv_type":"I", 
      "Expression": "", 
      "from":"F" 
    }
      this.Api.postmethod('GetMessengerFeeds',obj).subscribe(res=>{
        if(res.response!=null){  
       this.rowno=Number(res.response.Msgfeeds.feed[res.response.Msgfeeds.feed.length-1].RowNo.toString()); 
        let data:any;
        data= res.response.Msgfeeds.feed;          
        this.rightmessages=[];
        this.rightmessages=Object.keys(data).map((it:any) =>{
          let obj3 = {
            MSG_ID:data[it].MSG_ID[0],
            MSG_TYPE: data[it].MSG_TYPE[0],
            MSG_FROM:data[it].MSG_from[0],
            FromUserName: data[it].FromUserName[0],
            MSG_CREATEDTS: data[it].MSG_CREATEDTS[0],
            MSG_DESC: data[it].MSG_DESC[0],
            MSGFILE: data[it].MSGFILE,
            MSG_FILETYPE:data[it].MSG_FILETYPE             
          };      
          return obj3;
        });
        this.rightmessages.filter((item:any)=>{
          this.usercharts.unshift(item);      
        });                           
      }
      });
   }

   getback(){
    this.Api.selectMouse('E');
   }

   getlist(){
    this.glist=false;
    this.gback=true;
    this.particularchart=false;
    this.Totalcharts=true;
   }


}

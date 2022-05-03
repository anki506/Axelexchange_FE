import { Component, ElementRef, OnInit, ViewChild}  from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Core/_providers/api-service/api.service';
//import { CookieService } from 'ngx-cookie-service'; 
import {PipesModule} from '../../Core/_pipes/pipes.module';
import { environment } from 'src/environments/environment';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','./Login2.scss'],
  providers:[PipesModule]
})
export class LoginComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('usermessage') userMessage:any;
  @ViewChild('chatmessage') chatmessage:any;
    scrolltop:number=0;
    Strform:FormGroup;
    guestform:FormGroup;
    submitted = false;
    signclick = false;
    guestclick=false;
    registerclick=false;
    homeclick=false;
    loginuser:any='';
    form: FormGroup;
    ptags:any=[];
    Conversationid:any=0;
    ReceiverId:any=0;
    senderId:any=0;
    tagid:any=0;
    messengerfeed:any=[];
    messages:any=[];
    msg:any=[];
    lmsgid:number=0;
    urlId:any;
    storeId:any;
    storeName:any;
    isButtonVisible = true;
    isButtonEnd=true;
    timeNow:any;
    isSignoutVisible=true;
    registerloading=false;
    guestloading=false;
    signloading=false;
    issignUpbutton=false;
    isfooter=false;
    reccharts=false;
    endconversation=false;
    signoff=false;
    newregister=false;
    nologinuser=false;
    inactiveuser:number=0;
    ischatbubble=false;
    entertext=false;
    singup:string;
    convhistory=false;
    isStartNew=false;
    startnewconv=false;
    display='A';
    logindisplay=true;
    rowno:number=0;
    rightmessages:any;
    imgpath:any;
    guestwithoutname=true;
    audio:any;
    homeTitle=false;
    homedept=false;
    guesthomeclick=false;
    guesthform:FormGroup;
    guesthloading=false;
    something:any='';
    audioflag:number=0;
    sourceid:number=0;
    hitsource:number=0;
    agentstatus=false;
    uniqueid:any;
  constructor(private router: Router,
    private route: ActivatedRoute,private formBuilder: FormBuilder,
    private Api :ApiService, private toaster: Toaster
    )
  {
    this.route.paramMap.subscribe(params => {
      this.uniqueid = params.get('id');
  });
    {   
      this.Strform = this.formBuilder.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['', [Validators.required]]
    });    

  this.guestform = this.formBuilder.group({
    action:['A'],
    userid:[''],
    username: ['', [Validators.required,]],
    email:[''],
    password: [''], 
    storeid:[''],
    phonenumber:['',[Validators.pattern("[0-9 ]{10}")]]
}); 

this.guesthform= this.formBuilder.group({
  id:[''],
  name: ['', [Validators.required,]],
  phno:['',[Validators.pattern("[0-9 ]{10}")]],
  from:['']
}); 
    
} 

this.form = this.formBuilder.group({
  action:['A'],
  userid:[''],
  username: ['', [Validators.required]],
  email:['',[Validators.required,Validators.email]],
  password: ['', [Validators.required, Validators.minLength(4)]],
  storeid:[''],
  phonenumber:['',[Validators.pattern("[0-9 ]{10}")]]
});

  window.addEventListener("message", this.disablechat, false);

  this.imgpath = environment.ImageUrl;

  this.audio = new Audio();

  this.audio.src = "../../../assets/images/notify.wav";

  this.audio.load();
}

   get f() { return this.Strform.controls; }
   get gu(){return this.guestform.controls;}
   get hu(){return this.guesthform.controls;}
  ngOnInit(): void {
   
    

  this.Api.getMouseValue().subscribe((res:any)=>{
    if(res=="E"){
      this.display = 'A';
      this.logindisplay=true;  
      this.scrolltop=0;
      setTimeout(() => { this.scrolltop = this.myScrollContainer.nativeElement.scrollHeight;}, 1000);
    }
  });

  const obj={
    "UNIQUEID":this.uniqueid   
    }
   this.Api.postmethod('GetDealername',obj).subscribe(res=>{
   if(res.status==200){
     this.urlId=res.response[0].AS_ID;
     if(localStorage.getItem('storeId')!=this.urlId){
      this.cancelpopoff();
     }
  
    this.storeId=this.urlId;
    localStorage.setItem('storeId',this.urlId); 
   }
  });


  // if(localStorage.getItem('storeId')!=this.urlId){
  //   this.cancelpopoff();
  //  }

  // this.storeId=this.urlId;
  // localStorage.setItem('storeId',this.storeId);
  this.senderId = localStorage.getItem('userId');  
  this.Conversationid = localStorage.getItem('convId'); 
    if(this.senderId!=null && this.senderId!='0' && this.Conversationid !=null && this.Conversationid !='0' &&  localStorage.getItem('guestFlag')==""){
      this.signclick = false;
      this.guestclick=false;
      this.registerclick=false;
      this.homeclick=true;
      this.homeTitle=true;
      this.homedept=true;
      this.isfooter=false;
      this.reccharts=true;
      this.isStartNew=true;
      this.guesthomeclick=false;
      this.guestwithoutname=false; 
      this.loginuser= localStorage.getItem('userName');
      this.GetMessagess('0',this.Conversationid,"D");
      this.PriorityTags();
      if(localStorage.getItem('signoutbtn')=="G"){
        this. isSignoutVisible=false;
       // this.isStartNew=false;
        this.reccharts=false;
        this.guesthomeclick=false;
      }
    }else if(this.senderId!=null && this.senderId!='0' && this.Conversationid !=null && this.Conversationid !='0' &&  localStorage.getItem('guestFlag')!='' &&  localStorage.getItem('guestFlag')!=null){
      this.signclick = false;
      this.guestclick=false;
      this.registerclick=false;
      this.homeclick=true;
      this.homeTitle=false;
      this.homedept=false;
      this.isfooter=false;
      this.reccharts=true;
      this.isStartNew=true;
      this.guesthomeclick=true;
      setTimeout(() => { this.guestwithoutname=false;  }, 500);                                              
      this.something=localStorage.getItem('guestFlag');
      if(localStorage.getItem('signoutbtn')=="G"){
        this. isSignoutVisible=false;
      //  this.isStartNew=false;
        this.reccharts=false;
      }
      this.GetMessagess('0',this.Conversationid,"D");
    }
    else{
    //  this.signclick=true;
      this.registerclick=false;
      this.homeclick=false;
      this.homedept=false;
      this.homeTitle=false;
      this.guesthomeclick=false;
    //  this.isfooter=true; 
      this.submitted=false;
      this.messages=[];
    }
    
    this.Strform.reset();  
    this.guestform.reset();
    this.form.reset();                
      this.Api.getmessages().subscribe((message: any) => {
      if (this.Conversationid == message.convid && message.from=='A' && message.msgStatus=='Y') {             
        this.audioflag=1; 
        this.GetMessagess(0,message.convid,'D');                           
     }
     else if (this.Conversationid == message.convid && message.from=='A' && message.msgStatus=='D')  {   
      this.messages.forEach((element:any) => {

        if (element.MSG_ID === message.lastMsgId) {

          element.MSG_DESC = 'Retracted this message';
          element.MSG_STATUS=message.msgStatus;
        }

    });   
    }
    });

    this.Api.getendChatmessage().subscribe((message: any) => {
      if (this.Conversationid == message.convid && message.from=='A') { 
        this.audioflag=1;     
        this.GetMessagess(0,message.convid,'D'); 
      }
    });

    this.Api.getpickmessages().subscribe((message: any) => {
      if (this.Conversationid == message.convid && message.from=='A') { 
        this.audioflag=1;     
        this.GetMessagess(0,message.convid,'D'); 
      }
    });
    
    this.Api.gettypeMessage().subscribe((message: any)=>{
      if (this.Conversationid == message.convid && message.from=='A') {
        this.ischatbubble=true;
        setTimeout(() => { if(this.ischatbubble==true){this.ischatbubble=false;}  }, 3000);                                            
      }
    });

    this.Api.removeUsers().subscribe((message: any) => {
      if (this.Conversationid == message.convid && message.from=='A') { 
        this.audioflag=1;     
        this.GetMessagess(0,message.convid,'D'); 
      }
    });

    this.Api.Updateguestname().subscribe((message: any)=>{
      if (this.Conversationid == message.convid && message.from=='A') { 
        this.guesthomeclick=false;
        this.homeTitle=true;
        this.homedept=true;
        this.something='';
        localStorage.setItem('guestFlag','');
        localStorage.setItem('userName',message.name);
        this.loginuser=localStorage.getItem('userName');
        this.PriorityTags(); 
        setTimeout(() => {  this.tagsClick('1', 'Sales') }, 1000); 
      }
    });


  }

  CustomerHits(){
    const obj={
      "convid": this.Conversationid,  
      "userid":this.senderId,  
      "storeid": this.urlId,
      "source":this.hitsource
      }
      this.Api.postmethod('CustomerhitsAction',obj).subscribe(res=>{
         if(res.status==200){this.AgentStatus();}
      });
  }

  AgentStatus(){
     const obj={
      "status":"" 
     }
     this.Api.postmethod('GetAgentStatus',obj).subscribe(res=>{
       if(res.status==200){
         if(res.response.status=="N")
         this.agentstatus=true;
         else
         this.agentstatus=false;
       }
     });
  }
   
   disablechat:any= (event:any)=>  {
    if( this.senderId=='0' &&  this.Conversationid =='0'){
    if(event.data.value==='A'){
       this.signclick=false;
        this.isfooter=false;
        localStorage.setItem('parenturl',event.data.url);
        setTimeout(()=>{ 
          this.sourceid=1;
          localStorage.setItem('sourceid',this.sourceid.toString());
          this.hitsource=1;
          this.CustomerHits()},1000); 
         this.guestwithoutname=true; 
         this.Api.socketopen();           
      }else if(event.data.value==='B'){
        this.signclick=false;
        this.isfooter=false;
        this.guestwithoutname=true; 
        localStorage.setItem('parenturl',event.data.url);
        setTimeout(()=>{
          this.sourceid=3;
          this.hitsource=3;
          localStorage.setItem('sourceid',this.sourceid.toString());
          this.CustomerHits()},1000);
          this.Api.socketopen();
     }else if(event.data.value==='D'){
      localStorage.setItem('parenturl',event.data.url);
       if(this.sourceid==0){ 
        this.signclick=false;
        this.isfooter=false;
        this.guestwithoutname=true; 
        setTimeout(()=>{
        this.sourceid=3;
        localStorage.setItem('sourceid',this.sourceid.toString());
        this.hitsource=3;
        this.CustomerHits();},1000);
        
        //  this.guestwithoutname=false;
        //    this.sourceid=2;  
        //    this.hitsource=2; 
        //   this.CustomerHits();      
        //   this.signclick=true;
        //   this.isfooter=true;
        }
        this.Api.socketopen();
      }
      else if(event.data==='E'){
        setTimeout(()=>{
          this.hitsource=5;
          this.CustomerHits()},500);     
      }
      else if(event.data==='F'){
        localStorage.setItem('parenturl','');
        localStorage.setItem('updatedUserId','0'); 
        this.Api.socketclose();
      }
    }else if( this.senderId>'0' &&  this.Conversationid >'0'){
      if(event.data.value==='A'){
        localStorage.setItem('parenturl',event.data.url);
        this.hitsource=1;
        setTimeout(()=>{this.CustomerHits()},1000); 
      }else if(event.data.value==='B'){
        localStorage.setItem('parenturl',event.data.url);
        this.hitsource=3;
        setTimeout(()=>{this.CustomerHits()},1000); 
      }else if(event.data.value==='D'){
       // this.hitsource=2;
       localStorage.setItem('parenturl',event.data.url); 
       if(localStorage.getItem('sourceid')!='0'){
        this.hitsource=JSON.parse(localStorage.getItem('sourceid')!);
       }else{
        this.hitsource=3;
       }     
        setTimeout(()=>{this.CustomerHits()},1000); 
      }else if(event.data==='E'){
        this.hitsource=5;
        setTimeout(()=>{this.CustomerHits()},1000); 
      }
      else if(event.data==='F'){
        localStorage.setItem('parenturl','');
        localStorage.setItem('updatedUserId','0');
        this.Api.socketclose();
      }
    }
   
} 
 
focusFunction(){
   const obj = {
      fromid: this.senderId,
      from:'F', 
      toid: '',
      convid: this.Conversationid
    }
      this.Api.typeMessage(obj);
   }


  PriorityTags(){
    const obj={
      "ID":0,
      "expression":""
    }
    this.Api.postmethod('GetExgDepartments',obj).subscribe(res=>{   
      this.ptags= res.response;  
      if(localStorage.getItem('tagId')!=""){
        this.tagid=localStorage.getItem('tagId');
      }
    });

  }

  get fu() { return this.form.controls; }

  onLoginSubmit(){
    this.submitted = true;

    if (this.Strform.invalid) {
        return;
    }
    localStorage.setItem('email', this.Strform.value.email);
    localStorage.setItem('password', this.Strform.value.password);  
    let email=this.Strform.value.email;
    const obj={
      "result":email,
      "pwd":this.Strform.value.password,
      "storeid":localStorage.getItem('storeId')
    }
    this.signloading=true;
    this.Api.postmethod('getuserdetails',obj).subscribe(res=>{
      if(res.status==200){
        this.nologinuser=false;  
        this.submitted=false;     
        this.Strform.reset('');
        this.guestclick=false;
        this.signclick=false;
        this.registerclick=false;
        this.isButtonVisible = true;
        this.isStartNew=true;
        this.isButtonEnd=true;
        this.isSignoutVisible=true;
        this.signloading=false;
        const user = res.response.result;
        this.loginuser=user.username;
        this.senderId=user.userid;
        localStorage.setItem('userId', user.userid);
        localStorage.setItem('userName',user.username);   
        localStorage.setItem('sourceid','2');
        this.sourceid= JSON.parse(localStorage.getItem('sourceid')!);
        this.PriorityTags(); 
        this.ConversationAction(user.userid);         
        this.homeclick=true;
        this.homeTitle=true;
        this.homedept=true;
        this.guesthomeclick=false;
        this.isfooter=false;
        this.reccharts=true;
        this.something='';
      }else{
        this.singup=res.error;
        this.nologinuser=true;
        this.signloading=false;
      }    
    });
  }

  loginusercancel(){
    this.nologinuser=false;
  }

  ConversationAction(uid:any){
    if(uid!=0 && uid!=null && localStorage.getItem('storeId')!=null && localStorage.getItem('storeId')!='0' ){
      const obj={
        "CONV_ID":0,
         "FUSERID":uid,
         "AUSERID":0,
         "Conv_TYPE":"I",
         "TagsIDS":0,
         "Store_Id": localStorage.getItem('storeId'),
         "from":"F",
         "conv_SRC":this.sourceid,
         "url": localStorage.getItem('parenturl')
        }
        this.Api.postmethod('ConvAction',obj).subscribe(res=>{
          if(res.status==200){ 
            this.Conversationid=res.response.result.CONV_ID;
            if( localStorage.getItem('guestFlag')==''){
              this.GetMessagess(0,this.Conversationid,'D'); 
            }     
            localStorage.setItem('convId', this.Conversationid);
            this.Api.signIn();
          }
        });
    }
 
 }

  
   onSubmit() {
   
    this.submitted = true;

  if (this.form.invalid) {
      return;
  }
    this.registerloading=true;
    if(JSON.parse(localStorage.getItem('updatedUserId')!)>'0'){
      this.form.controls['action'].setValue('U');
      this.form.controls['userid'].setValue(localStorage.getItem('updatedUserId'));
    }else{
      this.form.controls['action'].setValue('A');
      this.form.controls['userid'].setValue(0);
    }
   
    this.form.controls['storeid'].setValue(localStorage.getItem('storeId'));
    this.Api.postmethod('auduserdetails',this.form.value).subscribe(res=>{
      if(res.status==200){  
       localStorage.setItem('updatedUserId','0'); 
       localStorage.setItem('EndConversation','0');      
        this.form.reset('');
        this.guestclick=false;
        this.signclick=true;
        this.registerclick=false;
        this.submitted=false;  
        this.registerloading=false; 
        this.newregister=false;   
      }else if(res.status==401){
        this.registerloading=false;
        if(res.error.result.userid>0){
          this.inactiveuser=res.error.result.userid;
          this.newregister=true;        
        }
      }    
    })
  };

  registeroff(){
    const obj={
      "userid":this.inactiveuser
     }
    this.Api.postmethod('InactiveUser',obj).subscribe(res=>{
        if(res.status==200){
          this.onSubmit();
        }
    });
  }

  Cancelregisteroff(){
    this.newregister=false;
  }

guestUser(){
  this.form.reset();
  this.guestclick=true;
  this.signclick=false;
  this.registerclick=false;
  this.submitted=false;
}
register(){
  this.signclick=false;
  this.registerclick=true;
  this.submitted=false;  
}

sining(){
  this.signclick=true;
  this.guestclick=false;
  this.submitted=false;
}
guestonSubmit(){
  this.submitted = true;

    if (this.guestform.invalid) {
        return;
    }
    this.guestloading=true;
    this.guestform.controls['action'].setValue('A');
    this.guestform.controls['userid'].setValue(0);
    this.guestform.controls['email'].setValue('');
    this.guestform.controls['password'].setValue('');
    this.guestform.controls['storeid'].setValue(localStorage.getItem('storeId'));
    this.Api.postmethod('auduserdetails',this.guestform.value).subscribe(response => {
      if(response.status==200){
        this.guestform.reset('');
        this.submitted=false;     
          this.guestclick=false;
          this.signclick=false;
          this.registerclick=false;
          this.isButtonVisible = true;
          this.isStartNew=true;
          this.isButtonEnd=true;
          this.isSignoutVisible=false;
          this.guestloading=false;
          localStorage.setItem('signoutbtn','G');
          const user = response.response.result;
          this.loginuser='';
          this.senderId=0;
          this.loginuser=user.username;
          this.senderId=user.userid;
           localStorage.setItem('userId', this.senderId);
           localStorage.setItem('userName',this.loginuser);
           localStorage.setItem('sourceid','2');
           this.sourceid= JSON.parse(localStorage.getItem('sourceid')!);
           this.PriorityTags(); 
           this.ConversationAction(user.userid);          
          this.homeclick=true;
          this.homeTitle=true;
          this.homedept=true;
          this.guesthomeclick=false;
          this.isfooter=false; 
          this.something='';
       //   this.reccharts=true;
          this.Api.signIn()
      }
      
    })
    
  }
  Signup(){
    this.signoff=true;  
  }

  popsignoff(){
    this.Cancelsignoff();
    this.signclick=true;
    this.registerclick=false;
    this.homeclick=false;
    this.homeTitle=false;
    this.homedept=false;
    this.guesthomeclick=false;
    this.reccharts=false;
    this.isfooter=true; 
    this.submitted=false;
    this.messages=[];
      localStorage.setItem('userId', '0');
      localStorage.setItem('convId', '0');
      localStorage.setItem('userName','');
      localStorage.setItem('tagId','0');
      localStorage.setItem('email', '');
      localStorage.setItem('password', ''); 
      localStorage.setItem('EndConversation','0');
      localStorage.setItem('guestFlag','');
      localStorage.setItem('startNewUserId','0');
      localStorage.setItem('startNewUserName','');
      localStorage.removeItem('signoutbtn');
      localStorage.setItem('sourceid','0');
  }
  Cancelsignoff(){
    this.signoff=false;  
  }

  ExitChat(){
    this.endconversation=true;
}

ConversationEnd(){
  const obj={
    convid: this.Conversationid,
    endfrom: "F",   
    userid: localStorage.getItem('userId') }
    this.Api.postmethod('ExgAchievedAction',obj).subscribe(response => {
      if(response.status==200){
      // this.Signup();
      this.Cancelconv();
      this.isButtonVisible = false;
      this.isButtonEnd=false;
      const msgobj1 = {        
        convid: this.Conversationid,
        message: 'Customer Ended chat',
        type: 'T',
        from: 'F'           
      };
      this.Api.endChat(msgobj1); 
      this.audioflag==1;       
      this.GetMessagess(0,this.Conversationid,'D'); 
      this.sourceid=JSON.parse(localStorage.getItem('sourceid')!);
      if( localStorage.getItem('signoutbtn')=="G"){
        this.convhistory=true;
        this. isSignoutVisible=false;
        this.issignUpbutton=true;
        localStorage.removeItem('signoutbtn');
        localStorage.setItem('updatedUserId',JSON.parse(localStorage.getItem('userId')!));  
        localStorage.setItem('startNewUserId',JSON.parse(localStorage.getItem('userId')!));
        let returnUrl=localStorage.getItem('userName') as string;
        localStorage.setItem('startNewUserName',returnUrl);  
        localStorage.setItem('convId', '0');
        localStorage.setItem('userId','0');
        localStorage.setItem('userName','');
        localStorage.setItem('tagId','0'); 
        localStorage.setItem('guestFlag','');  
      }
     
      }
    });
}

Cancelconv(){
  this.endconversation=false;
}

  resisters(){
    this.submitted=false;
  }

  tagsClick(id:any,name:any){
    this.tagid=id;
    const obj={
      "conv_id": this.Conversationid,
      "tag_id":this.tagid
    }
    this.Api.postmethod('UpdateTagid',obj).subscribe(response => {
     localStorage.setItem('tagId',this.tagid);
     const obj = {
      userid: this.senderId,
      convid: this.Conversationid,
      tagname:name
    }
     this.Api.updatedepartments(obj);
    });
  }

  send(event:any): void {
    if(((event.target.value).trim()).length == 0 ){
     this.entertext=true;
    } else {
      this.entertext=false;
      this.Bindmessenger(event.target.value, 'T');
      event.target.value="";
    }
  }

  Bindmessenger(chatdesc:any, msgtype:any){
    if(chatdesc.indexOf("http") != -1 || chatdesc.indexOf("http") != -1){
      chatdesc = this.stylize(chatdesc);
    }
  //  chatdesc=chatdesc.replace(/[-']/g,'|');
    let obj1={
       MSG_CONV_ID:this.Conversationid,
       MSG_FROM_UID:this.senderId,
       MSG_DESC:chatdesc,
       MSG_CREATEDTS:this.timeFormat(), 
       MSG_STATUS:"Y",
       MSG_TYPE:"TI",
       MSG_ParentId:0,
       MSG_FROM:'F',
       UserName: localStorage.getItem('userName')          
       }
       this.messages.push(obj1);
       setTimeout(() => { this.scrolltop = this.myScrollContainer.nativeElement.scrollHeight; }, 500);
    const obj={
      action:'A',
      MSG_ID:0,
      MSG_CONV_ID:this.Conversationid,
      MSG_GR_ID:0,
      MSG_FROM_UID:this.senderId,
      MSG_TO_UID:this.ReceiverId,
      MSG_DESC:chatdesc,
      MSG_STATUS:'Y',
      Conv_type:msgtype,
      Msg_Category:"I",
      MSG_FROM:'F',
      userlist:""
    }
    this.Api.postmethod('ExgMessangerAction',obj).subscribe({
      next:res=>{
        if(res.status==200){
        //  this.lmsgid=res.response.result.MSG_ID; 
          const msgobj = {
            fromid: this.senderId,
            toid:  this.ReceiverId,
            convid: res.response.result.MSG_CONV_ID,
            message: chatdesc,
            type: 'T',
            flag: true,
            lastMsgId: res.response.result.MSG_ID,
            dealerid:  localStorage.getItem('storeId'),
            from: res.response.result.MSG_FROM           
          };
        this.Api.sendMessage(msgobj);     
        }
      },
      error:error=>{
        this.Online();
      }            
    });
  }

  Online(){
    this.Api.createOnline$().subscribe((isOnline:any) =>{
      if(!isOnline ){
        this.toaster.open({
          text: 'No internet Connection',
          type: 'warning',
        });
      }   
    });
  }

  
  timeFormat() {
    let hours = new Date().getHours();
    let minutes:any = new Date().getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

  return  this.timeNow = strTime;
  }

  myClickFunction(): void {
    if(((this.userMessage.nativeElement.value).trim()).length == 0 ){
      this.entertext=true;
    } else {
    this.Bindmessenger(this.userMessage.nativeElement.value, 'T');
    this.userMessage.nativeElement.value = '';;
    }
  }

  pentertext(){
    this.entertext=false;
  }

  GetMessagess(msgid:any,convid:any,flag:any)
  {  
    const obj= {
      "MSG_ID":msgid,
      "CONV_ID":convid,
      "Flag":flag,
      "userid":this.senderId,
      "from":"F"
      }    

      this.Api.postmethod('GetMessages',obj).subscribe({
         next:res=>{
          if(res.response.length>0){  
         //   this.lmsgid=res.response[res.response.length-1].MSG_ID;
             this.messages=[]; 
           res.response.reverse().filter((item:any)=>{
          this.messages.push(item);         
          if(this.audioflag==1){
            this.audio.play();
            this.audioflag=0;
          } 
          this.ischatbubble=false;
          if(item.MSG_TYPE=='E' && item.MSG_FROM=='F'){
          this.isButtonVisible = false; this.isButtonEnd=false;
          localStorage.setItem('EndConversation',item.MSG_TYPE);
        }else if(item.MSG_TYPE=='E' && item.MSG_FROM=='A'){
          this.isButtonVisible = false;
          localStorage.setItem('EndConversation',item.MSG_TYPE);
        }
        });
        this.rowno=this.messages.length;      
        setTimeout(() => { this.scrolltop = this.myScrollContainer.nativeElement.scrollHeight; }, 500);    
          }
         },
       error:error=>{    
        this.Online();
      }
      });
  }

  private stylize(text: string): string {

    let stylizedText: string = '';
  
    if (text && text.length > 0) {
  
      for (let line of text.split("\n")) {
  
        for (let t of line.split(" ")) {
  
          if (t.startsWith("http") && t.length>7) {  
            stylizedText += `<a href="${t}" target="_blank">${t}</a> `;
          }
          else
            stylizedText += t + " ";
        }
        stylizedText += '<br>';
      }
      return stylizedText;
    } 
    else return text;
  }

  isSignup(){
    this.convhistory=false;
    this.signclick=false;
    this.homeclick=false;
    this.homeTitle=false;
    this.homedept=false;
    this.guesthomeclick=false;
   // this.reccharts=false;
    this.messages=[];
    this.registerclick=true;
    this.submitted=false;
    this.issignUpbutton=false;
    this.isfooter=true; 
  localStorage.setItem('email', '');
  localStorage.setItem('password', ''); 
  localStorage.setItem('startNewUserId','0');
  localStorage.setItem('startNewUserName',''); 
  localStorage.removeItem('signoutbtn');
  localStorage.setItem('guestFlag','');
  localStorage.setItem('sourceid','0');
  }

  StartNew(){
    this.startnewconv=true; 
  }

  NewConversation(){
   // if(localStorage.getItem('EndConversation')!='E'){
      this.ConversationEnd();
   // }
    setTimeout(() => {
      this.startnewconv=false; 
      this.messages=[];    
      localStorage.setItem('convId', '0');
      localStorage.setItem('tagId','0');
      localStorage.setItem('email', '');
      localStorage.setItem('password', ''); 
      localStorage.setItem('EndConversation','0');
      this.PriorityTags(); 
      if(localStorage.getItem('userId')=='0'){
        localStorage.setItem('userId',JSON.parse(localStorage.getItem('startNewUserId')!));
        let returnUrl1=localStorage.getItem('startNewUserName') as string;
        localStorage.setItem('userName',returnUrl1);
        this.issignUpbutton=false;
        this.convhistory=false;
        localStorage.setItem('signoutbtn','G');
      }
      this.ConversationAction(localStorage.getItem('userId'));
      if( localStorage.getItem('signoutbtn')=='G'){
        this.senderId= localStorage.getItem('userId');
       setTimeout(()=>{this.adddefaultmessage();},1000); 
      }
      this.isButtonVisible = true;
      this.isButtonEnd=true;
      localStorage.setItem('startNewUserId','0');
      localStorage.setItem('startNewUserName','');
      }, 2000);    
  }

  Cancelnewconv(){
    this.startnewconv=false;
  }


  getrecentchat(){
    this.logindisplay=false;
    this.display ='B';
   }

   onScroll() {
    let obj = {
      "MSG_ID": 0 ,  
      "CONV_ID": this.Conversationid, 
      "Count": this.rowno,
      "user_id":this.senderId, 
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
            MSG_STATUS:data[it].MSG_STATUS[0]             
          };      
          return obj3;
        });
        this.rightmessages.filter((item:any)=>{
          this.messages.unshift(item);      
        });                           
      }
      });
  }


  guestonhSubmit(){
    this.submitted = true;

    if (this.guesthform.invalid) {
        return;
    }
    this.guesthloading=true;
    this.guesthform.controls['id'].setValue(this.senderId);
    this.guesthform.controls['from'].setValue('F');
    this.Api.postmethod('UpdateUserDetails',this.guesthform.value).subscribe(response => {
       if(response.status==200){
         this.guesthomeclick=false;
         this.homeTitle=true;
         this.homedept=true;
         this.something='';
         localStorage.setItem('guestFlag','');
         localStorage.setItem('userName',response.response.result.name);
         this.loginuser=localStorage.getItem('userName');
         this.PriorityTags(); 
         setTimeout(() => {  this.tagsClick('1', 'Sales') }, 1000); 
         const obj = {
          fromid:this.senderId,
          from:'F',
          convid: this.Conversationid,
          name:localStorage.getItem('userName'),
          phone: response.response.result.phno            
        }
          this.Api.guestname(obj);       
       }
    });
  }

  hresisters(){
    this.submitted=false;
  }

  chatsend(event:any): void {
    if(((event.target.value).trim()).length == 0 ){
     this.entertext=true;
    } else {
      this.entertext=false;
      this.guestmessenger(event.target.value, 'T');
      event.target.value="";
    }
  }

  myHomeClickFunction(): void {
    if(((this.chatmessage.nativeElement.value).trim()).length == 0 ){
      this.entertext=true;
    } else {
      this.entertext=false;
    this.guestmessenger(this.chatmessage.nativeElement.value, 'T');
    this.chatmessage.nativeElement.value = '';;
    }
  }

  guestmessenger(chatdesc:any, msgtype:any){
    const obj= {
      "action":'A',
      "userid":0,
      "email":'',
      "password":'',
      "storeid":localStorage.getItem('storeId'),
      "username":this.minuteSecondsFormat()
      }
    this.Api.postmethod('auduserdetails',obj).subscribe(response => {
      if(response.status==200){
       // this.guesthform.reset('');
        this.guestwithoutname=false;
        this.submitted=false;     
          this.guestclick=false;
          this.signclick=false;
          this.registerclick=false;
          this.isButtonVisible = true;
          this.isStartNew=true;
          this.isButtonEnd=true;
          this.isSignoutVisible=false;
          this.guestloading=false;
          localStorage.setItem('signoutbtn','G');
          localStorage.setItem('guestFlag','C');
          const user = response.response.result;
          this.loginuser='';
          this.senderId=0;
          this.senderId=user.userid;
           localStorage.setItem('userId', this.senderId);
           localStorage.setItem('userName',user.username);
           this.ConversationAction(user.userid);          
          this.homeclick=true;
          this.homeTitle=false;
          this.homedept=false;
          this.isfooter=false; 
          this.guesthomeclick=true;
          this.something=localStorage.getItem('guestFlag');
          setTimeout(() => { this.Bindmessenger(chatdesc, msgtype); setTimeout(()=>this.adddefaultmessage(),500) }, 1000);       
      }
    });
  }

  adddefaultmessage(){
    const obj={
      action:'A',
      MSG_ID:0,
      MSG_CONV_ID:this.Conversationid,
      MSG_GR_ID:0,
      MSG_FROM_UID:this.senderId,
      MSG_TO_UID:this.ReceiverId,
      MSG_DESC:"Hi there! Thanks for reaching out. We are connecting you to one of our customer service team members and will get you connected as soon as possible. Thank you for your patience!",
      MSG_STATUS:'Y',
      Conv_type:"S",
      Msg_Category:"I",
      MSG_FROM:'A',
      userlist:""
    }
    this.Api.postmethod('ExgMessangerAction',obj).subscribe({
      next:res=>{
        if(res.status==200){
          this.GetMessagess(0,this.Conversationid,'D'); 
        }
      },
      error:error=>{
        this.Online();
      }  
    })
  }

  minuteSecondsFormat() {
   
    let minutes:any = new Date().getMinutes();
    let Seconds:any = new Date().getSeconds();
    let Milliseconds:any = new Date().getMilliseconds();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = 'Guest'+ minutes + Seconds + Milliseconds;

  return  this.timeNow = strTime;
  }

  cancelpopoff(){
    this.messages=[];
    localStorage.setItem('userId', '0');
    localStorage.setItem('convId', '0');
    localStorage.setItem('userName','');
    localStorage.setItem('tagId','0');
    localStorage.setItem('email', '');
    localStorage.setItem('password', ''); 
    localStorage.setItem('EndConversation','0');
    localStorage.setItem('guestFlag','');
    localStorage.setItem('startNewUserId','0');
    localStorage.setItem('startNewUserName','');
    localStorage.removeItem('signoutbtn');
    localStorage.setItem('sourceid','0');
  }


}

  


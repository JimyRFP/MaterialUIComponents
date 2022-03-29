import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField } from "@mui/material";
import React from 'react';
export function UpperCaseTextField(props){
    function onChange(e){
       let names=e.target.value.split(' ');
       let result='';
       names.map((v)=>{
         result+=(v.slice(0,1).toUpperCase()+v.slice(1)+" ");
       });
       result=result.slice(0,result.length-1);
       e.target.value=result;
    }
    return (
        <TextField {...props} onChange={onChange}/>
    )
}

export function MyDatePicker(props){
    let [date,setDate]=React.useState(props.date?props.date:new Date());
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker 
                    label='Data de nascimento' 
                    renderInput={(params) => <TextField required fullWidth {...params} />}
                    value={date}
                    onChange={(date)=>{setDate(date)}}
                    />
        </LocalizationProvider>        
    )
}

export class PhoneTextField extends React.Component{
    constructor(props){
        super(props);
        this.state={color:'primary'}
    }
    onChange(elm){
        let value=getJustNumbers(elm.target.value,14);
        this.formatShowValue(elm,value);
        let color='primary';
        this.checkIsValid(value)?color='success':color='error';
        if(this.state.color!=color)
          this.setState({color:color});
    }
    formatShowValue(e,value){
        let showValue='';
        const points={0:'(',2:')'};
        for(let i=0;i<value.length;i++){
            if(points[i])
            showValue+=points[i];
            showValue+=value[i];              
        }
        this.value=showValue;
        e.target.value=showValue;
    }
    checkIsValid(value){
        if(value.length>8)
          return true;
        return false;  
    }
    render(){
        return(
            <TextField
               type="tel"
               color={this.state.color}
               onChange={(e)=>{this.onChange(e);}}
               {...this.props}
            />
        )
    }
}
export class RGTextField extends React.Component{
    constructor(props){
        super(props);
        this.state={color:'primary'}
    }
    onChange(elm){
        let value=getJustNumbers(elm.target.value,9);
        elm.target.value=value;
        let color='primary';
        this.checkIsValid(value)?color='success':color='error';
        if(this.state.color!=color)
          this.setState({color:color});
    }

    checkIsValid(value){
        if(value.length>5)
          return true;
        return false;  
    }
    render(){
            return(
                <TextField  
                    color={this.state.color}
                    onChange={(e)=>{this.onChange(e)}}
                 {...this.props}/>
            )
    }
}

export class CPFTextField extends React.Component{
    constructor(props){
        super(props);
        this.state={color:"error"};
        this.value="";
    }
    formatShowValue(e,value){
        let showValue='';
        const points={3:'.',6:'.',9:'-'};
        for(let i=0;i<value.length;i++){
            if(points[i])
            showValue+=points[i];
            showValue+=value[i];              
        }
        this.value=showValue;
        e.target.value=showValue;
    }
    onChange(e){
      let value=getJustNumbers(e.target.value,14);
      this.formatShowValue(e,value);   
      let color='primary';   
      if(this.cpfIsValid(value)){
         color='success';
      }else{
        color='error';  
      }   
      if(this.state.color!=color){
          this.setState({color:color});
      }
    }

    cpfIsValid(cpf){
       if(cpf.length<11)
         return false;
       if(!checkDigit(10,9))  
          return false;
       if(!checkDigit(11,10))
          return false;
       return true; 

       function checkDigit(base,max){
          let sum=0;
          for(let i=0;i<max;i++){
              sum+=(parseInt(cpf[i])*(base-i));
          }
          const rest=sum%11;
          const digit=rest<2?0:11-rest;
          if(parseInt(cpf[max])!==digit)
             return false;
          return true;       
       }
    }
    render(){
        return(
            <TextField 
               color={this.state.color}
               onChange={(e)=>{this.onChange(e);}}
               {...this.props}/>
        );
    }
}

export function EmailTextField(props){
    return (
        <TextField type="email" {...props}/>
    )
}

function getJustNumbers(value,max=-1){
    let filteredValue='';
    let maxLength=max>0?max:value.length;
    for(let i=0;i<Math.min(value.length,maxLength);i++){
        let asc2=value.charCodeAt(i); 
        if(asc2>47 && asc2<58){
             filteredValue+=value.charAt(i);              
         }   
   }
   return filteredValue;
}

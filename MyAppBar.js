import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";

export function MyAppBar(props){
    return (
       <AppBar
         position="static"
       >            
           <Toolbar
              sx={{
                  height:'50px',
                  display:'flex',
                  flexDirection:'row',
                  alignItems:'center',
                  }}   
                  > 
              <div
                 style={{
                     marginLeft:'10px'
                 }}
              >{props.left}</div>
              <div
                 style={{
                     margin:'auto'
                 }}
              >{props.center}</div>    
              <div
                 style={{
                     marginRight:'10px'
                 }}
              >{props.rigth}</div>             
           </Toolbar>
      </AppBar>
    )
}
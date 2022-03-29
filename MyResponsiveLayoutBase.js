import React from "react";
import { MyAppBar } from "./MyAppBar";
import { MyMenu } from "./MyMenu";
import { Drawer } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function OpenMenuButton(props){
    return (
       <IconButton onClick={props.onClick}><MenuIcon fontSize="large" sx={{color:"#fff"}}/></IconButton>
    )
}

export class ResponsivelLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={drawerOpen:false,widthSize:'large'};
        this.drawerWidth=this.props.drawerWidth?this.props.drawerWidth:300;
    }
    componentDidMount(){
        this.resizeEvent=()=>{
           const lowWidthBreakPoint=this.props.lowWidthBreakPoint?this.props.lowWidthBreakPoint:830;
           if(window.innerWidth>lowWidthBreakPoint){
               if(this.state.widthSize=='large')
                 return;
               this.setState({widthSize:'large'});  
           }else{
               if(this.state.widthSize=='low')
                 return;
               this.setState({widthSize:'low'});  
           }
        };
        window.addEventListener('resize',this.resizeEvent);
        this.resizeEvent();
    }
    Content(props){
        const marginLeft=props.isLowWidth?"0px":`${this.drawerWidth}px`;
        const width=props.isLowWidth?"100%":`calc(100% - ${this.drawerWidth}px)`
        return (
            <div style={{
                marginLeft,
                width,
            }}>
                {props.content}
            </div>
        )
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.resizeEvent);
    }
    changeMenuOpenState(state){
       this.setState({drawerOpen:state});
    }    

    render(){
        const Content=this.Content.bind(this);
        return(
        <React.Fragment>
            <CssBaseline/>
           <MyAppBar left={this.state.widthSize=="large"?null:<OpenMenuButton
                                                               onClick={()=>{this.changeMenuOpenState(true)}}
                                                               />}/>
                <Drawer
                    anchor='left'
                    variant={this.state.widthSize=="large"?"permanent":"temporary"}
                    open={this.state.drawerOpen}
                    onClose={()=>{this.changeMenuOpenState(false);}}
                    sx={{
                        width: this.drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                          width: this.drawerWidth,
                          boxSizing: 'border-box',
                        },
                      }}
                >
                        <MyAppBar left={this.props.logo}/>
                        <MyMenu  selectedIndex={this.props.selectedIndex} items={this.props.listItems}/>

                </Drawer>

           <Content content={this.props.content} isLowWidth={this.state.widthSize=="large"?false:true}/>

        </React.Fragment>)
    }
}
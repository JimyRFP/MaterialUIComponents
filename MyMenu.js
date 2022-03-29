import { List } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";

function changeLocationPathName(pathName){
    if(pathName==undefined)
      return;
    window.history.pushState({},'',window.location.origin+pathName);
    let event=new Event('onurlupdate');
    window.dispatchEvent(event);
}
export function MyMenu(props){
    let accordionLastIndex=-1;
    let itemLastIndex=-1;
    let [selectedItemIndex,setSelectedItemIndex]=React.useState(-1);
    function GetList(e,accordionNivel){
        if(e.type=='accordion'){
            return GetAccordion(e,accordionNivel+1);
        }else{
            return GetItem(e);
        }
    }
    function GetAccordion(e,accordionNivel){
        accordionLastIndex++;
        return (
            <ListItemButton disableGutters={true}  key={`accordion-${accordionLastIndex}`} sx={{paddingLeft:'5px'}}>
                <Accordion sx={{width:'100%'}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>{e.summary}</AccordionSummary>
                    <AccordionDetails sx={{padding:0}}>
                    {e.items.map((e,i)=>{
                        return GetList(e,accordionNivel);
                    })}
                    </AccordionDetails>
                </Accordion>
            </ListItemButton>
        )
    }
    function GetItem(e){
        itemLastIndex++;
        let itemIndex=itemLastIndex;
        return(
            <ListItemButton disableGutters={true} 
                            sx={{paddingLeft:'5px'}} 
                            onClick={()=>{setSelectedItemIndex(itemIndex);changeLocationPathName(e.href)}} 
                            selected={selectedItemIndex===itemLastIndex} 
                            key={`item-${itemLastIndex}`}>
                <ListItemIcon>{e.icon}</ListItemIcon>
                <ListItemText primary={e.primary} secondary={e.secondary}/>
            </ListItemButton>
        ) 
    }
    return (
        <List>
            {props.items.map((e,i)=>{
               return GetList(e,0);   
            })}
        </List>
    )
}
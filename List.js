import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import { TextField } from '@mui/material';
import { Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';

export class DataGrid extends React.Component{
    constructor(props){
        super(props);
        this.state={selectedPage:this.props.seletectdPage?this.props.selectedPage:0,
                    itemsPerPage:10,
                    searchFieldId:this.getFirstSelectedHeaderId(),
                    searchFieldValue:'',
                    orderBy:'desc',
                    orderFieldId:'',
                    items:this.props.items,
                    itemsLength:this.props.items.length,
                   };                      
    }
    componentDidUpdate(){
         this.updatedItems();
    }
    componentDidMount(){
        this.updatedItems();
    }
    onSearchIdChange(e){
        if(this.state.searchFieldId!=e.target.value)
          this.setState({searchFieldId:e.target.value});
    }
    onSearchValueChange(e){
       if(this.state.searchFieldValue!=e.target.value){
           this.setState({searchFieldValue:e.target.value,selectedPage:0});
       }
    }
    onClickShort(e){
        const isAsc=(this.state.orderFieldId===e && this.state.orderBy==='desc');
        const orderBy=isAsc?'asc':'desc';
        this.setState({orderFieldId:e,orderBy:orderBy});
    }
    getHead(header){
      return header.map((e)=>{
         return (<TableCell align="center" key={e.id.toString()}>
                      <TableSortLabel
                         active={this.state.orderFieldId===e.id}
                         direction={this.state.orderFieldId===e.id?this.state.orderBy:'desc'}
                         onClick={(k)=>{this.onClickShort(e.id);}}
                      >
                      {e.label}
                      </TableSortLabel>
                      </TableCell>)
      });  
    }
    sortItems(){
        if(!Boolean(this.state.orderFieldId))
          return;
        let items=this.getItems();  
        const compare=this.state.orderBy==='asc'?lower:greater;
        const param=this.state.orderFieldId;
        let sortItems=[];
        
        while(items.length>0){
            let extremeIndex=findExtremityIndex(compare);
            sortItems.push(items[extremeIndex]);
            let tempItems=items.map((e)=>{return e});
            items=[];
            let setIndex=0;
            for(let i=0;i<tempItems.length;i++){
                if(i==extremeIndex)
                  continue;
                items[setIndex]=tempItems[i];
                setIndex++;
            }     
        }
        this.setItems(sortItems);
        function findExtremityIndex(compare){
          let extremeIndex=0;
          for(let i=0;i<items.length;i++){
              if(compare(items[i][param],items[extremeIndex][param]))
                extremeIndex=i;
          }
          return extremeIndex;
        }
        function greater(a,b){
            if(a>b)
              return true;
            return false;  
        }
        function lower(a,b){
            if(a<b)
              return true;
            return false;
        }
    }
    setItems(items){
       this.__items=items;
    }
    getItems(){
      let items;
      items=(this.__items.map(e=>{return e}));  
      return items;
    }
    updatedItems(){
        if(this.isUpdated){
            this.isUpdated=false;
            return;
        }        
        this.setItems(this.props.items);
        this.searchItems();
        this.sortItems();
        this.setShowedItems();
    }
    searchItems(){
        if(!Boolean(this.state.searchFieldValue))
           return;   
        let gItems=this.getItems();  
        let items=[];
        const findStr=this.state.searchFieldValue.toUpperCase();
        for(let i=0;i<gItems.length;i++){
           let item=gItems[i];
           if(item[this.state.searchFieldId].toString().toUpperCase().search(findStr)<0)
              continue;
           items.push(gItems[i]);       
        }
        this.setItems(items);
    }
    setShowedItems(){
        const items=this.getItems();
        let maxPage=parseInt(items.length/this.state.itemsPerPage);
        const selectedPage=Math.min(this.state.selectedPage,maxPage);
        const startIndex=this.state.itemsPerPage*selectedPage;
        const endIndex=this.state.itemsPerPage*(selectedPage+1);         
        let showItems=[];
        for(let i=Math.min(startIndex,items.length);i<Math.min(endIndex,items.length);i++){
           showItems.push(items[i]);
        }
        this.isUpdated=true;
        
        this.setState({items:showItems,
                       itemsLength:items.length,
                       selectedPage:selectedPage,
                     });
    }
    getBody(header,items){
        if(!Boolean(items))
          return null;
        return items.map((item,index)=>{
          return (<TableRow key={`row-item-${index}`}>
               {header.map((head)=>{
                  return (<TableCell key={`item-${index}-${head.id}`} align='center'>{item[head.id]}</TableCell>);    
               })}
          </TableRow>);
        });  
    }
    onRowsPerPageChange(e){
        if(this.state.itemsPerPage!=e.target.value){
           let newState={itemsPerPage:e.target.value};
           const selectedPage=parseInt(this.state.itemsPerPage*this.state.selectedPage/e.target.value);
           if(selectedPage!=this.state.selectedPage)
             Object.assign(newState,{selectedPage:selectedPage});
           this.setState(newState);
        }
    }
    onPageChange(e,page){
       if(this.state.selectedPage!=page){
          this.setState({selectedPage:page});
       }  
    }
    getFirstSelectedHeaderId(){
        let header=this.props.header;
        for(let i=0;i<header.length;i++){
            if(header[i].selected)
              return header[i].id;
        }
        return header[0].id;
    }
    render(){
        return(
            <div style={{marginTop:"25px"}}>
            <div style={{display:"flex",justifyContent:"center"}}> 
                <SearchFieldWithSelect header={this.props.header} 
                                       selected={this.getFirstSelectedHeaderId()} 
                                       onChangeSelected={(e)=>{this.onSearchIdChange(e);}}
                                       onChangeInput={(e)=>{this.onSearchValueChange(e);}}
                                       />
            </div>
            <Paper>
            <TableContainer>
            <Table
                 sx={{minWidth:'400px'}}
              >
             <TableHead>
                 <TableRow>
                    {this.getHead(this.props.header)}
                </TableRow>
             </TableHead>
             <TableBody >
                 {this.getBody(this.props.header,this.state.items)}
             </TableBody>
        </Table>
        </TableContainer>
        <div style={{marginTop:'10px',display:'flex'}} >          
           <TablePagination labelRowsPerPage="Linhas por paginas" 
                            count={this.state.itemsLength} 
                            page={Math.min(this.state.selectedPage)} 
                            rowsPerPage={this.state.itemsPerPage} 
                            onRowsPerPageChange={(e)=>{this.onRowsPerPageChange(e);}}
                            onPageChange={(e,page)=>{this.onPageChange(e,page);}}
                            rowsPerPageOptions={[5,10,25,50,100]}
                            sx={{margin:'auto'}}/>
        </div>
        </Paper>
        </div>
        )
    }

}


function SearchFieldWithSelect(props){
   let [selected,setSelected]=React.useState(props.selected?props.selected:"");
   function onChangeSelected(e){
       setSelected(e.target.value);
       if(props.onChangeSelected)
         props.onChangeSelected(e);
   }
   function onChangeInput(e){
       if(props.onChangeInput)
        props.onChangeInput(e);
   }
   return(
    <Paper>    
        <Select
             onChange={onChangeSelected}
             value={selected}
          >
            {props.header.map(e=>{
                return (<MenuItem value={e.id}>{e.label}</MenuItem>)
            })}
        </Select>
        <TextField type="search"
                InputProps={
                    {startAdornment:(
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                        ),}
                }
                onChange={onChangeInput}

        />
    </Paper> 
   )
}
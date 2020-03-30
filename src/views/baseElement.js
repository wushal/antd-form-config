import React, { useState, useEffect } from 'react'
import Tooltip from 'antd/es/tooltip';
import DragglePage from '../components/DragglePage';
import Input from 'antd/es/input';

const {Search}  = Input

function BaseElement (props){
  const { leftList = [], elementMap, onSearch } = props
   return (
     <section>
       <div>
         <h3 className='page-left-title'>元素库</h3>
         <Search
           placeholder="搜索元素"
           onSearch={onSearch}
         />
       </div>
       <div>
         <h3 className='page-left-title'>基本元素</h3>
         {
           leftList.map(element => (
             <DragglePage
               key={element.id}
               disable={elementMap[element.id]}
               className='left-element'
               element={element}
               //formMap={formMap}
               //putFormMap={putFormMap}
             >
               <Tooltip title={element.title}>{element.title}</Tooltip>
             </DragglePage>

           ))
         }
          </div>
     </section>
   )


}
export default BaseElement
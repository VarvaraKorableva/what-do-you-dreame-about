import React from 'react'
import MyDream from '../MyDream/MyDream'
import './DreamsField.css'

function DreamsField({isAddAllBtnClicked, limit, dreams, OnDeleteMyDream, onCardClick}) {

return ( 

  isAddAllBtnClicked ?
  <ul className='dreamsField__field'>
  {dreams.map((dream) => (
    <MyDream 
      key={dream.id}
      dream={dream}
      OnDeleteMyDream={OnDeleteMyDream}
      onCardClick={onCardClick}
    />
  ))}
</ul>
    :
    <ul className='dreamsField__field'>
      {dreams.length > 0 && dreams.slice(0, limit).map((dream) => (
        <MyDream 
          key={dream.id}
          dream={dream}
          OnDeleteMyDream={OnDeleteMyDream}
          onCardClick={onCardClick}
        />
      ))}
    </ul>
);
}
    
export default DreamsField;
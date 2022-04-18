import React from 'react'

const StoryItem = ({data}) => {
  const {category, title, description, price, image} = data;

  return (
    <div className="story-item">
      <div className="story-item__image">
        <img src={image} alt={title} />
      </div>
      <div className="story-item__content">
        <div className="story-item__content-category">{category}</div>
        <div className="story-item__content-title">{title}</div>
        <div className="story-item__content-description">{description}</div>
      </div>
      <div className="story-item__price">
        ${price}
      </div>
    </div>
  )
}

export default StoryItem
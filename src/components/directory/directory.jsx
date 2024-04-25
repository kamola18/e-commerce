import './directory.scss';
import CategoryItem from '../category-item/category-item-component';

const DirectoryItem = ({categories}) => {
    return(
        <div className="categories-container">
        {
          categories.map( (category) => (
            <CategoryItem key={category.id} category={category}></CategoryItem>
          ))
        }
      </div>
    )
}

export default DirectoryItem;

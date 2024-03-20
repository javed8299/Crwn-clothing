import CategoryItem from '../category-item/category-item.components'
import './directory.style.scss';
const Directory = ({ categories}) => {
    return (
        <div>
            <div className="categories-container">
                {categories.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                ))}
            </div>
        </div>
    )
}

export default Directory

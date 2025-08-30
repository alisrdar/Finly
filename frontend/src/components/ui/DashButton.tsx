import { LuArrowRight } from 'react-icons/lu'

const DashButton = ({ btnText, onClick }: {btnText : string, onClick: () => void}) => {
    return (
        <button
            onClick={onClick}
            className="text-xs card-btn"
        >
            {btnText} 
            <LuArrowRight className="text-md inline-block ml-1" />
        </button>
    )
}

export default DashButton

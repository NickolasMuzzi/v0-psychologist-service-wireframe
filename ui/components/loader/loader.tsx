
import './loader.css'
export const Loader = ({className}:{className?:string}) => {
    return (
        <div className='container'>

    <div className='wrapper'>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
    </div>
        </div>
    )
}

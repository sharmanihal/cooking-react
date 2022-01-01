import { useTheme } from '../hooks/useTheme'
import './ThemeSelector.css'
import modeIcon from '../assets/modeIcon.svg'
export default function ThemeSelector() {
    const {changeColor,changeMode,mode}=useTheme();
    const themeColors=['#58249c','#249c6b','#b70233']
    const toggleMode=()=>{
        changeMode(mode ==='dark'?'light':'dark')
    }

    return (
        <div className='theme-selector'>
            <div className='mode-toggle'>
                <img src={modeIcon}
                onClick={toggleMode}
                alt='dark/light toggle icon'
                style={{filter:mode==='dark'?'invert(100)':'invert(20%)'}}
                ></img>
            </div>
            <div className='theme-buttons'>
                {themeColors.map(function(color){
                    return(
                        <div key={color}
                        onClick={()=>changeColor(color)}
                        style={{background:color}}
                        />
                    )
                })}
            </div>
        </div>
    )
}

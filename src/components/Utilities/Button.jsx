export default function Button ({onClick ,children}) {

    return<button onClick={onClick}>
        {children}
    </button>
    
}
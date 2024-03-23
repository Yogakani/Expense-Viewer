export default function Icons({height, width, symbol}) {

    const renderIcon = (symbol, height, width) => {

        switch (symbol) {
            
            case 'tick':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width}>
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                );
                
            default:
                break;
        }
    }

    return(
        <>
            { renderIcon(symbol, height, width) }
        </>
    );
}
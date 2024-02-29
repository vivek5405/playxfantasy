const  SvgIcon = ({iconName, className, onClick}) => {
    return (
        <span className={className} onClick={onClick} dangerouslySetInnerHTML={{__html:iconName}}/>
    )
}

export default (SvgIcon);
const CustomButton = ({
    children,
    action,
    variant,
    styleOverride = '',
    ...otherProps
}) => {
    const handleClick = (e) => {
        e.stopPropagation();
        action();
    };
    return (
        <button
            className={`flex  cursor-pointer ${styleOverride} items-center justify-center gap-1 px-4 py-2   text-white ${
                variant === 'primary'
                    ? 'btn-primary'
                    : variant === 'secondary'
                    ? 'btn-secondary'
                    : variant === 'default'
                    ? 'btn-default'
                    : variant === 'danger'
                    ? 'btn-danger'
                    : ''
            } `}
            {...otherProps}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default CustomButton;

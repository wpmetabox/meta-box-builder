const { useReducer } = wp.element;

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext();
    const boundActions = {};
    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{ state }}>
                {children}
            </Context.Provider>
        )
    }

    return { Context, Provider, actions: boundActions }
}
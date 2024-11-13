export const shadower = (elevation: number) => {
    return {
        shadowOpacity: 1,
        shadowOffset: {
            height: 1,
        },
        shadowRadius: 1, elevation: elevation || 6
    }
}


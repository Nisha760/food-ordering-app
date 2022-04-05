const updateUserName = (value) => {
    return {
        type: 'update user name',
        payload: value
    }
}

export { updateUserName };
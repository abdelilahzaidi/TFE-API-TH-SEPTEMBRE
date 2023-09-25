export interface SignInDTO {
    token: string,
    user: any
}

export function signInMapper(token: string, user: any): SignInDTO {
    delete user.password
    return { token, user }
}
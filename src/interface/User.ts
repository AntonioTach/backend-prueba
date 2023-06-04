export interface User {
    id?: string,
    name: string,
    email: string,
    age: number,
    gender: 'Femenino' | 'Masculino' | 'Otro',
    bio: string,
    birth: Date,
    image_url: string,
    created_at: Date
}